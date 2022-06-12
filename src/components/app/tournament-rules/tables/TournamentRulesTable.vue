<template>
  <div class="center" v-if="isLoadingTournamentRules">Cargando...</div>
  <base-table v-else>
    <template #head>
      <base-cell tag="th">Nº</base-cell>
      <base-cell tag="th">Nombre</base-cell>
      <base-cell tag="th" class="wrap">Descripción</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(tournamentRule, index) in paginatedTournamentRules"
        :key="tournamentRule.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ orderNumber(index) }}
        </base-cell>
        <base-cell tag="td" class="wrap-1">
          {{ tournamentRule.name }}
        </base-cell>
        <base-cell tag="td" class="wrap-10">
          {{ tournamentRule.description }}
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${tournamentRule.id}-tournament-rules-actions`"
            :data-id="`${tournamentRule.id}-tournament-rules-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="
              isPopoverOpen && selectedTournamentRule.id === tournamentRule.id
            "
            :target-data-id="`${tournamentRule.id}-tournament-rules-actions`"
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
    v-if="!isLoadingTournamentRules"
    :current-page="currentPage"
    :total-pages="totalPages"
    @select-page="loadTournamentRules"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { TournamentRule } from "@/models/tournament-rule.model";
import { useTournamentRulesStore } from "@/stores/tournament-rules";

export default defineComponent({
  data() {
    return {
      selectedTournamentRule: null as TournamentRule | null,
      isPopoverOpen: false,
      tableActions: [
        {
          key: "tournament-rules/edit",
          name: "Editar",
          icon: { name: "edit", type: "fas" },
        },
        {
          key: "tournament-rules/delete",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
        },
      ],
    };
  },
  computed: {
    ...mapState(useTournamentRulesStore, [
      "paginatedTournamentRules",
      "totalPages",
      "currentPage",
      "perPage",
      "isLoadingTournamentRules",
    ]),
  },
  methods: {
    ...mapActions(useTournamentRulesStore, ["fetchTournamentRules"]),
    orderNumber(index: number): number {
      return index + 1 + this.perPage * (this.currentPage - 1);
    },
    loadTournamentRules(pageNumber: number): void {
      this.fetchTournamentRules(pageNumber);
    },
    setSelectedTournamentRule(tournamentRule?: TournamentRule): void {
      if (tournamentRule) {
        this.selectedTournamentRule = tournamentRule;
      }
    },
    clearSelectedTournamentRule(): void {
      this.selectedTournamentRule = null;
    },
    openPopover(index: number): void {
      const tournamentRule = this.paginatedTournamentRules[index];
      this.setSelectedTournamentRule(tournamentRule);
      this.isPopoverOpen = true;
    },
    closePopover(): void {
      this.clearSelectedTournamentRule();
      this.isPopoverOpen = false;
    },
    onSelectAction(actionKey: string): void {
      switch (actionKey) {
        case "tournament-rules/edit":
          // TODO: Handler edit
          break;
        case "tournament-rules/delete":
          // TODO: Handler delete
          break;
      }
      this.isPopoverOpen = false;
    },
  },
  mounted(): void {
    this.fetchTournamentRules();
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
