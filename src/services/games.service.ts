import { API_DOMAIN, FETCH_GAMES } from "@/config/services-uri.config";
import { Game } from "@/models/game.model";
import { GameJson } from "@/models/jsons/game.json";
import { AxiosError, AxiosInstance } from "axios";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResponseError } from "./interfaces/response-error";

export interface GamesService {
  fetchGames(
    page?: number,
    pageSize?: number,
    token?: string
  ): Promise<PaginatedResponse<Game>>;
}

export class ApiGamesService implements GamesService {
  constructor(private _httpClient: AxiosInstance) {}

  private _buildTokenHeader(token?: string): { Authorization: string } {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async fetchGames(
    page = 1,
    pageSize = 15,
    token?: string
  ): Promise<PaginatedResponse<Game>> {
    try {
      const response = await this._httpClient.get(API_DOMAIN + FETCH_GAMES, {
        params: {
          page: page,
          pageSize: pageSize,
        },
        headers: {
          ...this._buildTokenHeader(token),
        },
      });
      return new PaginatedResponse(
        response.data?.games?.map((json: GameJson) => Game.fromJson(json)),
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
