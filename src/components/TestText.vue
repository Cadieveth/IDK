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
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData(partnerCategory, status, searchQuery) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Access-Control-Allow-Origin": "*",
        },
      };

      const listData = {
        keyword: searchQuery,
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
          const countData = await countResponse.result;
          this.result = countData.result;
        }
      } catch (error) {
        console.error("Error loading count data:", error);
      }
    },

    changeLimit() {
      this.page = 1;
      this.loadData();
    },

    applyFilter(filterOptions) {
      const { partnerCategory, status } = filterOptions;
      this.page = 1;
      this.loadData(partnerCategory, status);
    },

    resetFilter() {
      this.page = 1;
      this.loadData();
    },

    performSearch() {
      this.page = 1;
      if (this.search) {
        this.loadData(this.search);
      } else {
        this.loadData();
      }
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
