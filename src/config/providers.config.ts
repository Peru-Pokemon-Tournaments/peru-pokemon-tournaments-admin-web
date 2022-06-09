import { ApiAuthService, AuthService } from "@/services/auth.service";
import axios, { AxiosInstance } from "axios";
const httpClient: AxiosInstance = axios.create();

const authService: AuthService = new ApiAuthService(httpClient);

const ServiceProvider = {
  authService,
};

export default ServiceProvider;
