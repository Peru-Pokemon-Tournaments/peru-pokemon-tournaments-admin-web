<template>
  <div class="center" v-if="isLoadingTournaments">Cargando...</div>
  <base-table v-else>
    <template #head>
      <base-cell tag="th">Nº</base-cell>
      <base-cell tag="th">Título</base-cell>
      <base-cell tag="th">Fecha Inicio</base-cell>
      <base-cell tag="th">Fecha Fin</base-cell>
      <base-cell tag="th">Total Inscritos</base-cell>
      <base-cell tag="th">Tipo</base-cell>
      <base-cell tag="th">Precio</base-cell>
      <base-cell tag="th">Estado</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(tournament, index) in paginatedTournaments"
        :key="tournament.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ orderNumber(index) }}
        </base-cell>
        <base-cell tag="td">
          {{ tournament.title }}
        </base-cell>
        <base-cell tag="td">
          <base-badge color="success">
            {{ tournament.startDate.toString("dd/MM/yyyy hh:mm tt") }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-badge color="danger">
            {{ tournament.startDate.toString("dd/MM/yyyy hh:mm tt") }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          {{ tournament.totalCompetitors }}
        </base-cell>
        <base-cell tag="td">
          {{ tournament.tournamentType.name }}
        </base-cell>
        <base-cell tag="td">
          {{
            tournament.tournamentPrice.isFree
              ? "GRATIS"
              : tournament.tournamentPrice.formattedPrice
          }}
        </base-cell>
        <base-cell tag="td">
          <base-badge>
            {{ tournament.formattedStatus }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${tournament.id}-tournaments-actions`"
            :data-id="`${tournament.id}-tournaments-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="isPopoverOpen && selectedTournament.id === tournament.id"
            :target-data-id="`${tournament.id}-tournaments-actions`"
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
    v-if="!isLoadingTournaments"
    :current-page="currentPage"
    :total-pages="totalPages"
    @select-page="loadTournaments"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { SmallTournament } from "@/models/small-tournament.model";
import { useTournamentsStore } from "@/stores/tournaments";

export default defineComponent({
  data() {
    return {
      selectedTournament: null as SmallTournament | null,
      isPopoverOpen: false,
      tableActions: [
        {
          key: "tournaments/edit",
          name: "Editar",
          icon: { name: "edit", type: "fas" },
        },
        {
          key: "tournaments/delete",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
        },
      ],
    };
  },
  computed: {
    ...mapState(useTournamentsStore, [
      "paginatedTournaments",
      "totalPages",
      "currentPage",
      "perPage",
      "isLoadingTournaments",
    ]),
  },
  methods: {
    ...mapActions(useTournamentsStore, ["fetchTournaments"]),
    orderNumber(index: number): number {
      return index + 1 + this.perPage * (this.currentPage - 1);
    },
    loadTournaments(pageNumber: number): void {
      this.fetchTournaments(pageNumber);
    },
    setSelectedTournament(tournament?: SmallTournament): void {
      if (tournament) {
        this.selectedTournament = tournament;
      }
    },
    clearSelectedTournament(): void {
      this.selectedTournament = null;
    },
    openPopover(index: number): void {
      const tournament = this.paginatedTournaments[index];
      this.setSelectedTournament(tournament);
      this.isPopoverOpen = true;
    },
    closePopover(): void {
      this.clearSelectedTournament();
      this.isPopoverOpen = false;
    },
    onSelectAction(actionKey: string): void {
      switch (actionKey) {
        case "tournaments/edit":
          this.$router.push({
            name: "EditTournament",
            params: {
              tournamentId: this.selectedTournament!.id,
            },
          });
          break;
        case "tournaments/delete":
          // TODO: Handler delete
          break;
      }
      this.isPopoverOpen = false;
    },
  },
  mounted(): void {
    this.fetchTournaments();
  },
});
</script>
<style lang="scss" scoped>
.striped-row {
  background-color: $app-striped-row-color;
  color: $app-striped-row-font-color;
}

th {
  padding: 10px;
}
</style>
