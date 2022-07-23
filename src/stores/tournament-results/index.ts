import { defineStore } from "pinia";
import { ResponseError } from "@/services/interfaces/response-error";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
import * as Types from "./types";
import { TournamentResult } from "@/models/tournament-result.model";
import { useTournamentsStore } from "../tournaments";

const toast = useToast();

export const useTournamentResultsStore = defineStore("useTournamentResults", {
  state(): Types.TournamentResultsStoreState {
    return {
      tournamentResults: [] as TournamentResult[],
      selectedTournamentResult: null as TournamentResult | null,
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingTournamentResults: false,
      createTournamentResultLoading: false,
      updateSelectedTournamentResultLoading: false,
      getSelectedTournamentResultLoading: false,
      tournamentResultsChanged: false,
    };
  },
  getters: {
    paginatedTournamentResults(): TournamentResult[] {
      return this.tournamentResults as TournamentResult[];
    },
    isLoadingTournamentResults(): boolean {
      return this.loadingTournamentResults;
    },
    isCreateTournamentResultLoading(): boolean {
      return this.createTournamentResultLoading;
    },
    isUpdateSelectedTournamentResultLoading(): boolean {
      return this.updateSelectedTournamentResultLoading;
    },
    isGetSelectedTournamentResultLoading(): boolean {
      return this.getSelectedTournamentResultLoading;
    },
    tournamentResultsHasChanged(): boolean {
      return this.tournamentResultsChanged;
    },
    hasSelectedTournamentResult(): boolean {
      return this.selectedTournamentResult != null;
    },
  },
  actions: {
    async fetchTournamentResults(
      tournamentId: string,
      page?: number,
      pageSize?: number
    ): Promise<void> {
      const userStore = useAuthStore();

      this.loadingTournamentResults = true;

      try {
        const paginatedResponse =
          await this.tournamentResultsService.fetchTournamentResults(
            tournamentId,
            page,
            pageSize,
            userStore.authToken
          );

        this.tournamentResults = paginatedResponse.data;
        this.totalPages = paginatedResponse.totalPages;
        this.currentPage = paginatedResponse.currentPage;
        this.lastPage = paginatedResponse.lastPage;
        this.perPage = paginatedResponse.perPage;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.loadingTournamentResults = false;
      }
    },
    async createTournamentResult(attributes: {
      score: number;
      place: number;
      competitorId: string;
    }): Promise<void> {
      const userStore = useAuthStore();
      const tournamentsStore = useTournamentsStore();

      this.createTournamentResultLoading = true;

      try {
        const basicResponse =
          await this.tournamentResultsService.createTournamentResult(
            tournamentsStore.selectedTournament!.id,
            attributes,
            userStore.authToken
          );
        toast.success(basicResponse.message);
        this.tournamentResultsChanged = true;
        setTimeout(() => (this.tournamentResultsChanged = false), 1000);
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.createTournamentResultLoading = false;
      }
    },
    async selectTournamentResult(tournamentResultId: string): Promise<void> {
      const userStore = useAuthStore();

      this.getSelectedTournamentResultLoading = true;
      this.selectedTournamentResult = null;

      try {
        const response =
          await this.tournamentResultsService.getTournamentResult(
            tournamentResultId,
            userStore.authToken
          );

        this.selectedTournamentResult = response.resource;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.getSelectedTournamentResultLoading = false;
      }
    },

    async updateSelectedTournamentResult(attributes: {
      score?: number;
      place?: number;
      competitorId: string;
    }): Promise<void> {
      if (!this.hasSelectedTournamentResult) {
        return;
      }

      const userStore = useAuthStore();
      const tournamentsStore = useTournamentsStore();

      this.updateSelectedTournamentResultLoading = true;

      try {
        const response =
          await this.tournamentResultsService.updateTournamentResult(
            this.selectedTournamentResult!.id,
            tournamentsStore.selectedTournament!.id,
            attributes,
            userStore.authToken
          );
        this.tournamentResultsChanged = true;
        setTimeout(() => (this.tournamentResultsChanged = false), 1000);
        toast.success(response.message);
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.updateSelectedTournamentResultLoading = false;
      }
    },
  },
});
