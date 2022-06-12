import {
  API_DOMAIN,
  FETCH_TOURNAMENT_RULES,
} from "@/config/services-uri.config";
import { TournamentRule } from "@/models/tournament-rule.model";
import { TournamentRuleJson } from "@/models/jsons/tournament-rule.json";
import { AxiosError, AxiosInstance } from "axios";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResponseError } from "./interfaces/response-error";

export interface TournamentRulesService {
  fetchTournamentRules(
    page?: number,
    pageSize?: number,
    token?: string
  ): Promise<PaginatedResponse<TournamentRule>>;
}

export class ApiTournamentRulesService implements TournamentRulesService {
  constructor(private _httpClient: AxiosInstance) {}

  private _buildTokenHeader(token?: string): { Authorization: string } {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async fetchTournamentRules(
    page = 1,
    pageSize = 15,
    token?: string
  ): Promise<PaginatedResponse<TournamentRule>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN + FETCH_TOURNAMENT_RULES,
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
        response.data?.tournament_rules?.map((json: TournamentRuleJson) =>
          TournamentRule.fromJson(json)
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
