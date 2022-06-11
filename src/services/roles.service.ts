import {
  API_DOMAIN,
  FETCH_PEOPLE,
  FETCH_ROLES,
} from "@/config/services-uri.config";
import { Person } from "@/models/person.model";
import { Role } from "@/models/role.model";
import { AxiosError, AxiosInstance } from "axios";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResponseError } from "./interfaces/response-error";

export interface RolesService {
  fetchRoles(
    page?: number,
    pageSize?: number,
    token?: string
  ): Promise<PaginatedResponse<Role>>;
}

export class ApiRolesService implements RolesService {
  constructor(private _httpClient: AxiosInstance) {}

  private _buildTokenHeader(token?: string): { Authorization: string } {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async fetchRoles(
    page = 1,
    pageSize = 15,
    token?: string
  ): Promise<PaginatedResponse<Role>> {
    try {
      const response = await this._httpClient.get(API_DOMAIN + FETCH_ROLES, {
        params: {
          page: page,
          pageSize: pageSize,
        },
        headers: {
          ...this._buildTokenHeader(token),
        },
      });
      return new PaginatedResponse(
        response.data?.roles?.map((role: { id: string; name: string }) =>
          Role.fromJson(role)
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
