import { TournamentType } from "@/models/tournament-type.model";

export interface TournamentTypesStoreState {
  tournamentTypes: TournamentType[];
  selectedTournamentType: TournamentType | null;
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingTournamentTypes: boolean;
  createTournamentTypeLoading: boolean;
  updateSelectedTournamentTypeLoading: boolean;
  getSelectedTournamentTypeLoading: boolean;
  tournamentTypesChanged: boolean;
}
