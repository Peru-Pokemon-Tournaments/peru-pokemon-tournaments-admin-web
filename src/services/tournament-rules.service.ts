import {
  API_DOMAIN,
  CREATE_TOURNAMENT_RULE,
  FETCH_TOURNAMENT_RULES,
  GET_TOURNAMENT_RULE,
  UPDATE_TOURNAMENT_RULE,
} from "@/config/services-uri.config";
import { TournamentRule } from "@/models/tournament-rule.model";
import { TournamentRuleJson } from "@/models/jsons/tournament-rule.json";
import { AxiosError, AxiosInstance } from "axios";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResponseError } from "./interfaces/response-error";
import { BasicResponse } from "./interfaces/basic-response";
import { ResourcedResponse } from "./interfaces/resourced-response";

export interface TournamentRulesService {
  fetchTournamentRules(
    page?: number,
    pageSize?: number,
    token?: string
  ): Promise<PaginatedResponse<TournamentRule>>;
  createTournamentRule(
    attributes: { name: string; description: string },
    token: string
  ): Promise<BasicResponse>;
  getTournamentRule(
    tournamentRuleId: string,
    token: string
  ): Promise<ResourcedResponse<TournamentRule>>;
  updateTournamentRule(
    tournamentRuleId: string,
    attributes: { name?: string; description?: string },
    token: string
  ): Promise<BasicResponse>;
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

  async createTournamentRule(
    attributes: { name: string; description: string },
    token: string
  ): Promise<BasicResponse> {
    try {
      const response = await this._httpClient.post(
        API_DOMAIN + CREATE_TOURNAMENT_RULE,
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

  async getTournamentRule(
    tournamentRuleId: string,
    token: string
  ): Promise<ResourcedResponse<TournamentRule>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN +
          GET_TOURNAMENT_RULE.replace(":tournamentRuleId", tournamentRuleId),
        {
          headers: {
            ...this._buildTokenHeader(token),
          },
        }
      );

      return new ResourcedResponse(
        response.data?.message,
        TournamentRule.fromJson(response.data?.tournament_rule)
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(error.response.data.message, {
        fields: [error.response.data.message],
      });
    }
  }

  async updateTournamentRule(
    tournamentRuleId: string,
    attributes: { name?: string; description?: string },
    token: string
  ): Promise<BasicResponse> {
    try {
      const response = await this._httpClient.patch(
        API_DOMAIN +
          UPDATE_TOURNAMENT_RULE.replace(":tournamentRuleId", tournamentRuleId),
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
