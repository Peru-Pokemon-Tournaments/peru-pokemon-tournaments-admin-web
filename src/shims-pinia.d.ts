import "pinia";
import { AuthService } from "./services/auth.service";
import { PeopleService } from "./services/people.service";

declare module "pinia" {
  export interface PiniaCustomProperties {
    authService: AuthService;
    peopleService: PeopleService;
  }
}
