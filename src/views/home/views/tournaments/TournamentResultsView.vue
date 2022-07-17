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
        >
          Agregar Resultado
        </base-button>
      </div>
    </template>
  </base-card>
  <base-card>
    <tournament-results-table :tournamentId="tournamentId" />
  </base-card>
</template>
<script lang="ts">
import TournamentResultsTable from "@/components/app/tournament-results/tables/TournamentResultsTable.vue";
import { useTournamentsStore } from "@/stores/tournaments";
import { mapActions, mapState } from "pinia";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  components: {
    TournamentResultsTable,
  },
  props: {
    tournamentId: {
      type: String as PropType<string>,
      required: true,
    },
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
