import { defineStore } from "pinia";
import { ResponseError } from "@/services/interfaces/response-error";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
import * as Types from "./types";
import { Game } from "@/models/game.model";

const toast = useToast();

export const useGamesStore = defineStore("useGames", {
  state(): Types.GamesStoreState {
    return {
      games: [] as Game[],
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingGames: false,
    };
  },
  getters: {
    paginatedGames(): Game[] {
      return this.games as Game[];
    },
    isLoadingGames(): boolean {
      return this.loadingGames;
    },
  },
  actions: {
    async fetchGames(page?: number, pageSize?: number): Promise<void> {
      const userStore = useAuthStore();

      this.loadingGames = true;

      try {
        const paginatedResponse = await this.gamesService.fetchGames(
          page,
          pageSize,
          userStore.authToken
        );

        this.games = paginatedResponse.data;
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
        this.loadingGames = false;
      }
    },
  },
});
