import { defineStore } from "pinia";
import { ResponseError } from "@/services/interfaces/response-error";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
import * as Types from "./types";
import { SmallTournament } from "@/models/small-tournament.model";
import { CreateOrEditTournamentDTO } from "@/components/app/tournaments/forms/interfaces/CreateOrEditTournamentDTO";

const toast = useToast();

export const useTournamentsStore = defineStore("useTournaments", {
  state(): Types.TournamentsStoreState {
    return {
      tournaments: [] as SmallTournament[],
      selectedTournament: null as SmallTournament | null,
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingTournaments: false,
      createTournamentLoading: false,
      updateSelectedTournamentLoading: false,
      getSelectedTournamentLoading: false,
      tournamentsChanged: false,
    };
  },
  getters: {
    paginatedTournaments(): SmallTournament[] {
      return this.tournaments as SmallTournament[];
    },
    isLoadingTournaments(): boolean {
      return this.loadingTournaments;
    },
    isCreateTournamentLoading(): boolean {
      return this.createTournamentLoading;
    },
    isUpdateSelectedTournamentLoading(): boolean {
      return this.updateSelectedTournamentLoading;
    },
    isGetSelectedTournamentLoading(): boolean {
      return this.getSelectedTournamentLoading;
    },
    tournamentsHasChanged(): boolean {
      return this.tournamentsChanged;
    },
    hasSelectedTournament(): boolean {
      return this.selectedTournament != null;
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
    async createTournament(
      attributes: CreateOrEditTournamentDTO
    ): Promise<void> {
      const userStore = useAuthStore();

      this.createTournamentLoading = true;

      attributes.createdByPerson.id = userStore.loggedUser!.person.id;

      try {
        const basicResponse = await this.tournamentsService.createTournament(
          attributes,
          userStore.authToken
        );
        toast.success(basicResponse.message);
        this.tournamentsChanged = true;
        setTimeout(() => (this.tournamentsChanged = false), 1000);
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.createTournamentLoading = false;
      }
    },
    async selectTournament(tournamentId: string): Promise<void> {
      const userStore = useAuthStore();

      this.getSelectedTournamentLoading = true;
      this.selectedTournament = null;

      try {
        const response = await this.tournamentsService.getTournament(
          tournamentId,
          userStore.authToken
        );

        this.selectedTournament = response.resource;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.getSelectedTournamentLoading = false;
      }
    },
    async updateSelectedTournament(
      attributes: CreateOrEditTournamentDTO
    ): Promise<void> {
      if (!this.hasSelectedTournament) {
        return;
      }

      const userStore = useAuthStore();

      this.updateSelectedTournamentLoading = true;

      try {
        const response = await this.tournamentsService.updateTournament(
          this.selectedTournament!.id,
          attributes,
          userStore.authToken
        );
        this.tournamentsChanged = true;
        setTimeout(() => (this.tournamentsChanged = false), 1000);
        toast.success(response.message);
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.updateSelectedTournamentLoading = false;
      }
    },
  },
});
