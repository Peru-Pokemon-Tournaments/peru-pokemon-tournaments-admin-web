import { SmallTournament } from "@/models/small-tournament.model";

export interface TournamentsStoreState {
  tournaments: SmallTournament[];
  selectedTournament: SmallTournament | null;
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingTournaments: boolean;
  createTournamentLoading: boolean;
  updateSelectedTournamentLoading: boolean;
  getSelectedTournamentLoading: boolean;
  tournamentsChanged: boolean;
}
