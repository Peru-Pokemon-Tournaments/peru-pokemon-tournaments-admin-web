<template>
  <div class="center" v-if="isLoadingGames">Cargando...</div>
  <base-table v-else>
    <template #head>
      <base-cell tag="th">Nº</base-cell>
      <base-cell tag="th">Nombre</base-cell>
      <base-cell tag="th">Generación</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(game, index) in paginatedGames"
        :key="game.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ orderNumber(index) }}
        </base-cell>
        <base-cell tag="td">
          {{ game.name }}
        </base-cell>
        <base-cell tag="td">
          {{ game.gameGeneration.description }}
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${game.id}-games-actions`"
            :data-id="`${game.id}-games-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="isPopoverOpen && selectedGame.id === game.id"
            :target-data-id="`${game.id}-games-actions`"
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
    v-if="!isLoadingGames"
    :current-page="currentPage"
    :total-pages="totalPages"
    @select-page="loadGames"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { Game } from "@/models/game.model";
import { useGamesStore } from "@/stores/games";

export default defineComponent({
  data() {
    return {
      selectedGame: null as Game | null,
      isPopoverOpen: false,
      tableActions: [
        {
          key: "games/edit",
          name: "Editar",
          icon: { name: "edit", type: "fas" },
        },
        {
          key: "games/delete",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
        },
      ],
    };
  },
  computed: {
    ...mapState(useGamesStore, [
      "paginatedGames",
      "totalPages",
      "currentPage",
      "perPage",
      "isLoadingGames",
    ]),
  },
  methods: {
    ...mapActions(useGamesStore, ["fetchGames"]),
    orderNumber(index: number): number {
      return index + 1 + this.perPage * (this.currentPage - 1);
    },
    loadGames(pageNumber: number): void {
      this.fetchGames(pageNumber);
    },
    setSelectedGame(game?: Game): void {
      if (game) {
        this.selectedGame = game;
      }
    },
    clearSelectedGame(): void {
      this.selectedGame = null;
    },
    openPopover(index: number): void {
      const game = this.paginatedGames[index];
      this.setSelectedGame(game);
      this.isPopoverOpen = true;
    },
    closePopover(): void {
      this.clearSelectedGame();
      this.isPopoverOpen = false;
    },
    onSelectAction(actionKey: string): void {
      switch (actionKey) {
        case "game/edit":
          // TODO: Handler edit
          break;
        case "game/delete":
          // TODO: Handler delete
          break;
      }
      this.isPopoverOpen = false;
    },
  },
  mounted(): void {
    this.fetchGames();
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
