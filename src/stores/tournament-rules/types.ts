import { TournamentRule } from "@/models/tournament-rule.model";

export interface TournamentRulesStoreState {
  tournamentRules: TournamentRule[];
  selectedTournamentRule: TournamentRule | null;
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingTournamentRules: boolean;
  createTournamentRuleLoading: boolean;
  updateSelectedTournamentRuleLoading: boolean;
  getSelectedTournamentRuleLoading: boolean;
  tournamentRulesChanged: boolean;
}
