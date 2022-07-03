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
        tournamentInscriptions: [],
        selectedTournamentInscription: null,
        totalPages: 1,
        currentPage: 1,
        lastPage: 1,
        perPage: 15,
        loadingTournamentInscriptions: false,
        updateSelectedTournamentInscriptionLoading: false,
        getSelectedTournamentInscriptionLoading: false,
        tournamentInscriptionsChanged: false,
      };
    },
    getters: {
      paginatedTournamentInscriptions(): TournamentInscription[] {
        return this.tournamentInscriptions as TournamentInscription[];
      },
      isLoadingTournamentInscriptions(): boolean {
        return this.loadingTournamentInscriptions;
      },
      isUpdateSelectedTournamentInscriptionLoading(): boolean {
        return this.updateSelectedTournamentInscriptionLoading;
      },
      isGetSelectedTournamentInscriptionLoading(): boolean {
        return this.getSelectedTournamentInscriptionLoading;
      },
      tournamentInscriptionsHasChanged(): boolean {
        return this.tournamentInscriptionsChanged;
      },
      hasSelectedTournamentInscription(): boolean {
        return this.selectedTournamentInscription != null;
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

      async selectTournamentInscription(
        tournamentInscriptionId: string
      ): Promise<void> {
        const userStore = useAuthStore();

        this.getSelectedTournamentInscriptionLoading = true;
        this.selectedTournamentInscription = null;

        try {
          const response =
            await this.tournamentInscriptionsService.getTournamentInscription(
              tournamentInscriptionId,
              userStore.authToken
            );

          this.selectedTournamentInscription = response.resource;
        } catch (error: unknown | ResponseError) {
          if (error instanceof ResponseError) {
            toast.error(error.fullErrorMessage);
          } else {
            console.warn(error);
          }
        } finally {
          this.getSelectedTournamentInscriptionLoading = false;
        }
      },

      async updateSelectedTournamentInscription(attributes: {
        pokemonShowdownTeamExport: string;
      }): Promise<void> {
        if (!this.hasSelectedTournamentInscription) {
          return;
        }

        const userStore = useAuthStore();

        this.updateSelectedTournamentInscriptionLoading = true;

        try {
          const response =
            await this.tournamentInscriptionsService.updateTournamentInscription(
              this.selectedTournamentInscription!.id,
              attributes,
              userStore.authToken
            );
          this.tournamentInscriptionsChanged = true;
          setTimeout(() => (this.tournamentInscriptionsChanged = false), 1000);
          toast.success(response.message);
        } catch (error: unknown | ResponseError) {
          if (error instanceof ResponseError) {
            toast.error(error.fullErrorMessage);
          } else {
            console.warn(error);
          }
        } finally {
          this.updateSelectedTournamentInscriptionLoading = false;
        }
      },
    },
  }
);
