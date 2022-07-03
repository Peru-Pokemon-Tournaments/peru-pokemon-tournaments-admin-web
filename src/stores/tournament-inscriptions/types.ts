import { TournamentInscription } from "@/models/tournament-inscription.model";

export interface TournamentInscriptionsStoreState {
  tournamentInscriptions: TournamentInscription[];
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingTournamentInscriptions: boolean;
}
