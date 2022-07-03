<template>
  <div class="center" v-if="isLoadingTournamentInscriptions">Cargando...</div>
  <base-table v-else>
    <template #head>
      <base-cell tag="th">Nº</base-cell>
      <base-cell tag="th">Torneo</base-cell>
      <base-cell tag="th">Estado</base-cell>
      <base-cell tag="th">Competidor</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(
          tournamentInscription, index
        ) in paginatedTournamentInscriptions"
        :key="tournamentInscription.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ orderNumber(index) }}
        </base-cell>
        <base-cell tag="td">
          {{ tournamentInscription.tournamentTitle }}
        </base-cell>
        <base-cell tag="td">
          <base-badge
            :color="
              tournamentInscription.status == 'accepted' ? 'success' : 'primary'
            "
          >
            {{ tournamentInscription.translatedStatus }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          {{ tournamentInscription.competitor.nickName }}
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${tournamentInscription.id}-tournamentInscriptions-actions`"
            :data-id="`${tournamentInscription.id}-tournamentInscriptions-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="
              isPopoverOpen &&
              selectedTournamentInscription.id === tournamentInscription.id
            "
            :target-data-id="`${tournamentInscription.id}-tournamentInscriptions-actions`"
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
    v-if="!isLoadingTournamentInscriptions"
    :current-page="currentPage"
    :total-pages="totalPages"
    @select-page="loadTournamentInscriptions"
  />
  <base-modal
    title="Editar Inscripción"
    type="small"
    :open="isEditModalOpen"
    @close="isEditModalOpen = false"
  >
    <edit-pokemon-showdown-team-export-form
      :current-id="currentId"
      @after-submit="toggleEditModal"
    />
  </base-modal>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { TournamentInscription } from "@/models/tournament-inscription.model";
import { useTournamentInscriptionsStore } from "@/stores/tournament-inscriptions";
import EditPokemonShowdownTeamExportForm from "../forms/EditPokemonShowdownTeamExportForm.vue";

export default defineComponent({
  components: {
    EditPokemonShowdownTeamExportForm,
  },
  data() {
    return {
      selectedTournamentInscription: null as TournamentInscription | null,
      isPopoverOpen: false,
      isEditModalOpen: false,
      tableActions: [
        {
          key: "tournament-inscriptions/edit-team",
          name: "Editar Equipo",
          icon: { name: "edit", type: "fas" },
        },
        {
          key: "tournament-inscriptions/change-status",
          name: "Cambiar estado",
          icon: { name: "exchange-alt", type: "fas" },
        },
        {
          key: "tournament-inscriptions/delete",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
        },
      ],
    };
  },
  computed: {
    ...mapState(useTournamentInscriptionsStore, [
      "paginatedTournamentInscriptions",
      "totalPages",
      "currentPage",
      "perPage",
      "isLoadingTournamentInscriptions",
      "tournamentInscriptionsHasChanged",
    ]),
    currentId(): string | null {
      if (this.selectedTournamentInscription && this.isEditModalOpen) {
        return this.selectedTournamentInscription.id;
      }

      return null;
    },
  },
  methods: {
    ...mapActions(useTournamentInscriptionsStore, [
      "fetchTournamentInscriptions",
    ]),
    orderNumber(index: number): number {
      return index + 1 + this.perPage * (this.currentPage - 1);
    },
    loadTournamentInscriptions(pageNumber: number): void {
      this.fetchTournamentInscriptions(pageNumber);
    },
    setSelectedTournamentInscription(
      tournamentInscription?: TournamentInscription
    ): void {
      if (tournamentInscription) {
        this.selectedTournamentInscription = tournamentInscription;
      }
    },
    clearSelectedTournamentInscription(): void {
      this.selectedTournamentInscription = null;
    },
    openPopover(index: number): void {
      const tournamentInscription = this.paginatedTournamentInscriptions[index];
      this.setSelectedTournamentInscription(tournamentInscription);
      this.isPopoverOpen = true;
    },
    closePopover(): void {
      this.clearSelectedTournamentInscription();
      this.isPopoverOpen = false;
    },
    onSelectAction(actionKey: string): void {
      switch (actionKey) {
        case "tournament-inscriptions/edit-team":
          this.toggleEditModal();
          break;
        case "tournament-inscriptions/change-status":
          // TODO: Handler change status
          break;
        case "tournament-inscriptions/delete":
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
    tournamentInscriptionsHasChanged(changed: boolean): void {
      if (changed) {
        this.fetchTournamentInscriptions();
      }
    },
  },
  mounted(): void {
    this.fetchTournamentInscriptions();
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
