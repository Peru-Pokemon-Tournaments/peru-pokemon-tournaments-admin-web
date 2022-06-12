import { TournamentSystem } from "@/models/tournament-system.model";

export interface TournamentSystemsStoreState {
  tournamentSystems: TournamentSystem[];
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingTournamentSystems: boolean;
}
