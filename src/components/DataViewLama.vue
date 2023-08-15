<template>
  <div>
    <ButtonFilter @filter-applied="applyFilter" @filter-reset="resetFilter" />
    <v-row>
      <v-col cols="3">
        <v-select
          v-model="limit"
          :items="[10, 20, 50]"
          label="Rows per page"
          @change="changeLimit">
        </v-select>
      </v-col>
      <v-col cols="6"></v-col>
      <v-col cols="3">
        <v-text-field
          v-model="search"
          label="Search"
          prepend-icon="mdi-magnify"
          clearable
          solo-inverted
          @input="performSearch">
        </v-text-field>
      </v-col>
    </v-row>

    <!-- Display the table and pagination only when there's data -->
    <template v-if="partners.length > 0">
      <v-data-table
        :headers="headers"
        :items="partners"
        :items-per-page="limit"
        hide-default-footer
        class="elevation-1">
        <template v-slot:no-data>
          <!-- This message will be shown when partners.length === 0 -->
          <div class="text-center my-5">No data available</div>
        </template>
      </v-data-table>

      <v-pagination
        v-model="page"
        :length="Math.ceil(result / limit)"
        :total-visible="7"
        @input="loadData">
      </v-pagination>
    </template>

    <!-- Display loading message when loading data -->
    <template v-else-if="loading">
      <div class="text-center my-5">Loading...</div>
    </template>

    <!-- Display default message when no data and not loading -->
    <template v-else>
      <div class="text-center my-5">No data available</div>
    </template>
    <!-- <v-data-table
      v-if="partners.length > 0"
      :headers="headers"
      :items="partners"
      :items-per-page="limit"
      hide-default-footer
      class="elevation-1">
      <template v-slot:no-data>
        <div class="text-center my-5">
          <div v-if="loading">Loading...</div>
          <div v-else>
            <p v-if="partners.length === 0">No data available</p>
          </div>
        </div>
      </template>
    </v-data-table>
    <v-pagination
      v-if="partners.length > 0"
      v-model="page"
      :length="Math.ceil(result / limit)"
      :total-visible="7"
      @input="loadData">
    </v-pagination> -->
  </div>
</template>

<script>
import ButtonFilter from "./ButtonFilter.vue";

// loadData = ngambil data dari API list
async function loadData(listData, config) {
  try {
    const response = await fetch(
      "https://stagingmkpops.mkpmobile.com/ssomaster/partner/list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...config.headers,
        },
        body: JSON.stringify(listData),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      return responseData.result;
    } else {
      console.error("Error loading data:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error loading data:", error);
    return [];
  }
}
// loadCount = ngambil data dari API count data
async function loadCount(listData, config) {
  try {
    const countResponse = await fetch(
      "https://stagingmkpops.mkpmobile.com/ssomaster/partner/count",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...config.headers,
        },
        body: JSON.stringify(listData),
      }
    );

    if (countResponse.ok) {
      const countData = await countResponse.json();
      return countData.result;
    } else {
      console.error("Error loading count data:", countResponse.status);
      return 0;
    }
  } catch (error) {
    console.error("Error loading count data:", error);
    return 0;
  }
}

