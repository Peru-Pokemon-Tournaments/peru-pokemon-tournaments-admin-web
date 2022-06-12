import { defineStore } from "pinia";
import { ResponseError } from "@/services/interfaces/response-error";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
import * as Types from "./types";
import { TournamentSystem } from "@/models/tournament-system.model";

const toast = useToast();

export const useTournamentSystemsStore = defineStore("useTournamentSystems", {
  state(): Types.TournamentSystemsStoreState {
    return {
      tournamentSystems: [] as TournamentSystem[],
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingTournamentSystems: false,
    };
  },
  getters: {
    paginatedTournamentSystems(): TournamentSystem[] {
      return this.tournamentSystems as TournamentSystem[];
    },
    isLoadingTournamentSystems(): boolean {
      return this.loadingTournamentSystems;
    },
  },
  actions: {
    async fetchTournamentSystems(
      page?: number,
      pageSize?: number
    ): Promise<void> {
      const userStore = useAuthStore();

      this.loadingTournamentSystems = true;

      try {
        const paginatedResponse =
          await this.tournamentSystemsService.fetchTournamentSystems(
            page,
            pageSize,
            userStore.authToken
          );

        this.tournamentSystems = paginatedResponse.data;
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
        this.loadingTournamentSystems = false;
      }
    },
  },
});
