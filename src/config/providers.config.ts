import { ApiAuthService, AuthService } from "@/services/auth.service";
import { ApiDevicesService, DevicesService } from "@/services/devices.service";
import { ApiPeopleService, PeopleService } from "@/services/people.service";
import { ApiRolesService, RolesService } from "@/services/roles.service";
import axios, { AxiosInstance } from "axios";
const httpClient: AxiosInstance = axios.create();

const authService: AuthService = new ApiAuthService(httpClient);
const devicesService: DevicesService = new ApiDevicesService(httpClient);
const peopleService: PeopleService = new ApiPeopleService(httpClient);
const rolesService: RolesService = new ApiRolesService(httpClient);

const ServiceProvider = {
  authService,
  devicesService,
  peopleService,
  rolesService,
};

export default ServiceProvider;
