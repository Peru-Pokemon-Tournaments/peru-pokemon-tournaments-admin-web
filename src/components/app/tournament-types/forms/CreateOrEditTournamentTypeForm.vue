<template>
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Nombre</label>
        <base-input
          v-model="tournamentTypeDTO.name"
          :is-valid="isValidName"
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
import { useTournamentTypesStore } from "@/stores/tournament-types";
import { mapActions, mapState } from "pinia";
import { defineComponent, PropType } from "vue";
import { CreateOrEditTournamentTypeDTO } from "./interfaces/CreateOrEditTournamentTypeDTO";

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
      tournamentTypeDTO: {
        name: "" as string,
      } as CreateOrEditTournamentTypeDTO,
      isSubmitted: false,
    };
  },
  computed: {
    ...mapState(useTournamentTypesStore, [
      "selectedTournamentType",
      "isCreateTournamentTypeLoading",
      "isGetSelectedTournamentTypeLoading",
      "isUpdateSelectedTournamentTypeLoading",
    ]),
    isLoading(): boolean {
      return (
        this.isCreateTournamentTypeLoading ||
        this.isGetSelectedTournamentTypeLoading ||
        this.isUpdateSelectedTournamentTypeLoading
      );
    },
    isValidName(): boolean {
      if (this.isSubmitted) {
        return this.tournamentTypeDTO.name !== "";
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
        ? "Modificar Tipo de Torneo"
        : "Crear Tipo de Torneo";
    },
  },
  methods: {
    ...mapActions(useTournamentTypesStore, [
      "createTournamentType",
      "selectTournamentType",
      "updateSelectedTournamentType",
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
          data: { ...this.tournamentTypeDTO },
        });
      } else {
        await this.updateSelectedTournamentType({
          ...this.tournamentTypeDTO,
        });
      }
    },
    async handleCreate(): Promise<void> {
      if (this.noHandleSubmit) {
        this.$emit("submit-create", {
          data: { ...this.tournamentTypeDTO },
        });
      } else {
        await this.createTournamentType({ ...this.tournamentTypeDTO });
      }
    },
  },
  watch: {
    selectedTournamentType(): void {
      if (this.selectedTournamentType) {
        this.tournamentTypeDTO.name = this.selectedTournamentType.name;
      }
    },
  },
  mounted(): void {
    if (this.isEditing) {
      this.selectTournamentType(this.currentId as string);
    }
  },
});
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
