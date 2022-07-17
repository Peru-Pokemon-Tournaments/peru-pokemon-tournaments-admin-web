import { defineStore } from "pinia";
import { ResponseError } from "@/services/interfaces/response-error";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
import * as Types from "./types";
import { TournamentResult } from "@/models/tournament-result.model";

const toast = useToast();

export const useTournamentResultsStore = defineStore("useTournamentResults", {
  state(): Types.TournamentResultsStoreState {
    return {
      tournamentResults: [],
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingTournamentResults: false,
    };
  },
  getters: {
    paginatedTournamentResults(): TournamentResult[] {
      return this.tournamentResults as TournamentResult[];
    },
    isLoadingTournamentResults(): boolean {
      return this.loadingTournamentResults;
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
  },
});
