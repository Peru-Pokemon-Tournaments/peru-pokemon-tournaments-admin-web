import { TournamentInscription } from "@/models/tournament-inscription.model";

export interface TournamentInscriptionsStoreState {
  tournamentInscriptions: TournamentInscription[];
  selectedTournamentInscription: TournamentInscription | null;
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingTournamentInscriptions: boolean;
  updateSelectedTournamentInscriptionLoading: boolean;
  getSelectedTournamentInscriptionLoading: boolean;
  tournamentInscriptionsChanged: boolean;
}
