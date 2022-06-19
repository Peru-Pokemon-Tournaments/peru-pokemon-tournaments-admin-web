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
      selectedTournamentSystem: null as TournamentSystem | null,
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingTournamentSystems: false,
      createTournamentSystemLoading: false,
      updateSelectedTournamentSystemLoading: false,
      getSelectedTournamentSystemLoading: false,
      tournamentSystemsChanged: false,
    };
  },
  getters: {
    paginatedTournamentSystems(): TournamentSystem[] {
      return this.tournamentSystems as TournamentSystem[];
    },
    isLoadingTournamentSystems(): boolean {
      return this.loadingTournamentSystems;
    },
    isCreateTournamentSystemLoading(): boolean {
      return this.createTournamentSystemLoading;
    },
    isUpdateSelectedTournamentSystemLoading(): boolean {
      return this.updateSelectedTournamentSystemLoading;
    },
    isGetSelectedTournamentSystemLoading(): boolean {
      return this.getSelectedTournamentSystemLoading;
    },
    tournamentSystemsHasChanged(): boolean {
      return this.tournamentSystemsChanged;
    },
    hasSelectedTournamentSystem(): boolean {
      return this.selectedTournamentSystem != null;
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
    async createTournamentSystem(attributes: {
      name: string;
      description: string;
    }): Promise<void> {
      const userStore = useAuthStore();

      this.createTournamentSystemLoading = true;

      try {
        const basicResponse =
          await this.tournamentSystemsService.createTournamentSystem(
            attributes,
            userStore.authToken
          );
        toast.success(basicResponse.message);
        this.tournamentSystemsChanged = true;
        setTimeout(() => (this.tournamentSystemsChanged = false), 1000);
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.createTournamentSystemLoading = false;
      }
    },
    async selectTournamentSystem(tournamentSystemId: string): Promise<void> {
      const userStore = useAuthStore();

      this.getSelectedTournamentSystemLoading = true;
      this.selectedTournamentSystem = null;

      try {
        const response =
          await this.tournamentSystemsService.getTournamentSystem(
            tournamentSystemId,
            userStore.authToken
          );

        this.selectedTournamentSystem = response.resource;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.getSelectedTournamentSystemLoading = false;
      }
    },

    async updateSelectedTournamentSystem(attributes: {
      name?: string;
      description?: string;
    }): Promise<void> {
      if (!this.hasSelectedTournamentSystem) {
        return;
      }

      const userStore = useAuthStore();

      this.updateSelectedTournamentSystemLoading = true;

      try {
        const response =
          await this.tournamentSystemsService.updateTournamentSystem(
            this.selectedTournamentSystem!.id,
            attributes,
            userStore.authToken
          );
        this.tournamentSystemsChanged = true;
        setTimeout(() => (this.tournamentSystemsChanged = false), 1000);
        toast.success(response.message);
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.updateSelectedTournamentSystemLoading = false;
      }
    },
  },
});
