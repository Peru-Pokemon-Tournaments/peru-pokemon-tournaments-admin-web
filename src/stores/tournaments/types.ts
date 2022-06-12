import { SmallTournament } from "@/models/small-tournament.model";

export interface TournamentsStoreState {
  tournaments: SmallTournament[];
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingTournaments: boolean;
}
