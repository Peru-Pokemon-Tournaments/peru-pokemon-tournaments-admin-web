import {
  API_DOMAIN,
  FETCH_GAME_GENERATIONS,
} from "@/config/services-uri.config";
import { GameGeneration } from "@/models/game-generation.model";
import { AxiosError, AxiosInstance } from "axios";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResponseError } from "./interfaces/response-error";

export interface GameGenerationsService {
  fetchGameGenerations(
    page?: number,
    pageSize?: number,
    token?: string
  ): Promise<PaginatedResponse<GameGeneration>>;
}

export class ApiGameGenerationsService implements GameGenerationsService {
  constructor(private _httpClient: AxiosInstance) {}

  private _buildTokenHeader(token?: string): { Authorization: string } {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async fetchGameGenerations(
    page = 1,
    pageSize = 15,
    token?: string
  ): Promise<PaginatedResponse<GameGeneration>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN + FETCH_GAME_GENERATIONS,
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
        response.data?.game_generations?.map(
          (gameGeneration: {
            id: string;
            generation: string;
            description: string;
          }) => GameGeneration.fromJson(gameGeneration)
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
