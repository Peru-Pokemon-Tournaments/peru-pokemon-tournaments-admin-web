import { defineStore } from "pinia";
import { ResponseError } from "@/services/interfaces/response-error";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
import * as Types from "./types";
import { TournamentRule } from "@/models/tournament-rule.model";

const toast = useToast();

export const useTournamentRulesStore = defineStore("useTournamentRules", {
  state(): Types.TournamentRulesStoreState {
    return {
      tournamentRules: [] as TournamentRule[],
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingTournamentRules: false,
    };
  },
  getters: {
    paginatedTournamentRules(): TournamentRule[] {
      return this.tournamentRules as TournamentRule[];
    },
    isLoadingTournamentRules(): boolean {
      return this.loadingTournamentRules;
    },
  },
  actions: {
    async fetchTournamentRules(
      page?: number,
      pageSize?: number
    ): Promise<void> {
      const userStore = useAuthStore();

      this.loadingTournamentRules = true;

      try {
        const paginatedResponse =
          await this.tournamentRulesService.fetchTournamentRules(
            page,
            pageSize,
            userStore.authToken
          );

        this.tournamentRules = paginatedResponse.data;
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
        this.loadingTournamentRules = false;
      }
    },
  },
});
