<template>
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Puesto</label>
        <base-input
          v-model="tournamentResultDTO.place"
          type="number"
          :is-valid="isValidScore"
          :disabled="isLoading"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Puntaje</label>
        <base-input
          v-model="tournamentResultDTO.score"
          type="number"
          :is-valid="isValidScore"
          :disabled="isLoading"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Participante</label>
        <base-select v-model="tournamentResultDTO.competitorId">
          <base-option
            v-for="tournamentInscription in tournamentInscriptions"
            :key="tournamentInscription.id"
            :value="tournamentInscription.competitor.id"
          >
            {{ tournamentInscription.competitor.fullName }}
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
import { useTournamentInscriptionsStore } from "@/stores/tournament-inscriptions";
import { useTournamentResultsStore } from "@/stores/tournament-results";
import { useTournamentsStore } from "@/stores/tournaments";
import { mapActions, mapState } from "pinia";
import { defineComponent, PropType } from "vue";
import { CreateOrEditTournamentResultDTO } from "./interfaces/CreateOrEditTournamentResultDTO";

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
      tournamentResultDTO: {
        score: null,
        place: null,
        competitorId: null,
      } as CreateOrEditTournamentResultDTO,
      isSubmitted: false,
    };
  },
  computed: {
    ...mapState(useTournamentResultsStore, [
      "selectedTournamentResult",
      "isCreateTournamentResultLoading",
      "isGetSelectedTournamentResultLoading",
      "isUpdateSelectedTournamentResultLoading",
    ]),
    ...mapState(useTournamentsStore, ["selectedTournament"]),
    ...mapState(useTournamentInscriptionsStore, ["tournamentInscriptions"]),
    isLoading(): boolean {
      return (
        this.isCreateTournamentResultLoading ||
        this.isGetSelectedTournamentResultLoading ||
        this.isUpdateSelectedTournamentResultLoading
      );
    },
    isValidScore(): boolean {
      if (this.isSubmitted) {
        return this.tournamentResultDTO.score !== null;
      }
      return true;
    },
    isValidForm(): boolean {
      return this.isValidScore;
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
      return this.isEditing ? "Modificar Resultado" : "Crear Resultado";
    },
  },
  methods: {
    ...mapActions(useTournamentResultsStore, [
      "createTournamentResult",
      "selectTournamentResult",
      "updateSelectedTournamentResult",
    ]),
    ...mapActions(useTournamentInscriptionsStore, [
      "fetchTournamentInscriptions",
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
          data: { ...this.tournamentResultDTO },
        });
      } else {
        await this.updateSelectedTournamentResult({
          score: this.tournamentResultDTO.score as number,
          place: this.tournamentResultDTO.place as number,
          competitorId: this.tournamentResultDTO!.competitorId as string,
        });
      }
    },
    async handleCreate(): Promise<void> {
      if (this.noHandleSubmit) {
        this.$emit("submit-create", {
          data: { ...this.tournamentResultDTO },
        });
      } else {
        await this.createTournamentResult({
          score: this.tournamentResultDTO.score as number,
          place: this.tournamentResultDTO.place as number,
          competitorId: this.tournamentResultDTO!.competitorId as string,
        });
      }
    },
  },
  watch: {
    selectedTournamentResult(): void {
      if (this.selectedTournamentResult) {
        this.tournamentResultDTO.score = this.selectedTournamentResult.score;
        this.tournamentResultDTO.place = this.selectedTournamentResult.place;
        this.tournamentResultDTO.competitorId =
          this.selectedTournamentResult.tournamentInscription.competitor.id;
      }
    },
  },
  mounted(): void {
    if (this.isEditing) {
      this.selectTournamentResult(this.currentId as string);
    }
    this.fetchTournamentInscriptions(1, 100, {
      tournament: { id: this.selectedTournament!.id },
    });
  },
});
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
