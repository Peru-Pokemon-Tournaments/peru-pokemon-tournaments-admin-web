<template>
  <base-card>
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-10">
          <h1>Reglas de torneos</h1>
        </div>
        <base-button
          type="button"
          color="success"
          class="col-12 col-sm-12 col-md-4 col-lg-2"
          @click="toggleCreateModal"
        >
          Nueva Regla de Torneo
        </base-button>
      </div>
    </template>
  </base-card>
  <base-card>
    <tournament-rules-table />
  </base-card>
  <base-modal
    title="Nueva Regla de Torneo"
    type="medium"
    :open="isCreateModalOpen"
    @close="toggleCreateModal"
  >
    <create-or-edit-tournament-rule-form @after-submit="closeModal" />
  </base-modal>
</template>
<script lang="ts">
import TournamentRulesTable from "@/components/app/tournament-rules/tables/TournamentRulesTable.vue";
import CreateOrEditTournamentRuleForm from "@/components/app/tournament-rules/forms/CreateOrEditTournamentRuleForm.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    TournamentRulesTable,
    CreateOrEditTournamentRuleForm,
  },
  data() {
    return {
      isCreateModalOpen: false,
    };
  },
  methods: {
    toggleCreateModal() {
      this.isCreateModalOpen = !this.isCreateModalOpen;
    },
    closeModal(): void {
      this.toggleCreateModal();
    },
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
