<template>
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Nombre</label>
        <base-input
          v-model="tournamentRuleDTO.name"
          :is-valid="isValidName"
          :disabled="isLoading"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Descripción</label>
        <base-textarea
          v-model="tournamentRuleDTO.description"
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
import { useTournamentRulesStore } from "@/stores/tournament-rules";
import { mapActions, mapState } from "pinia";
import { defineComponent, PropType } from "vue";
import { CreateOrEditTournamentRuleDTO } from "./interfaces/CreateOrEditTournamentRuleDTO";

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
      tournamentRuleDTO: {
        name: "",
        description: "",
      } as CreateOrEditTournamentRuleDTO,
      isSubmitted: false,
    };
  },
  computed: {
    ...mapState(useTournamentRulesStore, [
      "selectedTournamentRule",
      "isCreateTournamentRuleLoading",
      "isGetSelectedTournamentRuleLoading",
      "isUpdateSelectedTournamentRuleLoading",
    ]),
    isLoading(): boolean {
      return (
        this.isCreateTournamentRuleLoading ||
        this.isGetSelectedTournamentRuleLoading ||
        this.isUpdateSelectedTournamentRuleLoading
      );
    },
    isValidName(): boolean {
      if (this.isSubmitted) {
        return this.tournamentRuleDTO.name !== "";
      }
      return true;
    },
    isValidDescription(): boolean {
      if (this.isSubmitted) {
        return this.tournamentRuleDTO.description !== "";
      }
      return true;
    },
    isValidForm(): boolean {
      return this.isValidName && this.isValidDescription;
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
    ...mapActions(useTournamentRulesStore, [
      "createTournamentRule",
      "selectTournamentRule",
      "updateSelectedTournamentRule",
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
          data: { ...this.tournamentRuleDTO },
        });
      } else {
        await this.updateSelectedTournamentRule({
          ...this.tournamentRuleDTO,
        });
      }
    },
    async handleCreate(): Promise<void> {
      if (this.noHandleSubmit) {
        this.$emit("submit-create", {
          data: { ...this.tournamentRuleDTO },
        });
      } else {
        await this.createTournamentRule({ ...this.tournamentRuleDTO });
      }
    },
  },
  watch: {
    selectedTournamentRule(): void {
      if (this.selectedTournamentRule) {
        this.tournamentRuleDTO.name = this.selectedTournamentRule.name;
        this.tournamentRuleDTO.description =
          this.selectedTournamentRule.description;
      }
    },
  },
  mounted(): void {
    if (this.isEditing) {
      this.selectTournamentRule(this.currentId as string);
    }
  },
});
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
