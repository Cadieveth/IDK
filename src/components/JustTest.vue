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
    <v-data-table
      :headers="headers"
      :items="partners"
      :items-per-page="limit"
      hide-default-header
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
      <!-- pake loadData untuk ngambil data baru kalo ganti page atau ngubah limit -->
    </v-pagination>
  </div>
</template>

<script>
import ButtonFilter from "./ButtonFilter.vue";
export default {
  components: {
    ButtonFilter,
  },
  data() {
    return {
      headers: [
        { text: "Partner Code", value: "partnerCode" },
        { text: "Partner Name", value: "partnerName" },
        { text: "Category Partner Code", value: "ctgrPartnerCode" },
        { text: "OU Name", value: "ouName" },
        { text: "Line of Business", value: "lineOfBusiness" },
      ],
      partners: [],
      page: 1,
      limit: 10,
      result: 0,
      search: "",
    };
  },
  // pake mounted buat load dari API list sebagai 'hooks'
  mounted() {
    this.loadData();
  },
  methods: {
    // method akses API untuk load data
    async loadData() {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Access-Control-Allow-Origin": "*",
        },
      };

      // body buat API list
      const listData = {
        keyword: "",
        ctgrPartnerId: -99,
        active: "",
        limit: this.limit,
        offset: (this.page - 1) * this.limit,
      };

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
          //buat var responseData untuk menampung data
          const responseData = await response.json();
          //disimpan sbg partners untuk dipanggil diatas nnti
          this.partners = responseData.result;
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }

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
          this.result = countData.result;
        }
      } catch (error) {
        console.error("Error loading count data:", error);
      }
    },

    changeLimit() {
      // kalo ngubah Row per page balik ke page 1
      this.page = 1;
      // load data
      this.loadData();
    },

    applyFilter(filterOptions) {
      // filter yang di apply apa aja?
      const { partnerCategory, status } = filterOptions;
      // kalo pake filter, balik ke page 1
      this.page = 1;
      // load data yang udh di filter dngn manggil si loadDataWithFilter
      this.loadDataWithFilter(partnerCategory, status);
    },

    async loadDataWithFilter(partnerCategory, status) {
      const config = {
        headers: {
          // ngambil token dari accessToken
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Access-Control-Allow-Origin": "*",
        },
      };

      const listData = {
        keyword: "",
        ctgrPartnerId: this.getPartnerCategoryId(partnerCategory),
        active: this.getStatusValue(status),
        limit: this.limit,
        offset: (this.page - 1) * this.limit,
      };

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
          this.partners = responseData.result;
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }

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
          this.result = countData.result;
        }
      } catch (error) {
        console.error("Error loading count data:", error);
      }
    },

    resetFilter() {
      // kalo reset filter balik ke page 1
      this.page = 1;
      // load data umum
      this.loadData();
    },

    performSearch() {
      this.page = 1;
      if (this.search) {
        this.loadDataWithSearch(this.search);
      } else {
        this.loadData();
      }
    },

    async loadDataWithSearch(searchQuery) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Access-Control-Allow-Origin": "*",
        },
      };

      const listData = {
        keyword: searchQuery,
        ctgrPartnerId: -99,
        active: "",
        limit: this.limit,
        offset: (this.page - 1) * this.limit,
      };

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
          this.partners = responseData.result;
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }

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
          this.result = countData.result;
        }
      } catch (error) {
        console.error("Error loading count data:", error);
      }
    },

    // Deskripsi nilai partnerCategory buat filter
    getPartnerCategoryId(partnerCategory) {
      if (partnerCategory === "RETRIBUSI PASAR") {
        return 11;
      } else if (partnerCategory === "UMUM") {
        return 10;
      } else {
        return -99;
      }
    },

    // Deskripsi nilai status buat filter
    getStatusValue(status) {
      if (status === "All") {
        return "";
      } else if (status === "Active") {
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
