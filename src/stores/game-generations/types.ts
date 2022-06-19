import { GameGeneration } from "@/models/game-generation.model";

export interface GameGenerationsStoreState {
  gameGenerations: GameGeneration[];
  selectedGameGeneration: GameGeneration | null;
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingGameGenerations: boolean;
  createGameGenerationLoading: boolean;
  updateSelectedGameGenerationLoading: boolean;
  getSelectedGameGenerationLoading: boolean;
  gameGenerationsChanged: boolean;
}
