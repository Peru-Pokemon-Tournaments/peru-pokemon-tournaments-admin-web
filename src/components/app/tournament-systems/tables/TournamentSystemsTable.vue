<template>
  <div class="center" v-if="isLoadingTournamentSystems">Cargando...</div>
  <base-table v-else>
    <template #head>
      <base-cell tag="th">Nº</base-cell>
      <base-cell tag="th">Nombre</base-cell>
      <base-cell tag="th" class="wrap">Descripción</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(tournamentSystem, index) in paginatedTournamentSystems"
        :key="tournamentSystem.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ orderNumber(index) }}
        </base-cell>
        <base-cell tag="td" class="wrap-1">
          {{ tournamentSystem.name }}
        </base-cell>
        <base-cell tag="td" class="wrap-10">
          {{ tournamentSystem.description }}
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${tournamentSystem.id}-tournament-systems-actions`"
            :data-id="`${tournamentSystem.id}-tournament-systems-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="
              isPopoverOpen &&
              selectedTournamentSystem.id === tournamentSystem.id
            "
            :target-data-id="`${tournamentSystem.id}-tournament-systems-actions`"
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
    v-if="!isLoadingTournamentSystems"
    :current-page="currentPage"
    :total-pages="totalPages"
    @select-page="loadTournamentSystems"
  />
  <base-modal
    title="Editar Sistema de Torneo"
    type="medium"
    :open="isEditModalOpen"
    @close="isEditModalOpen = false"
  >
    <create-or-edit-tournament-system-form
      :current-id="currentId"
      @after-submit="toggleEditModal"
    />
  </base-modal>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { TournamentSystem } from "@/models/tournament-system.model";
import { useTournamentSystemsStore } from "@/stores/tournament-systems";
import CreateOrEditTournamentSystemForm from "../forms/CreateOrEditTournamentSystemForm.vue";

export default defineComponent({
  components: {
    CreateOrEditTournamentSystemForm,
  },
  data() {
    return {
      selectedTournamentSystem: null as TournamentSystem | null,
      isPopoverOpen: false,
      isEditModalOpen: false,
      tableActions: [
        {
          key: "tournament-systems/edit",
          name: "Editar",
          icon: { name: "edit", type: "fas" },
        },
        {
          key: "tournament-systems/delete",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
        },
      ],
    };
  },
  computed: {
    ...mapState(useTournamentSystemsStore, [
      "paginatedTournamentSystems",
      "totalPages",
      "currentPage",
      "perPage",
      "isLoadingTournamentSystems",
      "tournamentSystemsHasChanged",
    ]),
    currentId(): string | null {
      if (this.selectedTournamentSystem && this.isEditModalOpen) {
        return this.selectedTournamentSystem.id;
      }

      return null;
    },
  },
  methods: {
    ...mapActions(useTournamentSystemsStore, ["fetchTournamentSystems"]),
    orderNumber(index: number): number {
      return index + 1 + this.perPage * (this.currentPage - 1);
    },
    loadTournamentSystems(pageNumber: number): void {
      this.fetchTournamentSystems(pageNumber);
    },
    setSelectedTournamentSystem(tournamentSystem?: TournamentSystem): void {
      if (tournamentSystem) {
        this.selectedTournamentSystem = tournamentSystem;
      }
    },
    clearSelectedTournamentSystem(): void {
      this.selectedTournamentSystem = null;
    },
    openPopover(index: number): void {
      const tournamentSystem = this.paginatedTournamentSystems[index];
      this.setSelectedTournamentSystem(tournamentSystem);
      this.isPopoverOpen = true;
    },
    closePopover(): void {
      this.clearSelectedTournamentSystem();
      this.isPopoverOpen = false;
    },
    onSelectAction(actionKey: string): void {
      switch (actionKey) {
        case "tournament-systems/edit":
          this.toggleEditModal();
          break;
        case "tournament-systems/delete":
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
    tournamentSystemsHasChanged(changed: boolean): void {
      if (changed) {
        this.fetchTournamentSystems();
      }
    },
  },
  mounted(): void {
    this.fetchTournamentSystems();
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
