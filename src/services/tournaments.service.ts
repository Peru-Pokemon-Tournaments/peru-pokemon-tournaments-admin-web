import "datejs";
import { CreateOrEditTournamentDTO } from "@/components/app/tournaments/forms/interfaces/CreateOrEditTournamentDTO";
import {
  API_DOMAIN,
  CREATE_TOURNAMENT,
  FETCH_TOURNAMENTS,
  GET_TOURNAMENT,
  UPDATE_TOURNAMENT,
} from "@/config/services-uri.config";
import { SmallTournamentJson } from "@/models/jsons/small-tournament.json";
import { SmallTournament } from "@/models/small-tournament.model";
import { AxiosError, AxiosInstance } from "axios";
import { BasicResponse } from "./interfaces/basic-response";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResourcedResponse } from "./interfaces/resourced-response";
import { ResponseError } from "./interfaces/response-error";
import { format } from "date-fns";

export interface TournamentsService {
  fetchTournaments(
    page?: number,
    pageSize?: number,
    token?: string
  ): Promise<PaginatedResponse<SmallTournament>>;
  createTournament(
    attributes: CreateOrEditTournamentDTO,
    token: string
  ): Promise<BasicResponse>;
  getTournament(
    tournamentId: string,
    token: string
  ): Promise<ResourcedResponse<SmallTournament>>;
  updateTournament(
    tournamentId: string,
    attributes: CreateOrEditTournamentDTO,
    token: string
  ): Promise<BasicResponse>;
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

  async createTournament(
    attributes: CreateOrEditTournamentDTO,
    token: string
  ): Promise<BasicResponse> {
    console.log(attributes);
    const formData = new FormData();

    const startDate = new Date(Date.parse(attributes.startDate as string));
    const endDate = new Date(Date.parse(attributes.endDate as string));

    const startDateUTC = new Date(
      startDate.getTime() + startDate.getTimezoneOffset() * 60000
    );
    const endDateUTC = new Date(
      endDate.getTime() + endDate.getTimezoneOffset() * 60000
    );

    if (attributes.tournamentImageFile) {
      formData.append(
        "tournament_image_file",
        attributes.tournamentImageFile as string
      );
    }

    formData.append("title", attributes.title);
    formData.append("description", attributes.description);
    formData.append("place", attributes.place);
    formData.append("start_date", format(startDateUTC, "yyyy-MM-dd HH:mm:ss"));
    formData.append("end_date", format(endDateUTC, "yyyy-MM-dd HH:mm:ss"));
    formData.append(
      "created_by_person[id]",
      attributes.createdByPerson.id as string
    );
    formData.append(
      "tournament_type[id]",
      attributes.tournamentType.id as string
    );
    formData.append(
      "tournament_format[id]",
      attributes.tournamentFormat.id as string
    );
    formData.append(
      "tournament_price[symbol]",
      attributes.tournamentPrice.symbol as string
    );
    formData.append(
      "tournament_price[amount]",
      (attributes.tournamentPrice.amount as number).toFixed(2)
    );

    attributes.tournamentPrizes.forEach((tournamnentPrize, i) => {
      formData.append(
        `tournament_prizes[${i}][title]`,
        tournamnentPrize.title as string
      );
      formData.append(
        `tournament_prizes[${i}][description]`,
        tournamnentPrize.description as string
      );
    });

    attributes.devices.forEach((device, i) => {
      formData.append(`devices[${i}][id]`, device.id as string);
    });

    attributes.games.forEach((game, i) => {
      formData.append(`games[${i}][id]`, game.id as string);
    });

    attributes.tournamentRules.forEach((tournamentRule, i) => {
      formData.append(
        `tournament_rules[${i}][id]`,
        tournamentRule.id as string
      );
    });

    attributes.tournamentSystems.forEach((tournamentSystem, i) => {
      formData.append(
        `tournament_systems[${i}][id]`,
        tournamentSystem.id as string
      );
    });

    try {
      const response = await this._httpClient.post(
        API_DOMAIN + CREATE_TOURNAMENT,
        formData,
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

  async getTournament(
    tournamentId: string,
    token: string
  ): Promise<ResourcedResponse<SmallTournament>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN + GET_TOURNAMENT.replace(":tournamentId", tournamentId),
        {
          headers: {
            ...this._buildTokenHeader(token),
          },
        }
      );

      return new ResourcedResponse(
        response.data?.message,
        SmallTournament.fromJson(response.data?.tournament)
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async updateTournament(
    tournamentId: string,
    attributes: CreateOrEditTournamentDTO,
    token: string
  ): Promise<BasicResponse> {
    try {
      const response = await this._httpClient.patch(
        API_DOMAIN + UPDATE_TOURNAMENT.replace(":tournamentId", tournamentId),
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
