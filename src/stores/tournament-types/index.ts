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
      selectedTournamentType: null as TournamentType | null,
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingTournamentTypes: false,
      createTournamentTypeLoading: false,
      updateSelectedTournamentTypeLoading: false,
      getSelectedTournamentTypeLoading: false,
      tournamentTypesChanged: false,
    };
  },
  getters: {
    paginatedTournamentTypes(): TournamentType[] {
      return this.tournamentTypes as TournamentType[];
    },
    isLoadingTournamentTypes(): boolean {
      return this.loadingTournamentTypes;
    },
    isCreateTournamentTypeLoading(): boolean {
      return this.createTournamentTypeLoading;
    },
    isUpdateSelectedTournamentTypeLoading(): boolean {
      return this.updateSelectedTournamentTypeLoading;
    },
    isGetSelectedTournamentTypeLoading(): boolean {
      return this.getSelectedTournamentTypeLoading;
    },
    tournamentTypesHasChanged(): boolean {
      return this.tournamentTypesChanged;
    },
    hasSelectedTournamentType(): boolean {
      return this.selectedTournamentType != null;
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
    async createTournamentType(attributes: { name: string }): Promise<void> {
      const userStore = useAuthStore();

      this.createTournamentTypeLoading = true;

      try {
        const basicResponse =
          await this.tournamentTypesService.createTournamentType(
            attributes,
            userStore.authToken
          );
        toast.success(basicResponse.message);
        this.tournamentTypesChanged = true;
        setTimeout(() => (this.tournamentTypesChanged = false), 1000);
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.createTournamentTypeLoading = false;
      }
    },
    async selectTournamentType(tournamentTypeId: string): Promise<void> {
      const userStore = useAuthStore();

      this.getSelectedTournamentTypeLoading = true;
      this.selectedTournamentType = null;

      try {
        const response = await this.tournamentTypesService.getTournamentType(
          tournamentTypeId,
          userStore.authToken
        );

        this.selectedTournamentType = response.resource;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.getSelectedTournamentTypeLoading = false;
      }
    },

    async updateSelectedTournamentType(attributes: {
      name: string;
    }): Promise<void> {
      if (!this.hasSelectedTournamentType) {
        return;
      }

      const userStore = useAuthStore();

      this.updateSelectedTournamentTypeLoading = true;

      try {
        const response = await this.tournamentTypesService.updateTournamentType(
          this.selectedTournamentType!.id,
          attributes,
          userStore.authToken
        );
        this.tournamentTypesChanged = true;
        setTimeout(() => (this.tournamentTypesChanged = false), 1000);
        toast.success(response.message);
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.updateSelectedTournamentTypeLoading = false;
      }
    },
  },
});
