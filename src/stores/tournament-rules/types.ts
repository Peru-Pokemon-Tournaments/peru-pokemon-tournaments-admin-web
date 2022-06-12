import { Role } from "@/models/role.model";
import { TournamentRule } from "@/models/tournament-rule.model";

export interface TournamentRulesStoreState {
  tournamentRules: TournamentRule[];
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingTournamentRules: boolean;
}
