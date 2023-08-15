<template>
  <v-row justify="end" style="padding: 20px">
    <v-col cols="auto">
      <v-dialog transition="dialog-top-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on">Filter</v-btn>
        </template>
        <template v-slot:default>
          <v-card>
            <v-toolbar color="primary" dark>Filter</v-toolbar>
            <v-card-text>
              <v-container fluid>
                <v-row align="center">
                  <v-col class="d-flex" cols="20" sm="6">
                    <v-select
                      v-model="selectedPartnerCategory"
                      :items="partnerCategories"
                      label="Partner Category"></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="20" sm="6">
                    <v-select
                      v-model="selectedStatus"
                      :items="statusOptions"
                      label="Status"></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="applyFilter">Apply</v-btn>
              <v-btn text @click="resetFilter">Reset</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    partnerCategories: ["RETRIBUSI PASAR", "UMUM"],
    statusOptions: ["All", "Active", "Non Active"],
    selectedPartnerCategory: "",
    selectedStatus: "All",
  }),
  methods: {
    applyFilter() {
      this.$emit("filter-applied", {
        partnerCategory: this.selectedPartnerCategory,
        status: this.selectedStatus,
      });
    },
    resetFilter() {
      this.selectedPartnerCategory = "";
      this.selectedStatus = "All";
      this.$emit("filter-reset");
    },
  },
};
</script>