export default {
  components: {
    // panggil komponen ButtonFilter
    ButtonFilter,
  },
  data() {
    return {
      headers: [
        { text: "Partner Code", value: "partnerCode" },
        { text: "Name", value: "partnerName" },
        { text: "Category", value: "ctgrPartnerCode" },
        { text: "Business Unit", value: "ouName" },
        { text: "Partner Type", value: "lineOfBusiness" },
      ],
      partners: [],
      page: 1,
      limit: 10,
      result: 0,
      search: "",
      selectedPartnerCategory: "", // tambahkan properti ini
      selectedStatus: "All", // tambahkan properti ini
      loading: false,
    };
  },

  computed: {
    // kalo ada data dan ga loading, maka tampilin table and pagination
    showTableAndPagination() {
      return this.partners.length > 0 && !this.loading;
    },

    // listData buat load dan count data pada permintaan API
    listData() {
      return {
        // nilai brubah sesuai kondisi nilai properti dibawah
        keyword: this.search,
        ctgrPartnerId: this.getPartnerCategoryId(this.selectedPartnerCategory),
        active: this.getStatusValue(this.selectedStatus),
        limit: this.limit,
        offset: (this.page - 1) * this.limit,
      };
    },
  },

  mounted() {
    this.loadData();
    this.loadCount();
  },

  methods: {
    // async applyFilter(filterOptions) {
    //   const { partnerCategory, status } = filterOptions;
    //   this.page = 1;
    //   this.selectedPartnerCategory = partnerCategory;
    //   this.selectedStatus = status;
    //   const newData = await this.loadData(); // Assuming loadData returns the data
    //   if (newData === null || newData.length === 0) {
    //     this.partners = []; // Reset data if no results match the filter
    //   } else {
    //     this.partners = newData;
    //   }
    //   this.loadCount();
    // },

    async loadData() {
      this.loading = true;
      console.log("loadData called");
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Access-Control-Allow-Origin": "*",
        },
      };

      const loadedData = await loadData(this.listData, config);
      // Handle kalo data = null
      if (loadedData === null) {
        this.partners = [];
      } else {
        // kalo ada data ya udh tampilin loadedData
        this.partners = loadedData;
      }

      this.loading = false;

      // this.partners = await loadData(this.listData, config);
      // this.loading = false;
    },

    async loadCount() {
      this.loading = true;
      console.log("loadCount called");
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Access-Control-Allow-Origin": "*",
        },
      };

      this.result = await loadCount(this.listData, config);
      this.loading = false;
    },

    changeLimit() {
      this.page = 1;
      this.loadData();
      this.loadCount();
    },

    // applyFilter(filterOptions) {
    //   console.log("applyFilter called");
    //   const { partnerCategory, status } = filterOptions;
    //   this.page = 1;
    //   this.selectedPartnerCategory = partnerCategory;
    //   this.selectedStatus = status;
    //   this.loadData(); // Memanggil loadData dengan filter yang sudah diubah
    //   this.loadCount();
    // },

    // pake async karena ngambil data dari API
    async applyFilter(filterOptions) {
      console.log("applyFilter called");
      const { partnerCategory, status } = filterOptions;
      this.page = 1;
      this.selectedPartnerCategory = partnerCategory;
      this.selectedStatus = status;

      // utk nunggu permintaan API selesai dan data dimuat
      await this.loadData();
      await this.loadCount();
    },

    // resetFilter() {
    //   console.log("resetFilter called");
    //   this.page = 1;
    //   this.selectedPartnerCategory = "";
    //   this.selectedStatus = "All";
    //   this.loadData();
    //   this.loadCount();
    // },

    // pake async krn ngmbil data dari API dan nunggu permintaan selesai dan data dimuat setelah reset filternya
    async resetFilter() {
      console.log("resetFilter called");
      this.page = 1;
      this.selectedPartnerCategory = "";
      this.selectedStatus = "All";

      await this.loadData();
      await this.loadCount();
    },

    performSearch() {
      console.log("performSearch called");
      this.page = 1;
      this.loadData();
      this.loadCount();
    },

    // performSearch() {
    //   this.page = 1;
    //   if (this.search) {
    //     this.loadDataWithSearch(this.search);
    //     this.loadCountWithSearch(this.search);
    //   } else {
    //     this.loadData();
    //     this.loadCount();
    //   }
    // },

    // async loadDataWithSearch(searchQuery) {
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   };

    //   const listData = {
    //     keyword: searchQuery,
    //     ctgrPartnerId: -99,
    //     active: "",
    //     limit: this.limit,
    //     offset: (this.page - 1) * this.limit,
    //   };

    //   try {
    //     const response = await fetch(
    //       "https://stagingmkpops.mkpmobile.com/ssomaster/partner/list",
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           ...config.headers,
    //         },
    //         body: JSON.stringify(listData),
    //       }
    //     );

    //     if (response.ok) {
    //       const responseData = await response.json();
    //       this.partners = responseData.result;
    //     }
    //   } catch (error) {
    //     console.error("Error loading data:", error);
    //   }

    //   // if (!this.apiCountCalled) {
    //   // try {
    //   //   const countResponse = await fetch(
    //   //     "https://stagingmkpops.mkpmobile.com/ssomaster/partner/count",
    //   //     {
    //   //       method: "POST",
    //   //       headers: {
    //   //         "Content-Type": "application/json",
    //   //         ...config.headers,
    //   //       },
    //   //       body: JSON.stringify(listData),
    //   //     }
    //   //   );

    //   //   if (countResponse.ok) {
    //   //     const countData = await countResponse.json();
    //   //     this.result = countData.result;
    //   //     this.apiCountCalled = true;
    //   //   }
    //   // } catch (error) {
    //   //   console.error("Error loading count data:", error);
    //   // }
    //   // }
    // },

    // async loadCountWithSearch(searchQuery) {
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   };

    //   const listData = {
    //     keyword: searchQuery,
    //     ctgrPartnerId: -99,
    //     active: "",
    //     limit: this.limit,
    //     offset: (this.page - 1) * this.limit,
    //   };

    //   const count = await loadCount(listData, config);
    //   this.result = count;
    //   this.apiCountCalled = true;
    // },

    getPartnerCategoryId(partnerCategory) {
      if (partnerCategory === "RETRIBUSI PASAR") {
        return 11;
      } else if (partnerCategory === "UMUM") {
        return 10;
      } else {
        return -99;
      }
    },

    getStatusValue(status) {
      if (status === "Active") {
        return "Y";
      } else if (status === "Non Active") {
        return "N";
      } else {
        return "";
      }
    },
  },
};
</script>
