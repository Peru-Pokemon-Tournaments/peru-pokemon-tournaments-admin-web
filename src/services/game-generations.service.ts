import {
  API_DOMAIN,
  CREATE_GAME_GENERATION,
  FETCH_GAME_GENERATIONS,
  GET_GAME_GENERATION,
  UPDATE_GAME_GENERATION,
} from "@/config/services-uri.config";
import { GameGeneration } from "@/models/game-generation.model";
import { AxiosError, AxiosInstance } from "axios";
import { BasicResponse } from "./interfaces/basic-response";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResourcedResponse } from "./interfaces/resourced-response";
import { ResponseError } from "./interfaces/response-error";

export interface GameGenerationsService {
  fetchGameGenerations(
    page?: number,
    pageSize?: number,
    token?: string
  ): Promise<PaginatedResponse<GameGeneration>>;
  createGameGeneration(
    attributes: { generation: string; description: string },
    token: string
  ): Promise<BasicResponse>;
  getGameGeneration(
    gameGenerationId: string,
    token: string
  ): Promise<ResourcedResponse<GameGeneration>>;
  updateGameGeneration(
    gameGenerationId: string,
    attributes: { generation?: string; description?: string },
    token: string
  ): Promise<BasicResponse>;
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
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async createGameGeneration(
    attributes: { generation: string; description: string },
    token: string
  ): Promise<BasicResponse> {
    try {
      const response = await this._httpClient.post(
        API_DOMAIN + CREATE_GAME_GENERATION,
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

  async getGameGeneration(
    gameGenerationId: string,
    token: string
  ): Promise<ResourcedResponse<GameGeneration>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN +
          GET_GAME_GENERATION.replace(":gameGenerationId", gameGenerationId),
        {
          headers: {
            ...this._buildTokenHeader(token),
          },
        }
      );

      return new ResourcedResponse(
        response.data?.message,
        GameGeneration.fromJson(response.data?.game_generation)
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async updateGameGeneration(
    gameGenerationId: string,
    attributes: { generation?: string; description?: string },
    token: string
  ): Promise<BasicResponse> {
    try {
      const response = await this._httpClient.patch(
        API_DOMAIN +
          UPDATE_GAME_GENERATION.replace(":gameGenerationId", gameGenerationId),
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
