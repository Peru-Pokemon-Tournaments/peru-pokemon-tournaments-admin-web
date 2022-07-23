<template>
  <base-card>
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-10">
          <h1>Resultados de torneo: {{ tournamentTitle }}</h1>
        </div>
        <base-button
          type="button"
          color="success"
          class="col-12 col-sm-12 col-md-4 col-lg-2"
          @click="toggleCreateModal"
        >
          Agregar Resultado
        </base-button>
      </div>
    </template>
  </base-card>
  <base-card>
    <tournament-results-table :tournamentId="tournamentId" />
  </base-card>
  <base-modal
    title="Nuevo Resultado"
    type="tiny"
    :open="isCreateModalOpen"
    @close="toggleCreateModal"
  >
    <create-or-edit-tournament-result-form @after-submit="closeModal" />
  </base-modal>
</template>
<script lang="ts">
import TournamentResultsTable from "@/components/app/tournament-results/tables/TournamentResultsTable.vue";
import { useTournamentsStore } from "@/stores/tournaments";
import { mapActions, mapState } from "pinia";
import { defineComponent, PropType } from "vue";
import CreateOrEditTournamentResultForm from "@/components/app/tournament-results/forms/CreateOrEditTournamentResultForm.vue";

export default defineComponent({
  components: {
    TournamentResultsTable,
    CreateOrEditTournamentResultForm,
  },
  props: {
    tournamentId: {
      type: String as PropType<string>,
      required: true,
    },
  },
  data() {
    return {
      isCreateModalOpen: false,
    };
  },
  computed: {
    ...mapState(useTournamentsStore, ["selectedTournament"]),
    tournamentTitle(): string {
      if (this.selectedTournament) {
        return this.selectedTournament.title;
      }

      return "-";
    },
  },
  methods: {
    ...mapActions(useTournamentsStore, ["selectTournament"]),
    toggleCreateModal() {
      this.isCreateModalOpen = !this.isCreateModalOpen;
    },
    closeModal(): void {
      this.toggleCreateModal();
    },
  },
  mounted(): void {
    this.selectTournament(this.tournamentId);
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
