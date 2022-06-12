import { GameGeneration } from "@/models/game-generation.model";

export interface GameGenerationsStoreState {
  gameGenerations: GameGeneration[];
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingGameGenerations: boolean;
}
