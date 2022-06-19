<template>
  <base-card>
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-10">
          <h1>Generaciones de Juegos</h1>
        </div>
        <base-button
          type="button"
          color="success"
          class="col-12 col-sm-12 col-md-4 col-lg-2"
          @click="toggleCreateModal"
        >
          Nueva Generación de Juego
        </base-button>
      </div>
    </template>
  </base-card>
  <base-card>
    <game-generations-table />
  </base-card>
  <base-modal
    title="Nueva Generación de Juego"
    type="small"
    :open="isCreateModalOpen"
    @close="toggleCreateModal"
  >
    <create-or-edit-game-generation-form @after-submit="closeModal" />
  </base-modal>
</template>
<script lang="ts">
import GameGenerationsTable from "@/components/app/game-generations/tables/GameGenerationsTable.vue";
import CreateOrEditGameGenerationForm from "@/components/app/game-generations/forms/CreateOrEditGameGenerationForm.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    GameGenerationsTable,
    CreateOrEditGameGenerationForm,
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
