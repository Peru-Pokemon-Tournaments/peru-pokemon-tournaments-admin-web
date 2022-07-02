<template>
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <base-file-input
          v-model="tournamentDTO.tournamentImageFile"
          :disabled="isLoading"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-8">
        <label>Título</label>
        <base-input
          v-model="tournamentDTO.title"
          :is-valid="isValidTitle"
          :disabled="isLoading"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-4">
        <label>Lugar</label>
        <base-input
          v-model="tournamentDTO.place"
          :is-valid="isValidPlace"
          :disabled="isLoading"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Descripción</label>
        <base-textarea
          v-model="tournamentDTO.description"
          :is-valid="isValidDescription"
          :disabled="isLoading"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-6">
        <label>Fecha de Inicio</label>
        <base-input
          type="datetime-local"
          v-model="tournamentDTO.startDate"
          :is-valid="isValidStartDate"
          :disabled="isLoading"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-6">
        <label>Fecha de Fin</label>
        <base-input
          type="datetime-local"
          v-model="tournamentDTO.endDate"
          :is-valid="isValidEndDate"
          :disabled="isLoading"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-4">
        <label>Tipo de torneo</label>
        <base-select
          v-model="tournamentDTO.tournamentType.id"
          :is-valid="isValidTitle"
        >
          <base-option
            v-for="tournamentType in tournamentTypes"
            :value="tournamentType.id"
            :key="tournamentType.id"
          >
            {{ tournamentType.name }}
          </base-option>
        </base-select>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-4">
        <label>Formato</label>
        <base-select
          v-model="tournamentDTO.tournamentFormat.id"
          :is-valid="isValidTitle"
        >
          <base-option
            v-for="tournamentFormat in tournamentFormats"
            :value="tournamentFormat.id"
            :key="tournamentFormat.id"
          >
            {{ tournamentFormat.name }}
          </base-option>
        </base-select>
      </div>
      <div class="form-group col-12 col-sm-3 col-md-2 col-lg-2">
        <label>Moneda</label>
        <base-select
          v-model="tournamentDTO.tournamentPrice.symbol"
          :is-valid="isValidTitle"
        >
          <base-option value="S/.">Soles</base-option>
          <base-option value="$">Dólares</base-option>
        </base-select>
      </div>
      <div class="form-group col-12 col-sm-9 col-md-2 col-lg-2">
        <label>Precio</label>
        <base-input
          v-model="tournamentDTO.tournamentPrice.amount"
          type="number"
          :is-valid="isValidPrice"
          :disabled="isLoading"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Juegos</label>
        <multiple-games-finder v-model="tournamentDTO.games" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Dispositivos</label>
        <multiple-devices-finder v-model="tournamentDTO.devices" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Reglas del torneo</label>
        <multiple-tournament-rules-finder
          v-model="tournamentDTO.tournamentRules"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Sistemas del torneo</label>
        <multiple-tournament-systems-finder
          v-model="tournamentDTO.tournamentSystems"
        />
      </div>
      <base-card id="tournament-prizes-card">
        <template #header>Premios del torneo</template>
        <tournament-prizes-form-list v-model="tournamentDTO.tournamentPrizes" />
      </base-card>
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
import { CreateOrEditTournamentDTO } from "./interfaces/CreateOrEditTournamentDTO";
import { defineComponent, PropType } from "vue";
import { mapActions, mapState } from "pinia";
import { useAppOptionsStore } from "@/stores/app-options";
import { useTournamentsStore } from "@/stores/tournaments";
import MultipleDevicesFinder from "@/components/app/devices/finders/MultipleDevicesFinder.vue";
import MultipleGamesFinder from "@/components/app/games/finders/MultipleGamesFinder.vue";
import MultipleTournamentRulesFinder from "@/components/app/tournament-rules/finders/MultipleTournamentRulesFinder.vue";
import MultipleTournamentSystemsFinder from "@/components/app/tournament-systems/finders/MultipleTournamentSystemsFinder.vue";
import TournamentPrizesFormList from "@/components/app/tournament-prizes/forms/TournamentPrizesFormList.vue";

