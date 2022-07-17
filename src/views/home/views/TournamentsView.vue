<template>
  <base-card v-if="!isListingResults">
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-10">
          <h1>Torneos</h1>
        </div>
        <base-button
          v-if="isListing"
          type="button"
          color="success"
          class="col-12 col-sm-12 col-md-4 col-lg-2"
          @click="toView"
        >
          Nuevo Torneo
        </base-button>
      </div>
    </template>
    <router-view v-if="!isListing" />
  </base-card>
  <base-card v-if="isListing && !isListingResults">
    <tournaments-table />
  </base-card>
  <router-view v-if="isListingResults" />
</template>
<script lang="ts">
import TournamentsTable from "@/components/app/tournaments/tables/TournamentsTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    TournamentsTable,
  },
  computed: {
    isListing(): boolean {
      return !(
        this.$route.path.includes("create") || this.$route.path.includes("edit")
      );
    },
    isListingResults(): boolean {
      return this.$route.path.includes("results");
    },
  },
  methods: {
    toView(): void {
      this.$router.push({
        name: "CreateTournament",
      });
    },
  },
});
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
h1 {
  font-size: 1.5rem;
  font-weight: 300;
}
</style>
