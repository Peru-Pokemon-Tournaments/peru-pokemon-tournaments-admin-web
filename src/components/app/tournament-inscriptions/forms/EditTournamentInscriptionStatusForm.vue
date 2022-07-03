<template>
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Estado</label>
        <base-select v-model="tournamentInscriptionDTO.status">
          <base-option
            v-for="status in tournamentInscriptionStatues"
            :key="status.key"
            :value="status.key"
          >
            {{ status.value }}
          </base-option>
        </base-select>
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
import { useAppOptionsStore } from "@/stores/app-options";
import { useTournamentInscriptionsStore } from "@/stores/tournament-inscriptions";
import { mapActions, mapState } from "pinia";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  emits: ["submit-edit", "after-submit"],
  props: {
    currentId: {
      type: String as PropType<string | null>,
      required: true,
    },
    noHandleSubmit: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  data() {
    return {
      tournamentInscriptionDTO: {
        status: null as string | null,
      },
      isSubmitted: false,
    };
  },
  computed: {
    ...mapState(useTournamentInscriptionsStore, [
      "selectedTournamentInscription",
      "isGetSelectedTournamentInscriptionLoading",
      "isUpdateSelectedTournamentInscriptionLoading",
    ]),
    ...mapState(useAppOptionsStore, ["tournamentInscriptionStatues"]),
    isLoading(): boolean {
      return (
        this.isGetSelectedTournamentInscriptionLoading ||
        this.isUpdateSelectedTournamentInscriptionLoading
      );
    },
    isValidStatus(): boolean {
      if (this.isSubmitted) {
        return this.tournamentInscriptionDTO.status !== null;
      }
      return true;
    },
    isValidForm(): boolean {
      return this.isValidStatus;
    },
    isEditing(): boolean {
      return (
        this.currentId !== null &&
        this.currentId !== undefined &&
        typeof this.currentId === "string"
      );
    },
    submitButtonColor(): string {
      return "success";
    },
    submitButtonText(): string {
      return "Modificar estado";
    },
  },
  methods: {
    ...mapActions(useTournamentInscriptionsStore, [
      "selectTournamentInscription",
      "updateSelectedTournamentInscriptionStatus",
    ]),
    ...mapActions(useAppOptionsStore, ["fetchTournamentInscriptionStatuses"]),
    async submitForm(): Promise<void> {
      this.isSubmitted = true;

      if (!this.isValidForm) {
        return;
      }

      await this.handleUpdate();
      this.$emit("after-submit");
    },
    async handleUpdate(): Promise<void> {
      if (this.noHandleSubmit) {
        this.$emit("submit-edit", {
          id: this.currentId,
          data: { ...this.tournamentInscriptionDTO },
        });
      } else {
        await this.updateSelectedTournamentInscriptionStatus(
          this.tournamentInscriptionDTO.status as string
        );
      }
    },
  },
  watch: {
    selectedTournamentInscription(): void {
      if (this.selectedTournamentInscription) {
        this.tournamentInscriptionDTO.status =
          this.selectedTournamentInscription.status;
      }
    },
  },
  mounted(): void {
    if (this.isEditing) {
      this.selectTournamentInscription(this.currentId as string);
      this.fetchTournamentInscriptionStatuses();
    }
  },
});
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
