import { defineStore } from "pinia";
import { ResponseError } from "@/services/interfaces/response-error";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
import * as Types from "./types";
import { TournamentInscription } from "@/models/tournament-inscription.model";

const toast = useToast();

export const useTournamentInscriptionsStore = defineStore(
  "useTournamentInscriptions",
  {
    state(): Types.TournamentInscriptionsStoreState {
      return {
        tournamentInscriptions: [] as TournamentInscription[],
        totalPages: 1,
        currentPage: 1,
        lastPage: 1,
        perPage: 15,
        loadingTournamentInscriptions: false,
      };
    },
    getters: {
      paginatedTournamentInscriptions(): TournamentInscription[] {
        return this.tournamentInscriptions as TournamentInscription[];
      },
      isLoadingTournamentInscriptions(): boolean {
        return this.loadingTournamentInscriptions;
      },
    },
    actions: {
      async fetchTournamentInscriptions(
        page?: number,
        pageSize?: number,
        filters?: { tournament: { id: string } }
      ): Promise<void> {
        const userStore = useAuthStore();

        this.loadingTournamentInscriptions = true;

        try {
          const paginatedResponse =
            await this.tournamentInscriptionsService.fetchTournamentInscriptions(
              page,
              pageSize,
              filters,
              userStore.authToken
            );

          this.tournamentInscriptions = paginatedResponse.data;
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
          this.loadingTournamentInscriptions = false;
        }
      },
    },
  }
);
