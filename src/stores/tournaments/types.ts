import { SmallTournament } from "@/models/small-tournament.model";
import { Tournament } from "@/models/tournament.model";

export interface TournamentsStoreState {
  tournaments: SmallTournament[];
  selectedTournament: Tournament | null;
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
