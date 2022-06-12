import { defineStore } from "pinia";
import { ResponseError } from "@/services/interfaces/response-error";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
import * as Types from "./types";
import { TournamentType } from "@/models/tournament-type.model";

const toast = useToast();

export const useTournamentTypesStore = defineStore("useTournamentTypes", {
  state(): Types.TournamentTypesStoreState {
    return {
      tournamentTypes: [] as TournamentType[],
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingTournamentTypes: false,
    };
  },
  getters: {
    paginatedTournamentTypes(): TournamentType[] {
      return this.tournamentTypes as TournamentType[];
    },
    isLoadingTournamentTypes(): boolean {
      return this.loadingTournamentTypes;
    },
  },
  actions: {
    async fetchTournamentTypes(
      page?: number,
      pageSize?: number
    ): Promise<void> {
      const userStore = useAuthStore();

      this.loadingTournamentTypes = true;

      try {
        const paginatedResponse =
          await this.tournamentTypesService.fetchTournamentTypes(
            page,
            pageSize,
            userStore.authToken
          );

        this.tournamentTypes = paginatedResponse.data;
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
        this.loadingTournamentTypes = false;
      }
    },
  },
});