export default defineComponent({
  emits: ["submit-create", "submit-edit", "after-submit"],
  components: {
    MultipleGamesFinder,
    MultipleDevicesFinder,
    MultipleTournamentRulesFinder,
    MultipleTournamentSystemsFinder,
    TournamentPrizesFormList,
  },
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
      tournamentDTO: {
        title: "",
        description: "",
        place: "",
        startDate: null,
        endDate: null,
        createdByPerson: {
          id: null,
        },
        tournamentType: {
          id: null,
        },
        tournamentFormat: {
          id: null,
        },
        tournamentPrice: {
          symbol: null,
          amount: null,
        },
        tournamentPrizes: [],
        games: [],
        devices: [],
        tournamentSystems: [],
        tournamentRules: [],
        tournamentImageFile: null,
      } as CreateOrEditTournamentDTO,
      isSubmitted: false,
    };
  },
  computed: {
    ...mapState(useTournamentsStore, [
      "selectedTournament",
      "isCreateTournamentLoading",
      "isGetSelectedTournamentLoading",
      "isUpdateSelectedTournamentLoading",
    ]),
    ...mapState(useAppOptionsStore, ["tournamentTypes", "tournamentFormats"]),
    isLoading(): boolean {
      return (
        this.isCreateTournamentLoading ||
        this.isGetSelectedTournamentLoading ||
        this.isUpdateSelectedTournamentLoading
      );
    },
    isValidTitle(): boolean {
      if (this.isSubmitted) {
        return this.tournamentDTO.title.trim() !== "";
      }
      return true;
    },
    isValidDescription(): boolean {
      if (this.isSubmitted) {
        return this.tournamentDTO.description.trim() !== "";
      }
      return true;
    },
    isValidPlace(): boolean {
      if (this.isSubmitted) {
        return this.tournamentDTO.place.trim() !== "";
      }
      return true;
    },
    isValidStartDate(): boolean {
      if (this.isSubmitted) {
        return this.tournamentDTO.startDate !== null;
      }
      return true;
    },
    isValidEndDate(): boolean {
      if (this.isSubmitted) {
        return this.tournamentDTO.endDate !== null;
      }
      return true;
    },
    isValidPrice(): boolean {
      if (this.isSubmitted) {
        return this.tournamentDTO.tournamentPrice.amount !== null;
      }
      return true;
    },
    isValidForm(): boolean {
      return (
        this.isValidTitle &&
        this.isValidDescription &&
        this.isValidPlace &&
        this.isValidStartDate &&
        this.isValidEndDate &&
        this.isValidPrice
      );
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
      return this.isEditing ? "Modificar Torneo" : "Crear Torneo";
    },
  },
  methods: {
    ...mapActions(useTournamentsStore, [
      "createTournament",
      "selectTournament",
      "updateSelectedTournament",
    ]),
    ...mapActions(useAppOptionsStore, [
      "fetchTournamentTypes",
      "fetchTournamentFormats",
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
          data: { ...this.tournamentDTO },
        });
      } else {
        await this.updateSelectedTournament(this.tournamentDTO);
      }
    },
    async handleCreate(): Promise<void> {
      if (this.noHandleSubmit) {
        this.$emit("submit-create", {
          data: { ...this.tournamentDTO },
        });
      } else {
        await this.createTournament(this.tournamentDTO);
      }
    },
  },
  watch: {
    selectedTournament(): void {
      if (this.selectedTournament) {
        this.tournamentDTO.title = this.selectedTournament.title;
      }
    },
  },
  mounted(): void {
    this.fetchTournamentTypes();
    this.fetchTournamentFormats();
    if (this.isEditing) {
      this.selectTournament(this.currentId as string);
    }
  },
});
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;

#tournament-prizes-card {
  width: 100%;
}
</style>
