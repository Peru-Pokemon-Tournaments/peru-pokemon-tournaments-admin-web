<template>
  <div class="center" v-if="isLoadingTournamentResults">Cargando...</div>
  <base-table v-else>
    <template #head>
      <base-cell tag="th">Nº</base-cell>
      <base-cell tag="th">Puesto</base-cell>
      <base-cell tag="th">Puntaje</base-cell>
      <base-cell tag="th">Participante</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(tournamentResult, index) in paginatedTournamentResults"
        :key="tournamentResult.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ orderNumber(index) }}
        </base-cell>
        <base-cell tag="td" class="wrap-1">
          <base-badge color="primary">
            {{ tournamentResult.place }} º
          </base-badge>
        </base-cell>
        <base-cell tag="td" class="wrap-10">
          <base-badge color="success">
            {{ tournamentResult.score }} puntos
          </base-badge>
        </base-cell>
        <base-cell tag="td" class="wrap-10">
          {{ tournamentResult.tournamentInscription.competitor.fullName }}
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${tournamentResult.id}-tournament-results-actions`"
            :data-id="`${tournamentResult.id}-tournament-results-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="
              isPopoverOpen &&
              selectedTournamentResult.id === tournamentResult.id
            "
            :target-data-id="`${tournamentResult.id}-tournament-results-actions`"
            @click-outside="closePopover"
            location="left"
            no-padding
          >
            <base-table-actions
              :actions="tableActions"
              @select-action="onSelectAction"
            />
          </base-popover>
        </base-cell>
      </tr>
    </template>
  </base-table>
  <base-pagination
    v-if="!isLoadingTournamentResults"
    :current-page="currentPage"
    :total-pages="totalPages"
    @select-page="loadTournamentResults"
  />
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { mapActions, mapState } from "pinia";
import { TournamentResult } from "@/models/tournament-result.model";
import { useTournamentResultsStore } from "@/stores/tournament-results";
//import CreateOrEditTournamentResultForm from "../forms/CreateOrEditTournamentResultForm.vue";

export default defineComponent({
  components: {
    //CreateOrEditTournamentResultForm,
  },
  props: {
    tournamentId: {
      type: String as PropType<string>,
      required: true,
    },
  },
  data() {
    return {
      selectedTournamentResult: null as TournamentResult | null,
      isPopoverOpen: false,
      isEditModalOpen: false,
      tableActions: [
        {
          key: "tournament-results/edit",
          name: "Editar",
          icon: { name: "edit", type: "fas" },
        },
        {
          key: "tournament-results/delete",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
        },
      ],
    };
  },
  computed: {
    ...mapState(useTournamentResultsStore, [
      "paginatedTournamentResults",
      "totalPages",
      "currentPage",
      "perPage",
      "isLoadingTournamentResults",
      "tournamentResultsHasChanged",
    ]),
    currentId(): string | null {
      if (this.selectedTournamentResult && this.isEditModalOpen) {
        return this.selectedTournamentResult.id;
      }

      return null;
    },
  },
  methods: {
    ...mapActions(useTournamentResultsStore, ["fetchTournamentResults"]),
    orderNumber(index: number): number {
      return index + 1 + this.perPage * (this.currentPage - 1);
    },
    loadTournamentResults(pageNumber: number): void {
      this.fetchTournamentResults(this.tournamentId, pageNumber);
    },
    setSelectedTournamentResult(tournamentResult?: TournamentResult): void {
      if (tournamentResult) {
        this.selectedTournamentResult = tournamentResult;
      }
    },
    clearSelectedTournamentResult(): void {
      this.selectedTournamentResult = null;
    },
    openPopover(index: number): void {
      const tournamentResult = this.paginatedTournamentResults[index];
      this.setSelectedTournamentResult(tournamentResult);
      this.isPopoverOpen = true;
    },
    closePopover(): void {
      this.clearSelectedTournamentResult();
      this.isPopoverOpen = false;
    },
    onSelectAction(actionKey: string): void {
      switch (actionKey) {
        case "tournament-rules/edit":
          this.toggleEditModal();
          break;
        case "tournament-rules/delete":
          // TODO: Handler delete
          break;
      }
      this.isPopoverOpen = false;
    },
    toggleEditModal(): void {
      this.isEditModalOpen = !this.isEditModalOpen;
    },
  },
  watch: {
    tournamentResultsHasChanged(changed: boolean): void {
      if (changed) {
        this.fetchTournamentResults(this.tournamentId);
      }
    },
  },
  mounted(): void {
    this.fetchTournamentResults(this.tournamentId);
  },
});
</script>
<style lang="scss" scoped>
@include tableLayout;
.striped-row {
  background-color: $app-striped-row-color;
  color: $app-striped-row-font-color;
}

th {
  padding: 10px;
}
</style>
