import {
  API_DOMAIN,
  FETCH_TOURNAMENT_INSCRIPTIONS,
  GET_TOURNAMENT_INSCRIPTION,
  UPDATE_TOURNAMENT_INSCRIPTION,
  UPDATE_TOURNAMENT_INSCRIPTION_STATUS,
} from "@/config/services-uri.config";
import { TournamentInscriptionJson } from "@/models/jsons/tournament-inscription.json";
import { TournamentInscription } from "@/models/tournament-inscription.model";
import { AxiosError, AxiosInstance } from "axios";
import { BasicResponse } from "./interfaces/basic-response";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResourcedResponse } from "./interfaces/resourced-response";
import { ResponseError } from "./interfaces/response-error";

export interface TournamentInscriptionsService {
  fetchTournamentInscriptions(
    page?: number,
    pageSize?: number,
    filters?: { tournament: { id: string } },
    token?: string
  ): Promise<PaginatedResponse<TournamentInscription>>;
  getTournamentInscription(
    tournamentInscriptionId: string,
    token: string
  ): Promise<ResourcedResponse<TournamentInscription>>;
  updateTournamentInscription(
    tournamentInscriptionId: string,
    attributes: { pokemonShowdownTeamExport: string },
    token: string
  ): Promise<BasicResponse>;
  updateTournamentInscriptionStatus(
    tournamentInscriptionId: string,
    status: string,
    token: string
  ): Promise<BasicResponse>;
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
            "filters[tournament][id]": filters?.tournament.id,
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

  async getTournamentInscription(
    tournamentInscriptionId: string,
    token: string
  ): Promise<ResourcedResponse<TournamentInscription>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN +
          GET_TOURNAMENT_INSCRIPTION.replace(
            ":tournamentInscriptionId",
            tournamentInscriptionId
          ),
        {
          headers: {
            ...this._buildTokenHeader(token),
          },
        }
      );

      return new ResourcedResponse(
        response.data?.message,
        TournamentInscription.fromJson(response.data?.tournament_inscription)
      );
    } catch (error: any | Error | AxiosError) {
      console.log(error);
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async updateTournamentInscription(
    tournamentInscriptionId: string,
    attributes: { pokemonShowdownTeamExport: string },
    token: string
  ): Promise<BasicResponse> {
    try {
      const response = await this._httpClient.patch(
        API_DOMAIN +
          UPDATE_TOURNAMENT_INSCRIPTION.replace(
            ":tournamentInscriptionId",
            tournamentInscriptionId
          ),
        {
          pokemon_showdown_team_export: attributes.pokemonShowdownTeamExport,
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

  async updateTournamentInscriptionStatus(
    tournamentInscriptionId: string,
    status: string,
    token: string
  ): Promise<BasicResponse> {
    try {
      const response = await this._httpClient.put(
        API_DOMAIN +
          UPDATE_TOURNAMENT_INSCRIPTION_STATUS.replace(
            ":tournamentInscriptionId",
            tournamentInscriptionId
          ),
        {
          status,
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
}
