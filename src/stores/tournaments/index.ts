import { defineStore } from "pinia";
import { ResponseError } from "@/services/interfaces/response-error";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
import * as Types from "./types";
import { SmallTournament } from "@/models/small-tournament.model";

const toast = useToast();

export const useTournamentsStore = defineStore("useTournaments", {
  state(): Types.TournamentsStoreState {
    return {
      tournaments: [] as SmallTournament[],
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingTournaments: false,
    };
  },
  getters: {
    paginatedTournaments(): SmallTournament[] {
      return this.tournaments as SmallTournament[];
    },
    isLoadingTournaments(): boolean {
      return this.loadingTournaments;
    },
  },
  actions: {
    async fetchTournaments(page?: number, pageSize?: number): Promise<void> {
      const userStore = useAuthStore();

      this.loadingTournaments = true;

      try {
        const paginatedResponse =
          await this.tournamentsService.fetchTournaments(
            page,
            pageSize,
            userStore.authToken
          );

        this.tournaments = paginatedResponse.data;
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
        this.loadingTournaments = false;
      }
    },
  },
});
