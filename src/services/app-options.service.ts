import { Device } from "@/models/device.model";
import { Game } from "@/models/game.model";
import { GameGeneration } from "@/models/game-generation.model";
import { ResourcedResponse } from "./interfaces/resourced-response";
import { Role } from "@/models/role.model";
import { TournamentSystem } from "@/models/tournament-system.model";
import { TournamentType } from "@/models/tournament-type.model";
import {
  API_DOMAIN,
  GET_DEVICES,
  GET_GAMES,
  GET_GAME_GENERATIONS,
  GET_ROLES,
  GET_TOURNAMENT_FORMATS,
  GET_TOURNAMENT_RULES,
  GET_TOURNAMENT_SYSTEMS,
  GET_TOURNAMENT_TYPES,
} from "@/config/services-uri.config";
import { AxiosError, AxiosInstance } from "axios";
import { ResponseError } from "./interfaces/response-error";
import { DeviceJson } from "@/models/jsons/device.json";
import { GameGenerationJson } from "@/models/jsons/game-generation.json";
import { GameJson } from "@/models/jsons/game.json";
import { RoleJson } from "@/models/jsons/role.json";
import { TournamentSystemJson } from "@/models/jsons/tournament-system.json";
import { TournamentTypeJson } from "@/models/jsons/tournament-type.json";
import { TournamentFormat } from "@/models/tournament-format.model";
import { TournamentRule } from "@/models/tournament-rule.model";
import { TournamentFormatJson } from "@/models/jsons/tournament-format.json";
import { TournamentRuleJson } from "@/models/jsons/tournament-rule.json";

export interface AppOptionsService {
  getDevices(): Promise<ResourcedResponse<Device[]>>;
  getGameGenerations(): Promise<ResourcedResponse<GameGeneration[]>>;
  getGames(): Promise<ResourcedResponse<Game[]>>;
  getRoles(): Promise<ResourcedResponse<Role[]>>;
  getTournamentInscriptionStatuses(): Promise<
    ResourcedResponse<{ key: string; value: string }[]>
  >;
  getTournamentFormats(): Promise<ResourcedResponse<TournamentFormat[]>>;
  getTournamentRules(): Promise<ResourcedResponse<TournamentRule[]>>;
  getTournamentSystems(): Promise<ResourcedResponse<TournamentSystem[]>>;
  getTournamentTypes(): Promise<ResourcedResponse<TournamentType[]>>;
}

export class AppApiOptionsService implements AppOptionsService {
  constructor(private _httpClient: AxiosInstance) {}

  async getDevices(): Promise<ResourcedResponse<Device[]>> {
    try {
      const response = await this._httpClient.get(API_DOMAIN + GET_DEVICES);
      return new ResourcedResponse(
        response.data?.message,
        response.data?.devices.map((deviceJson: DeviceJson) =>
          Device.fromJson(deviceJson)
        )
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async getGameGenerations(): Promise<ResourcedResponse<GameGeneration[]>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN + GET_GAME_GENERATIONS
      );
      return new ResourcedResponse(
        response.data?.message,
        response.data?.game_generations.map(
          (gameGenerationJson: GameGenerationJson) =>
            GameGeneration.fromJson(gameGenerationJson)
        )
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async getGames(): Promise<ResourcedResponse<Game[]>> {
    try {
      const response = await this._httpClient.get(API_DOMAIN + GET_GAMES);

      return new ResourcedResponse(
        response.data?.message,
        response.data?.games.map((gameJson: GameJson) =>
          Game.fromJson(gameJson)
        )
      );
    } catch (error: any | Error | AxiosError) {
      console.log(error);
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async getRoles(): Promise<ResourcedResponse<Role[]>> {
    try {
      const response = await this._httpClient.get(API_DOMAIN + GET_ROLES);
      return new ResourcedResponse(
        response.data?.message,
        response.data?.roles.map((roleJson: RoleJson) =>
          Role.fromJson(roleJson)
        )
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async getTournamentInscriptionStatuses(): Promise<
    ResourcedResponse<{ key: string; value: string }[]>
  > {
    try {
      const response = {
        data: {
          message: "Estados de Inscripción encontradas",
          tournament_inscription_statuses: [
            {
              key: "accepted",
              value: "Aceptado",
            },
            {
              key: "pending",
              value: "Pendiente",
            },
            {
              key: "rejected",
              value: "Rechazado",
            },
          ],
        },
      };
      return new ResourcedResponse(
        response.data?.message,
        response.data?.tournament_inscription_statuses
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async getTournamentFormats(): Promise<ResourcedResponse<TournamentFormat[]>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN + GET_TOURNAMENT_FORMATS
      );
      return new ResourcedResponse(
        response.data?.message,
        response.data?.tournament_formats.map(
          (tournamentFormatJson: TournamentFormatJson) =>
            TournamentFormat.fromJson(tournamentFormatJson)
        )
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async getTournamentRules(): Promise<ResourcedResponse<TournamentRule[]>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN + GET_TOURNAMENT_RULES
      );
      return new ResourcedResponse(
        response.data?.message,
        response.data?.tournament_rules.map(
          (tournamentRuleJson: TournamentRuleJson) =>
            TournamentRule.fromJson(tournamentRuleJson)
        )
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async getTournamentSystems(): Promise<ResourcedResponse<TournamentSystem[]>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN + GET_TOURNAMENT_SYSTEMS
      );
      return new ResourcedResponse(
        response.data?.message,
        response.data?.tournament_systems.map(
          (tournamentSystemJson: TournamentSystemJson) =>
            TournamentSystem.fromJson(tournamentSystemJson)
        )
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async getTournamentTypes(): Promise<ResourcedResponse<TournamentType[]>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN + GET_TOURNAMENT_TYPES
      );
      return new ResourcedResponse(
        response.data?.message,
        response.data?.tournament_types.map(
          (tournamentTypeJson: TournamentTypeJson) =>
            TournamentType.fromJson(tournamentTypeJson)
        )
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }
}
