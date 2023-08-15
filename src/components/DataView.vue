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
    <template v-if="partners.length > 0">
      <v-data-table
        :headers="headers"
        :items="partners"
        :items-per-page="limit"
        hide-default-footer
        class="elevation-1">
        <!-- <template v-slot:no-data>
          <div
            :style="{
              height: `250px`,
            }"
            v-show="true"
            class="d-flex flex-column align-center">
            <span class="font-weight-semibold text-truncate text-lg">
              No Data Found
            </span>
          </div>
        </template> -->
      </v-data-table>
      <v-pagination
        v-model="page"
        :length="Math.ceil(result / limit)"
        :total-visible="7"
        @input="loadData">
      </v-pagination>
    </template>

    <!-- Kasih loading biar keren dikit -->
    <template v-else-if="loading">
      <v-data-table
        hide-default-footer
        item-key="name"
        class="elevation-1"
        loading
        loading-text="Loading... Please wait"></v-data-table>
    </template>

    <!-- tampilin kalo gada data -->
    <template v-else>
      <v-data-table
        :headers="headers"
        :items="partners"
        :items-per-page="limit"
        hide-default-footer
        class="elevation-1">
        <template v-slot:no-data>
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
