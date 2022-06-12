<template>
  <div class="center" v-if="isLoadingTournamentTypes">Cargando...</div>
  <base-table v-else>
    <template #head>
      <base-cell tag="th">Nº</base-cell>
      <base-cell tag="th">Nombre</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(tournamentType, index) in paginatedTournamentTypes"
        :key="tournamentType.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ orderNumber(index) }}
        </base-cell>
        <base-cell tag="td">
          {{ tournamentType.name }}
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${tournamentType.id}-tournament-types-actions`"
            :data-id="`${tournamentType.id}-tournament-types-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="
              isPopoverOpen && selectedTournamentType.id === tournamentType.id
            "
            :target-data-id="`${tournamentType.id}-tournament-types-actions`"
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
    v-if="!isLoadingTournamentTypes"
    :current-page="currentPage"
    :total-pages="totalPages"
    @select-page="loadTournamentTypes"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { TournamentType } from "@/models/tournament-type.model";
import { useTournamentTypesStore } from "@/stores/tournament-types";

export default defineComponent({
  data() {
    return {
      selectedTournamentType: null as TournamentType | null,
      isPopoverOpen: false,
      tableActions: [
        {
          key: "tournament-types/edit",
          name: "Editar",
          icon: { name: "edit", type: "fas" },
        },
        {
          key: "tournament-types/delete",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
        },
      ],
    };
  },
  computed: {
    ...mapState(useTournamentTypesStore, [
      "paginatedTournamentTypes",
      "totalPages",
      "currentPage",
      "perPage",
      "isLoadingTournamentTypes",
    ]),
  },
  methods: {
    ...mapActions(useTournamentTypesStore, ["fetchTournamentTypes"]),
    orderNumber(index: number): number {
      return index + 1 + this.perPage * (this.currentPage - 1);
    },
    loadTournamentTypes(pageNumber: number): void {
      this.fetchTournamentTypes(pageNumber);
    },
    setSelectedTournamentType(tournamentType?: TournamentType): void {
      if (tournamentType) {
        this.selectedTournamentType = tournamentType;
      }
    },
    clearSelectedTournamentType(): void {
      this.selectedTournamentType = null;
    },
    openPopover(index: number): void {
      const tournamentType = this.paginatedTournamentTypes[index];
      this.setSelectedTournamentType(tournamentType);
      this.isPopoverOpen = true;
    },
    closePopover(): void {
      this.clearSelectedTournamentType();
      this.isPopoverOpen = false;
    },
    onSelectAction(actionKey: string): void {
      switch (actionKey) {
        case "tournament-types/edit":
          // TODO: Handler edit
          break;
        case "tournament-types/delete":
          // TODO: Handler delete
          break;
      }
      this.isPopoverOpen = false;
    },
  },
  mounted(): void {
    this.fetchTournamentTypes();
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
