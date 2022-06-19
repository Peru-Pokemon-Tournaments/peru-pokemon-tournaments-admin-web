import {
  API_DOMAIN,
  CREATE_DEVICE,
  FETCH_DEVICES,
  GET_DEVICE,
  UPDATE_DEVICE,
} from "@/config/services-uri.config";
import { Device } from "@/models/device.model";
import { AxiosError, AxiosInstance } from "axios";
import { BasicResponse } from "./interfaces/basic-response";
import { PaginatedResponse } from "./interfaces/paginated-response";
import { ResourcedResponse } from "./interfaces/resourced-response";
import { ResponseError } from "./interfaces/response-error";

export interface DevicesService {
  fetchDevices(
    page?: number,
    pageSize?: number,
    token?: string
  ): Promise<PaginatedResponse<Device>>;
  createDevice(
    attributes: { name: string },
    token: string
  ): Promise<BasicResponse>;
  getDevice(
    deviceId: string,
    token: string
  ): Promise<ResourcedResponse<Device>>;
  updateDevice(
    deviceId: string,
    attributes: { name: string },
    token: string
  ): Promise<BasicResponse>;
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
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async createDevice(
    attributes: { name: string },
    token: string
  ): Promise<BasicResponse> {
    try {
      const response = await this._httpClient.post(
        API_DOMAIN + CREATE_DEVICE,
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

  async getDevice(
    deviceId: string,
    token: string
  ): Promise<ResourcedResponse<Device>> {
    try {
      const response = await this._httpClient.get(
        API_DOMAIN + GET_DEVICE.replace(":deviceId", deviceId),
        {
          headers: {
            ...this._buildTokenHeader(token),
          },
        }
      );

      return new ResourcedResponse(
        response.data?.message,
        Device.fromJson(response.data?.device)
      );
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async updateDevice(
    deviceId: string,
    attributes: { name: string },
    token: string
  ): Promise<BasicResponse> {
    try {
      const response = await this._httpClient.patch(
        API_DOMAIN + UPDATE_DEVICE.replace(":deviceId", deviceId),
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
