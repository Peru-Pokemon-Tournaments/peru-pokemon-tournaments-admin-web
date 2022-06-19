import { defineStore } from "pinia";
import { ResponseError } from "@/services/interfaces/response-error";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
import * as Types from "./types";
import { TournamentRule } from "@/models/tournament-rule.model";

const toast = useToast();

export const useTournamentRulesStore = defineStore("useTournamentRules", {
  state(): Types.TournamentRulesStoreState {
    return {
      tournamentRules: [] as TournamentRule[],
      selectedTournamentRule: null as TournamentRule | null,
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingTournamentRules: false,
      createTournamentRuleLoading: false,
      updateSelectedTournamentRuleLoading: false,
      getSelectedTournamentRuleLoading: false,
      tournamentRulesChanged: false,
    };
  },
  getters: {
    paginatedTournamentRules(): TournamentRule[] {
      return this.tournamentRules as TournamentRule[];
    },
    isLoadingTournamentRules(): boolean {
      return this.loadingTournamentRules;
    },
    isCreateTournamentRuleLoading(): boolean {
      return this.createTournamentRuleLoading;
    },
    isUpdateSelectedTournamentRuleLoading(): boolean {
      return this.updateSelectedTournamentRuleLoading;
    },
    isGetSelectedTournamentRuleLoading(): boolean {
      return this.getSelectedTournamentRuleLoading;
    },
    tournamentRulesHasChanged(): boolean {
      return this.tournamentRulesChanged;
    },
    hasSelectedTournamentRule(): boolean {
      return this.selectedTournamentRule != null;
    },
  },
  actions: {
    async fetchTournamentRules(
      page?: number,
      pageSize?: number
    ): Promise<void> {
      const userStore = useAuthStore();

      this.loadingTournamentRules = true;

      try {
        const paginatedResponse =
          await this.tournamentRulesService.fetchTournamentRules(
            page,
            pageSize,
            userStore.authToken
          );

        this.tournamentRules = paginatedResponse.data;
        this.totalPages = paginatedResponse.totalPages;
        this.currentPage = paginatedResponse.currentPage;
        this.lastPage = paginatedResponse.lastPage;
        this.perPage = paginatedResponse.perPage;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.loadingTournamentRules = false;
      }
    },
    async createTournamentRule(attributes: {
      name: string;
      description: string;
    }): Promise<void> {
      const userStore = useAuthStore();

      this.createTournamentRuleLoading = true;

      try {
        const basicResponse =
          await this.tournamentRulesService.createTournamentRule(
            attributes,
            userStore.authToken
          );
        toast.success(basicResponse.message);
        this.tournamentRulesChanged = true;
        setTimeout(() => (this.tournamentRulesChanged = false), 1000);
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.createTournamentRuleLoading = false;
      }
    },
    async selectTournamentRule(tournamentRuleId: string): Promise<void> {
      const userStore = useAuthStore();

      this.getSelectedTournamentRuleLoading = true;
      this.selectedTournamentRule = null;

      try {
        const response = await this.tournamentRulesService.getTournamentRule(
          tournamentRuleId,
          userStore.authToken
        );

        this.selectedTournamentRule = response.resource;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.getSelectedTournamentRuleLoading = false;
      }
    },

    async updateSelectedTournamentRule(attributes: {
      name?: string;
      description?: string;
    }): Promise<void> {
      if (!this.hasSelectedTournamentRule) {
        return;
      }

      const userStore = useAuthStore();

      this.updateSelectedTournamentRuleLoading = true;

      try {
        const response = await this.tournamentRulesService.updateTournamentRule(
          this.selectedTournamentRule!.id,
          attributes,
          userStore.authToken
        );
        this.tournamentRulesChanged = true;
        setTimeout(() => (this.tournamentRulesChanged = false), 1000);
        toast.success(response.message);
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.updateSelectedTournamentRuleLoading = false;
      }
    },
  },
});
