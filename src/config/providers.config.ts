import { ApiAuthService, AuthService } from "@/services/auth.service";
import { ApiPeopleService, PeopleService } from "@/services/people.service";
import axios, { AxiosInstance } from "axios";
const httpClient: AxiosInstance = axios.create();

const authService: AuthService = new ApiAuthService(httpClient);
const peopleService: PeopleService = new ApiPeopleService(httpClient);

const ServiceProvider = {
  authService,
  peopleService,
};

export default ServiceProvider;
