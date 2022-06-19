import { AxiosError, AxiosInstance } from "axios";
import { ADMIN_LOGIN_URI, API_DOMAIN } from "@/config/services-uri.config";
import { ResponseError } from "./interfaces/response-error";
import { User } from "@/models/user.model";

export interface AuthService {
  login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string; message: string }>;
}

export class ApiAuthService implements AuthService {
  constructor(private _httpClient: AxiosInstance) {}

  async login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string; message: string }> {
    try {
      const response = await this._httpClient.post(
        API_DOMAIN + ADMIN_LOGIN_URI,
        {
          email,
          password,
        }
      );
      return {
        user: User.fromJson(response?.data?.user),
        token: response?.data?.token as string,
        message: response?.data?.message as string,
      };
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }
}
