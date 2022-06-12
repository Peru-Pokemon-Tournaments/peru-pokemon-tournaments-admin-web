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
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingGameGenerations: false,
    };
  },
  getters: {
    paginatedGameGenerations(): GameGeneration[] {
      return this.gameGenerations as GameGeneration[];
    },
    isLoadingGameGenerations(): boolean {
      return this.loadingGameGenerations;
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
  },
});
