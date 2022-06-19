<template>
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Nombre</label>
        <base-input
          v-model="tournamentSystemDTO.name"
          :is-valid="isValidName"
          :disabled="isLoading"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Descripción</label>
        <base-textarea
          v-model="tournamentSystemDTO.description"
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
import { useTournamentSystemsStore } from "@/stores/tournament-systems";
import { mapActions, mapState } from "pinia";
import { defineComponent, PropType } from "vue";
import { CreateOrEditTournamentSystemDTO } from "./interfaces/CreateOrEditTournamentSystemDTO";

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
      tournamentSystemDTO: {
        name: "" as string,
      } as CreateOrEditTournamentSystemDTO,
      isSubmitted: false,
    };
  },
  computed: {
    ...mapState(useTournamentSystemsStore, [
      "selectedTournamentSystem",
      "isCreateTournamentSystemLoading",
      "isGetSelectedTournamentSystemLoading",
      "isUpdateSelectedTournamentSystemLoading",
    ]),
    isLoading(): boolean {
      return (
        this.isCreateTournamentSystemLoading ||
        this.isGetSelectedTournamentSystemLoading ||
        this.isUpdateSelectedTournamentSystemLoading
      );
    },
    isValidName(): boolean {
      if (this.isSubmitted) {
        return this.tournamentSystemDTO.name !== "";
      }
      return true;
    },
    isValidDescription(): boolean {
      if (this.isSubmitted) {
        return this.tournamentSystemDTO.description !== "";
      }
      return true;
    },
    isValidForm(): boolean {
      return this.isValidName;
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
        ? "Modificar Sistema de Torneo"
        : "Crear Sistema de Torneo";
    },
  },
  methods: {
    ...mapActions(useTournamentSystemsStore, [
      "createTournamentSystem",
      "selectTournamentSystem",
      "updateSelectedTournamentSystem",
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
          data: { ...this.tournamentSystemDTO },
        });
      } else {
        await this.updateSelectedTournamentSystem({
          ...this.tournamentSystemDTO,
        });
      }
    },
    async handleCreate(): Promise<void> {
      if (this.noHandleSubmit) {
        this.$emit("submit-create", {
          data: { ...this.tournamentSystemDTO },
        });
      } else {
        await this.createTournamentSystem({ ...this.tournamentSystemDTO });
      }
    },
  },
  watch: {
    selectedTournamentSystem(): void {
      if (this.selectedTournamentSystem) {
        this.tournamentSystemDTO.name = this.selectedTournamentSystem.name;
        this.tournamentSystemDTO.description =
          this.selectedTournamentSystem.description;
      }
    },
  },
  mounted(): void {
    if (this.isEditing) {
      this.selectTournamentSystem(this.currentId as string);
    }
  },
});
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
