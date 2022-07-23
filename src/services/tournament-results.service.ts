import {
  API_DOMAIN,
  CREATE_TOURNAMENT_RESULT,
  FETCH_TOURNAMENT_RESULTS,
  GET_TOURNAMENT_RESULT,
  UPDATE_TOURNAMENT_RESULT,
} from "@/config/services-uri.config";
import { TournamentResultJson } from "@/models/jsons/tournament-result.json";
import { TournamentResult } from "@/models/tournament-result.model";
import { AxiosError, AxiosInstance } from "axios";
import { BasicResponse } from "./interfaces/basic-response";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResourcedResponse } from "./interfaces/resourced-response";
import { ResponseError } from "./interfaces/response-error";

export interface TournamentResultsService {
  fetchTournamentResults(
    tournamentId: string,
    page?: number,
    pageSize?: number,
    token?: string
  ): Promise<PaginatedResponse<TournamentResult>>;
  createTournamentResult(
    tournamentId: string,
    attributes: {
      score: number;
      place: number;
      competitorId: string;
    },
    token: string
  ): Promise<BasicResponse>;
  getTournamentResult(
    tournamentResultId: string,
    token: string
  ): Promise<ResourcedResponse<TournamentResult>>;
  updateTournamentResult(
    tournamentResultId: string,
    tournamentId: string,
    attributes: {
      score?: number;
      place?: number;
      competitorId?: string;
    },
    token: string
  ): Promise<BasicResponse>;
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

  async createTournamentResult(
    tournamentId: string,
    attributes: {
      score: number;
      place: number;
      competitorId: string;
    },
    token: string
  ): Promise<BasicResponse> {
    try {
      const response = await this._httpClient.post(
        API_DOMAIN +
          CREATE_TOURNAMENT_RESULT.replace(":tournamentId", tournamentId),
        {
          score: attributes.score,
          place: attributes.place,
          competitor_id: attributes.competitorId,
        },
        {
          headers: {
            ...this._buildTokenHeader(token),
          },
        }
      );

      return new BasicResponse(response.data?.message);
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async getTournamentResult(
    tournamentResultId: string,
    token: string
  ): Promise<ResourcedResponse<TournamentResult>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN +
          GET_TOURNAMENT_RESULT.replace(
            ":tournamentResultId",
            tournamentResultId
          ),
        {
          headers: {
            ...this._buildTokenHeader(token),
          },
        }
      );

      return new ResourcedResponse(
        response.data?.message,
        TournamentResult.fromJson(response.data?.tournament_result)
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async updateTournamentResult(
    tournamentResultId: string,
    tournamentId: string,
    attributes: {
      score?: number;
      place?: number;
      competitorId: string;
    },
    token: string
  ): Promise<BasicResponse> {
    try {
      const response = await this._httpClient.patch(
        API_DOMAIN +
          UPDATE_TOURNAMENT_RESULT.replace(
            ":tournamentResultId",
            tournamentResultId
          ).replace(":tournamentId", tournamentId),
        attributes,
        {
          headers: {
            ...this._buildTokenHeader(token),
          },
        }
      );

      return new BasicResponse(response.data?.message);
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }
}
