import "pinia";
import { AuthService } from "./services/auth.service";
import { DevicesService } from "./services/devices.service";
import { PeopleService } from "./services/people.service";
import { RolesService } from "./services/roles.service";

declare module "pinia" {
  export interface PiniaCustomProperties {
    authService: AuthService;
    devicesService: DevicesService;
    peopleService: PeopleService;
    rolesService: RolesService;
  }
}
