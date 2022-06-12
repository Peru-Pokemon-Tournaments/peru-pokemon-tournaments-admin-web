import { TournamentType } from "@/models/tournament-type.model";

export interface TournamentTypesStoreState {
  tournamentTypes: TournamentType[];
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingTournamentTypes: boolean;
}
