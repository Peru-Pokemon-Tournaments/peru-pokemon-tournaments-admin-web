import { API_DOMAIN, FETCH_DEVICES } from "@/config/services-uri.config";
import { Device } from "@/models/device.model";
import { AxiosError, AxiosInstance } from "axios";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResponseError } from "./interfaces/response-error";

export interface DevicesService {
  fetchDevices(
    page?: number,
    pageSize?: number,
    token?: string
  ): Promise<PaginatedResponse<Device>>;
}

export class ApiDevicesService implements DevicesService {
  constructor(private _httpClient: AxiosInstance) {}

  private _buildTokenHeader(token?: string): { Authorization: string } {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async fetchDevices(
    page = 1,
    pageSize = 15,
    token?: string
  ): Promise<PaginatedResponse<Device>> {
    try {
      const response = await this._httpClient.get(API_DOMAIN + FETCH_DEVICES, {
        params: {
          page: page,
          pageSize: pageSize,
        },
        headers: {
          ...this._buildTokenHeader(token),
        },
      });
      return new PaginatedResponse(
        response.data?.devices?.map((device: { id: string; name: string }) =>
          Device.fromJson(device)
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
