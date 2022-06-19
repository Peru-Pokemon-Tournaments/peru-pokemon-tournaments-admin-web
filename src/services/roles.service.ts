import {
  API_DOMAIN,
  CREATE_ROLE,
  FETCH_ROLES,
  GET_ROLE,
  UPDATE_ROLE,
} from "@/config/services-uri.config";
import { Role } from "@/models/role.model";
import { AxiosError, AxiosInstance } from "axios";
import { BasicResponse } from "./interfaces/basic-response";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResourcedResponse } from "./interfaces/resourced-response";
import { ResponseError } from "./interfaces/response-error";

export interface RolesService {
  fetchRoles(
    page?: number,
    pageSize?: number,
    token?: string
  ): Promise<PaginatedResponse<Role>>;
  createRole(
    attributes: { name: string },
    token: string
  ): Promise<BasicResponse>;
  getRole(roleId: string, token: string): Promise<ResourcedResponse<Role>>;
  updateRole(
    roleId: string,
    attributes: { name: string },
    token: string
  ): Promise<BasicResponse>;
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

  async createRole(
    attributes: { name: string },
    token: string
  ): Promise<BasicResponse> {
    try {
      const response = await this._httpClient.post(
        API_DOMAIN + CREATE_ROLE,
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

  async getRole(
    roleId: string,
    token: string
  ): Promise<ResourcedResponse<Role>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN + GET_ROLE.replace(":roleId", roleId),
        {
          headers: {
            ...this._buildTokenHeader(token),
          },
        }
      );

      return new ResourcedResponse(
        response.data?.message,
        Role.fromJson(response.data?.role)
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(error.response.data.message, {
        fields: [error.response.data.message],
      });
    }
  }

  async updateRole(
    roleId: string,
    attributes: { name: string },
    token: string
  ): Promise<BasicResponse> {
    try {
      const response = await this._httpClient.patch(
        API_DOMAIN + UPDATE_ROLE.replace(":roleId", roleId),
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
