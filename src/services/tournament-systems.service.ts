import {
  API_DOMAIN,
  CREATE_TOURNAMENT_SYSTEM,
  FETCH_TOURNAMENT_SYSTEMS,
  GET_TOURNAMENT_SYSTEM,
  UPDATE_TOURNAMENT_SYSTEM,
} from "@/config/services-uri.config";
import { TournamentSystemJson } from "@/models/jsons/tournament-system.json";
import { TournamentSystem } from "@/models/tournament-system.model";
import { AxiosError, AxiosInstance } from "axios";
import { BasicResponse } from "./interfaces/basic-response";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResourcedResponse } from "./interfaces/resourced-response";
import { ResponseError } from "./interfaces/response-error";

export interface TournamentSystemsService {
  fetchTournamentSystems(
    page?: number,
    pageSize?: number,
    token?: string
  ): Promise<PaginatedResponse<TournamentSystem>>;
  createTournamentSystem(
    attributes: { name: string; description: string },
    token: string
  ): Promise<BasicResponse>;
  getTournamentSystem(
    tournamentSystemId: string,
    token: string
  ): Promise<ResourcedResponse<TournamentSystem>>;
  updateTournamentSystem(
    tournamentSystemId: string,
    attributes: { name?: string; description?: string },
    token: string
  ): Promise<BasicResponse>;
}

export class ApiTournamentSystemsService implements TournamentSystemsService {
  constructor(private _httpClient: AxiosInstance) {}

  private _buildTokenHeader(token?: string): { Authorization: string } {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async fetchTournamentSystems(
    page = 1,
    pageSize = 15,
    token?: string
  ): Promise<PaginatedResponse<TournamentSystem>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN + FETCH_TOURNAMENT_SYSTEMS,
        {
          params: {
            page: page,
            pageSize: pageSize,
          },
          headers: {
            ...this._buildTokenHeader(token),
          },
        }
      );
      return new PaginatedResponse(
        response.data?.tournament_systems?.map((json: TournamentSystemJson) =>
          TournamentSystem.fromJson(json)
        ),
        response.data?.current_page,
        response.data?.last_page,
        response.data?.per_page,
        response.data?.total_pages
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(error.response.data.message, {
        fields: [error.response.data.message],
      });
    }
  }

  async createTournamentSystem(
    attributes: { name: string; description: string },
    token: string
  ): Promise<BasicResponse> {
    try {
      const response = await this._httpClient.post(
        API_DOMAIN + CREATE_TOURNAMENT_SYSTEM,
        attributes,
        {
          headers: {
            ...this._buildTokenHeader(token),
          },
        }
      );

      return new BasicResponse(response.data?.message);
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(error.response.data.message, {
        fields: [error.response.data.message],
      });
    }
  }

  async getTournamentSystem(
    tournamentSystemId: string,
    token: string
  ): Promise<ResourcedResponse<TournamentSystem>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN +
          GET_TOURNAMENT_SYSTEM.replace(
            ":tournamentSystemId",
            tournamentSystemId
          ),
        {
          headers: {
            ...this._buildTokenHeader(token),
          },
        }
      );

      return new ResourcedResponse(
        response.data?.message,
        TournamentSystem.fromJson(response.data?.tournament_system)
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(error.response.data.message, {
        fields: [error.response.data.message],
      });
    }
  }

  async updateTournamentSystem(
    tournamentSystemId: string,
    attributes: { name?: string; description?: string },
    token: string
  ): Promise<BasicResponse> {
    try {
      const response = await this._httpClient.patch(
        API_DOMAIN +
          UPDATE_TOURNAMENT_SYSTEM.replace(
            ":tournamentSystemId",
            tournamentSystemId
          ),
        attributes,
        {
          headers: {
            ...this._buildTokenHeader(token),
          },
        }
      );

      return new BasicResponse(response.data?.message);
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(error.response.data.message, {
        fields: [error.response.data.message],
      });
    }
  }
}
