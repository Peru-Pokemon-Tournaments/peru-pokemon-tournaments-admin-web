import { API_DOMAIN, FETCH_PEOPLE } from "@/config/services-uri.config";
import { Person } from "@/models/person.model";
import { AxiosError, AxiosInstance } from "axios";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResponseError } from "./interfaces/response-error";

export interface PeopleService {
  fetchPeople(
    page?: number,
    pageSize?: number,
    token?: string
  ): Promise<PaginatedResponse<Person>>;
}

export class ApiPeopleService implements PeopleService {
  constructor(private _httpClient: AxiosInstance) {}

  private _buildTokenHeader(token?: string): { Authorization: string } {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async fetchPeople(
    page = 1,
    pageSize = 15,
    token?: string
  ): Promise<PaginatedResponse<Person>> {
    try {
      const response = await this._httpClient.get(API_DOMAIN + FETCH_PEOPLE, {
        params: {
          page: page,
          pageSize: pageSize,
        },
        headers: {
          ...this._buildTokenHeader(token),
        },
      });
      return new PaginatedResponse(
        response.data?.people?.map((person: object) => Person.fromJson(person)),
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
