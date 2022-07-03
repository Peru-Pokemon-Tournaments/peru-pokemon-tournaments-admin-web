<template>
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Poekmon Showdown Team</label>
        <base-textarea
          v-model="tournamentInscriptionDTO.pokemonShowdownTeamExport"
          :rows="20"
          :is-valid="isValidPokemonShowdownTeam"
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
import { useTournamentInscriptionsStore } from "@/stores/tournament-inscriptions";
import { mapActions, mapState } from "pinia";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  emits: ["submit-create", "submit-edit", "after-submit"],
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
        pokemonShowdownTeamExport: "",
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
    isLoading(): boolean {
      return (
        this.isGetSelectedTournamentInscriptionLoading ||
        this.isUpdateSelectedTournamentInscriptionLoading
      );
    },
    isValidPokemonShowdownTeam(): boolean {
      if (this.isSubmitted) {
        return this.tournamentInscriptionDTO.pokemonShowdownTeamExport !== "";
      }
      return true;
    },
    isValidForm(): boolean {
      return this.isValidPokemonShowdownTeam;
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
      return "Modificar equipo";
    },
  },
  methods: {
    ...mapActions(useTournamentInscriptionsStore, [
      "selectTournamentInscription",
      "updateSelectedTournamentInscription",
    ]),
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
        await this.updateSelectedTournamentInscription(
          this.tournamentInscriptionDTO
        );
      }
    },
  },
  watch: {
    selectedTournamentInscription(): void {
      if (this.selectedTournamentInscription) {
        this.tournamentInscriptionDTO.pokemonShowdownTeamExport =
          this.selectedTournamentInscription.pokemonShowdownTeam.team;
      }
    },
  },
  mounted(): void {
    if (this.isEditing) {
      this.selectTournamentInscription(this.currentId as string);
    }
  },
});
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
