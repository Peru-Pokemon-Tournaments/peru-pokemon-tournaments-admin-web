<template>
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Generación</label>
        <base-input
          v-model="gameGenerationDTO.generation"
          type="number"
          :is-valid="isValidGeneration"
          :disabled="isLoading"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Descripción</label>
        <base-textarea
          v-model="gameGenerationDTO.description"
          :is-valid="isValidDescription"
          :disabled="isLoading"
        />
      </div>
    </div>
    <div class="flex-end">
      <base-button
        type="submit"
        :color="submitButtonColor"
        :disabled="isLoading"
      >
        {{ submitButtonText }}
      </base-button>
    </div>
  </form>
</template>
<script lang="ts">
import { useGameGenerationsStore } from "@/stores/game-generations";
import { mapActions, mapState } from "pinia";
import { defineComponent, PropType } from "vue";
import { CreateOrEditGameGenerationDTO } from "./interfaces/CreateOrEditGameGenerationDTO";

export default defineComponent({
  emits: ["submit-create", "submit-edit", "after-submit"],
  props: {
    currentId: {
      type: String as PropType<string | null>,
    },
    noHandleSubmit: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  data() {
    return {
      gameGenerationDTO: {
        generation: "",
        description: "",
      } as CreateOrEditGameGenerationDTO,
      isSubmitted: false,
    };
  },
  computed: {
    ...mapState(useGameGenerationsStore, [
      "selectedGameGeneration",
      "isCreateGameGenerationLoading",
      "isGetSelectedGameGenerationLoading",
      "isUpdateSelectedGameGenerationLoading",
    ]),
    isLoading(): boolean {
      return (
        this.isCreateGameGenerationLoading ||
        this.isGetSelectedGameGenerationLoading ||
        this.isUpdateSelectedGameGenerationLoading
      );
    },
    isValidGeneration(): boolean {
      if (this.isSubmitted) {
        return this.gameGenerationDTO.generation !== "";
      }
      return true;
    },
    isValidDescription(): boolean {
      if (this.isSubmitted) {
        return this.gameGenerationDTO.description !== "";
      }
      return true;
    },
    isValidForm(): boolean {
      return this.isValidGeneration && this.isValidDescription;
    },
    isEditing(): boolean {
      return (
        this.currentId !== null &&
        this.currentId !== undefined &&
        typeof this.currentId === "string"
      );
    },
    submitButtonColor(): string {
      return this.isEditing ? "success" : "primary";
    },
    submitButtonText(): string {
      return this.isEditing
        ? "Modificar Generación de Juego"
        : "Crear Generación de Juego";
    },
  },
  methods: {
    ...mapActions(useGameGenerationsStore, [
      "createGameGeneration",
      "selectGameGeneration",
      "updateSelectedGameGeneration",
    ]),
    async submitForm(): Promise<void> {
      this.isSubmitted = true;

      if (!this.isValidForm) {
        return;
      }

      if (this.isEditing) {
        await this.handleUpdate();
      } else {
        await this.handleCreate();
      }
      this.$emit("after-submit");
    },
    async handleUpdate(): Promise<void> {
      if (this.noHandleSubmit) {
        this.$emit("submit-edit", {
          id: this.currentId,
          data: { ...this.gameGenerationDTO },
        });
      } else {
        await this.updateSelectedGameGeneration({ ...this.gameGenerationDTO });
      }
    },
    async handleCreate(): Promise<void> {
      if (this.noHandleSubmit) {
        this.$emit("submit-create", {
          data: { ...this.gameGenerationDTO },
        });
      } else {
        await this.createGameGeneration({ ...this.gameGenerationDTO });
      }
    },
  },
  watch: {
    selectedGameGeneration(): void {
      if (this.selectedGameGeneration) {
        this.gameGenerationDTO.generation =
          this.selectedGameGeneration.generation;
        this.gameGenerationDTO.description =
          this.selectedGameGeneration.description;
      }
    },
  },
  mounted(): void {
    if (this.isEditing) {
      this.selectGameGeneration(this.currentId as string);
    }
  },
});
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
