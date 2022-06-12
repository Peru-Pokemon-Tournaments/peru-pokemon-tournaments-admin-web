import { Game } from "@/models/game.model";

export interface GamesStoreState {
  games: Game[];
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingGames: boolean;
}
