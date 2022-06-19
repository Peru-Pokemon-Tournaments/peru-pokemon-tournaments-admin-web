import {
  API_DOMAIN,
  CREATE_TOURNAMENT_TYPE,
  FETCH_TOURNAMENT_TYPES,
  GET_TOURNAMENT_TYPE,
  UPDATE_TOURNAMENT_TYPE,
} from "@/config/services-uri.config";
import { TournamentTypeJson } from "@/models/jsons/tournament-type.json";
import { TournamentType } from "@/models/tournament-type.model";
import { AxiosError, AxiosInstance } from "axios";
import { BasicResponse } from "./interfaces/basic-response";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResourcedResponse } from "./interfaces/resourced-response";
import { ResponseError } from "./interfaces/response-error";

export interface TournamentTypesService {
  fetchTournamentTypes(
    page?: number,
    pageSize?: number,
    token?: string
  ): Promise<PaginatedResponse<TournamentType>>;
  createTournamentType(
    attributes: { name: string },
    token: string
  ): Promise<BasicResponse>;
  getTournamentType(
    tournamentTypeId: string,
    token: string
  ): Promise<ResourcedResponse<TournamentType>>;
  updateTournamentType(
    tournamentTypeId: string,
    attributes: { name: string },
    token: string
  ): Promise<BasicResponse>;
}

export class ApiTournamentTypesService implements TournamentTypesService {
  constructor(private _httpClient: AxiosInstance) {}

  private _buildTokenHeader(token?: string): { Authorization: string } {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async fetchTournamentTypes(
    page = 1,
    pageSize = 15,
    token?: string
  ): Promise<PaginatedResponse<TournamentType>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN + FETCH_TOURNAMENT_TYPES,
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
        response.data?.tournament_types?.map((json: TournamentTypeJson) =>
          TournamentType.fromJson(json)
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

  async createTournamentType(
    attributes: { name: string },
    token: string
  ): Promise<BasicResponse> {
    try {
      const response = await this._httpClient.post(
        API_DOMAIN + CREATE_TOURNAMENT_TYPE,
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

  async getTournamentType(
    tournamentTypeId: string,
    token: string
  ): Promise<ResourcedResponse<TournamentType>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN +
          GET_TOURNAMENT_TYPE.replace(":tournamentTypeId", tournamentTypeId),
        {
          headers: {
            ...this._buildTokenHeader(token),
          },
        }
      );

      return new ResourcedResponse(
        response.data?.message,
        TournamentType.fromJson(response.data?.tournament_type)
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(error.response.data.message, {
        fields: [error.response.data.message],
      });
    }
  }

  async updateTournamentType(
    tournamentTypeId: string,
    attributes: { name: string },
    token: string
  ): Promise<BasicResponse> {
    try {
      const response = await this._httpClient.patch(
        API_DOMAIN +
          UPDATE_TOURNAMENT_TYPE.replace(":tournamentTypeId", tournamentTypeId),
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
