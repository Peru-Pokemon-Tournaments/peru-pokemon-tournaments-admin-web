import {
  API_DOMAIN,
  FETCH_TOURNAMENT_RESULTS,
} from "@/config/services-uri.config";
import { TournamentResultJson } from "@/models/jsons/tournament-result.json";
import { TournamentResult } from "@/models/tournament-result.model";
import { AxiosError, AxiosInstance } from "axios";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResponseError } from "./interfaces/response-error";

export interface TournamentResultsService {
  fetchTournamentResults(
    tournamentId: string,
    page?: number,
    pageSize?: number,
    token?: string
  ): Promise<PaginatedResponse<TournamentResult>>;
}

export class ApiTournamentResultsService implements TournamentResultsService {
  constructor(private _httpClient: AxiosInstance) {}

  private _buildTokenHeader(token?: string): { Authorization: string } {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async fetchTournamentResults(
    tournamentId: string,
    page = 1,
    pageSize = 15,
    token?: string
  ): Promise<PaginatedResponse<TournamentResult>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN +
          FETCH_TOURNAMENT_RESULTS.replace(":tournamentId", tournamentId),
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
        response.data?.results?.map((json: TournamentResultJson) =>
          TournamentResult.fromJson(json)
        ),
        response.data?.current_page,
        response.data?.last_page,
        response.data?.per_page,
        response.data?.total_pages
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }
}
