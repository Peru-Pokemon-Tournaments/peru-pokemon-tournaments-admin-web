<template>
  <base-card>
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-10">
          <h1>Sistemas de torneos</h1>
        </div>
        <base-button
          type="button"
          color="success"
          class="col-12 col-sm-12 col-md-4 col-lg-2"
          @click="toggleCreateModal"
        >
          Nuevo Sistema de Torneo
        </base-button>
      </div>
    </template>
  </base-card>
  <base-card>
    <tournament-systems-table />
  </base-card>
  <base-modal
    title="Nuevo Sistema de Torneo"
    type="medium"
    :open="isCreateModalOpen"
    @close="toggleCreateModal"
  >
    <create-or-edit-tournament-system-form @after-submit="closeModal" />
  </base-modal>
</template>
<script lang="ts">
import TournamentSystemsTable from "@/components/app/tournament-systems/tables/TournamentSystemsTable.vue";
import CreateOrEditTournamentSystemForm from "@/components/app/tournament-systems/forms/CreateOrEditTournamentSystemForm.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    TournamentSystemsTable,
    CreateOrEditTournamentSystemForm,
  },
  data() {
    return {
      isCreateModalOpen: false,
    };
  },
  methods: {
    toggleCreateModal() {
      this.isCreateModalOpen = !this.isCreateModalOpen;
    },
    closeModal(): void {
      this.toggleCreateModal();
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
