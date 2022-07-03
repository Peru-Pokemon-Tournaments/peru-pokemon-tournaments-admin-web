import {
  API_DOMAIN,
  FETCH_TOURNAMENT_INSCRIPTIONS,
} from "@/config/services-uri.config";
import { TournamentInscriptionJson } from "@/models/jsons/tournament-inscription.json";
import { TournamentInscription } from "@/models/tournament-inscription.model";
import { AxiosError, AxiosInstance } from "axios";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResponseError } from "./interfaces/response-error";

export interface TournamentInscriptionsService {
  fetchTournamentInscriptions(
    page?: number,
    pageSize?: number,
    filters?: { tournament: { id: string } },
    token?: string
  ): Promise<PaginatedResponse<TournamentInscription>>;
}

export class ApiTournamentInscriptionsService
  implements TournamentInscriptionsService
{
  constructor(private _httpClient: AxiosInstance) {}

  private _buildTokenHeader(token?: string): { Authorization: string } {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async fetchTournamentInscriptions(
    page = 1,
    pageSize = 15,
    filters?: { tournament: { id: string } },
    token?: string
  ): Promise<PaginatedResponse<TournamentInscription>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN + FETCH_TOURNAMENT_INSCRIPTIONS,
        {
          params: {
            page: page,
            pageSize: pageSize,
            filters: filters,
          },
          headers: {
            ...this._buildTokenHeader(token),
          },
        }
      );
      return new PaginatedResponse(
        response.data?.tournament_inscriptions?.map(
          (json: TournamentInscriptionJson) =>
            TournamentInscription.fromJson(json)
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
