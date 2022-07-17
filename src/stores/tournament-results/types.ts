import { TournamentResult } from "@/models/tournament-result.model";

export interface TournamentResultsStoreState {
  tournamentResults: TournamentResult[];
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingTournamentResults: boolean;
}
