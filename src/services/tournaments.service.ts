import { API_DOMAIN, FETCH_TOURNAMENTS } from "@/config/services-uri.config";
import { SmallTournamentJson } from "@/models/jsons/small-tournament.json";
import { SmallTournament } from "@/models/small-tournament.model";
import { AxiosError, AxiosInstance } from "axios";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResponseError } from "./interfaces/response-error";

export interface TournamentsService {
  fetchTournaments(
    page?: number,
    pageSize?: number,
    token?: string
  ): Promise<PaginatedResponse<SmallTournament>>;
}

export class ApiTournamentsService implements TournamentsService {
  constructor(private _httpClient: AxiosInstance) {}

  private _buildTokenHeader(token?: string): { Authorization: string } {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async fetchTournaments(
    page = 1,
    pageSize = 15,
    token?: string
  ): Promise<PaginatedResponse<SmallTournament>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN + FETCH_TOURNAMENTS,
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
        response.data?.tournaments?.map((json: SmallTournamentJson) =>
          SmallTournament.fromJson(json)
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
