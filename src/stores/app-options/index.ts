import { defineStore } from "pinia";
import { ResponseError } from "@/services/interfaces/response-error";
import { useToast } from "vue-toastification";
import * as Types from "./types";

const toast = useToast();

export const useAppOptionsStore = defineStore("useAppOptions", {
  state(): Types.AppOptionsStoreState {
    return {
      devices: [],
      gameGenerations: [],
      games: [],
      roles: [],
      tournamentFormats: [],
      tournamentRules: [],
      tournamentSystems: [],
      tournamentTypes: [],
    };
  },
  actions: {
    async fetchAllOptions(): Promise<void> {
      await this.fetchDevices();
      await this.fetchGameGenerations();
      await this.fetchGames();
      await this.fetchRoles();
      await this.fetchTournamentFormats();
      await this.fetchTournamentRules();
      await this.fetchTournamentSystems();
      await this.fetchTournamentTypes();
    },
    async fetchDevices(): Promise<void> {
      try {
        const response = await this.appOptionsService.getDevices();
        this.devices = response.resource;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      }
    },
    async fetchGameGenerations(): Promise<void> {
      try {
        const response = await this.appOptionsService.getGameGenerations();
        this.gameGenerations = response.resource;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      }
    },
    async fetchGames(): Promise<void> {
      try {
        const response = await this.appOptionsService.getGames();
        this.games = response.resource;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      }
    },
    async fetchRoles(): Promise<void> {
      try {
        const response = await this.appOptionsService.getRoles();
        this.roles = response.resource;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      }
    },
    async fetchTournamentFormats(): Promise<void> {
      try {
        const response = await this.appOptionsService.getTournamentFormats();
        this.tournamentFormats = response.resource;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      }
    },
    async fetchTournamentRules(): Promise<void> {
      try {
        const response = await this.appOptionsService.getTournamentRules();
        this.tournamentRules = response.resource;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      }
    },
    async fetchTournamentSystems(): Promise<void> {
      try {
        const response = await this.appOptionsService.getTournamentSystems();
        this.tournamentSystems = response.resource;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      }
    },
    async fetchTournamentTypes(): Promise<void> {
      try {
        const response = await this.appOptionsService.getTournamentTypes();
        this.tournamentTypes = response.resource;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      }
    },
  },
});
