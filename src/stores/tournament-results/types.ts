import { TournamentResult } from "@/models/tournament-result.model";

export interface TournamentResultsStoreState {
  tournamentResults: TournamentResult[];
  selectedTournamentResult: TournamentResult | null;
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingTournamentResults: boolean;
  createTournamentResultLoading: boolean;
  updateSelectedTournamentResultLoading: boolean;
  getSelectedTournamentResultLoading: boolean;
  tournamentResultsChanged: boolean;
}
