<template>
  <div class="center" v-if="isLoadingGameGenerations">Cargando...</div>
  <base-table v-else>
    <template #head>
      <base-cell tag="th">Nº</base-cell>
      <base-cell tag="th">Generación</base-cell>
      <base-cell tag="th">Descripción</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(gameGeneration, index) in paginatedGameGenerations"
        :key="gameGeneration.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ orderNumber(index) }}
        </base-cell>
        <base-cell tag="td">
          <base-badge> Generación {{ gameGeneration.generation }} </base-badge>
        </base-cell>
        <base-cell tag="td">
          {{ gameGeneration.description }}
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${gameGeneration.id}-game-generations-actions`"
            :data-id="`${gameGeneration.id}-game-generations-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="
              isPopoverOpen && selectedGameGeneration.id === gameGeneration.id
            "
            :target-data-id="`${gameGeneration.id}-game-generations-actions`"
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
    v-if="!isLoadingGameGenerations"
    :current-page="currentPage"
    :total-pages="totalPages"
    @select-page="loadGameGenerations"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { GameGeneration } from "@/models/game-generation.model";
import { useGameGenerationsStore } from "@/stores/game-generations";

export default defineComponent({
  data() {
    return {
      selectedGameGeneration: null as GameGeneration | null,
      isPopoverOpen: false,
      tableActions: [
        {
          key: "game-generations/edit",
          name: "Editar",
          icon: { name: "edit", type: "fas" },
        },
        {
          key: "game-generations/delete",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
        },
      ],
    };
  },
  computed: {
    ...mapState(useGameGenerationsStore, [
      "paginatedGameGenerations",
      "totalPages",
      "currentPage",
      "perPage",
      "isLoadingGameGenerations",
    ]),
  },
  methods: {
    ...mapActions(useGameGenerationsStore, ["fetchGameGenerations"]),
    orderNumber(index: number): number {
      return index + 1 + this.perPage * (this.currentPage - 1);
    },
    loadGameGenerations(pageNumber: number): void {
      this.fetchGameGenerations(pageNumber);
    },
    setSelectedGameGeneration(gameGeneration?: GameGeneration): void {
      if (gameGeneration) {
        this.selectedGameGeneration = gameGeneration;
      }
    },
    clearSelectedGameGeneration(): void {
      this.selectedGameGeneration = null;
    },
    openPopover(index: number): void {
      const gameGeneration = this.paginatedGameGenerations[index];
      this.setSelectedGameGeneration(gameGeneration);
      this.isPopoverOpen = true;
    },
    closePopover(): void {
      this.clearSelectedGameGeneration();
      this.isPopoverOpen = false;
    },
    onSelectAction(actionKey: string): void {
      switch (actionKey) {
        case "game-generations/edit":
          // TODO: Handler edit
          break;
        case "game-generations/delete":
          // TODO: Handler delete
          break;
      }
      this.isPopoverOpen = false;
    },
  },
  mounted(): void {
    this.fetchGameGenerations();
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
