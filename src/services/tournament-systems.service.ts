import {
  API_DOMAIN,
  FETCH_TOURNAMENT_SYSTEMS,
} from "@/config/services-uri.config";
import { TournamentSystemJson } from "@/models/jsons/tournament-system.json";
import { TournamentSystem } from "@/models/tournament-system.model";
import { AxiosError, AxiosInstance } from "axios";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResponseError } from "./interfaces/response-error";

export interface TournamentSystemsService {
  fetchTournamentSystems(
    page?: number,
    pageSize?: number,
    token?: string
  ): Promise<PaginatedResponse<TournamentSystem>>;
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
}
