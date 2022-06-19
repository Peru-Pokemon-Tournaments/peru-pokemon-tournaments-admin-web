import { TournamentSystem } from "@/models/tournament-system.model";

export interface TournamentSystemsStoreState {
  tournamentSystems: TournamentSystem[];
  selectedTournamentSystem: TournamentSystem | null;
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingTournamentSystems: boolean;
  createTournamentSystemLoading: boolean;
  updateSelectedTournamentSystemLoading: boolean;
  getSelectedTournamentSystemLoading: boolean;
  tournamentSystemsChanged: boolean;
}
