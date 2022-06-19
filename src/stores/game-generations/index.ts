import { defineStore } from "pinia";
import { ResponseError } from "@/services/interfaces/response-error";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
import * as Types from "./types";
import { GameGeneration } from "@/models/game-generation.model";

const toast = useToast();

export const useGameGenerationsStore = defineStore("useGameGenerations", {
  state(): Types.GameGenerationsStoreState {
    return {
      gameGenerations: [] as GameGeneration[],
      selectedGameGeneration: null as GameGeneration | null,
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingGameGenerations: false,
      createGameGenerationLoading: false,
      updateSelectedGameGenerationLoading: false,
      getSelectedGameGenerationLoading: false,
      gameGenerationsChanged: false,
    };
  },
  getters: {
    paginatedGameGenerations(): GameGeneration[] {
      return this.gameGenerations as GameGeneration[];
    },
    isLoadingGameGenerations(): boolean {
      return this.loadingGameGenerations;
    },
    isCreateGameGenerationLoading(): boolean {
      return this.createGameGenerationLoading;
    },
    isUpdateSelectedGameGenerationLoading(): boolean {
      return this.updateSelectedGameGenerationLoading;
    },
    isGetSelectedGameGenerationLoading(): boolean {
      return this.getSelectedGameGenerationLoading;
    },
    gameGenerationsHasChanged(): boolean {
      return this.gameGenerationsChanged;
    },
    hasSelectedGameGeneration(): boolean {
      return this.selectedGameGeneration != null;
    },
  },
  actions: {
    async fetchGameGenerations(
      page?: number,
      pageSize?: number
    ): Promise<void> {
      const userStore = useAuthStore();

      this.loadingGameGenerations = true;

      try {
        const paginatedResponse =
          await this.gameGenerationsService.fetchGameGenerations(
            page,
            pageSize,
            userStore.authToken
          );

        this.gameGenerations = paginatedResponse.data;
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
        this.loadingGameGenerations = false;
      }
    },
    async createGameGeneration(attributes: {
      generation: string;
      description: string;
    }): Promise<void> {
      const userStore = useAuthStore();

      this.createGameGenerationLoading = true;

      try {
        const basicResponse =
          await this.gameGenerationsService.createGameGeneration(
            attributes,
            userStore.authToken
          );
        toast.success(basicResponse.message);
        this.gameGenerationsChanged = true;
        setTimeout(() => (this.gameGenerationsChanged = false), 1000);
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.createGameGenerationLoading = false;
      }
    },
    async selectGameGeneration(gameGenerationId: string): Promise<void> {
      const userStore = useAuthStore();

      this.getSelectedGameGenerationLoading = true;
      this.selectedGameGeneration = null;

      try {
        const response = await this.gameGenerationsService.getGameGeneration(
          gameGenerationId,
          userStore.authToken
        );

        this.selectedGameGeneration = response.resource;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.getSelectedGameGenerationLoading = false;
      }
    },

    async updateSelectedGameGeneration(attributes: {
      generation?: string;
      description?: string;
    }): Promise<void> {
      if (!this.hasSelectedGameGeneration) {
        return;
      }

      const userStore = useAuthStore();

      this.updateSelectedGameGenerationLoading = true;

      try {
        const response = await this.gameGenerationsService.updateGameGeneration(
          this.selectedGameGeneration!.id,
          attributes,
          userStore.authToken
        );
        this.gameGenerationsChanged = true;
        setTimeout(() => (this.gameGenerationsChanged = false), 1000);
        toast.success(response.message);
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.updateSelectedGameGenerationLoading = false;
      }
    },
  },
});
