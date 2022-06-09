import "pinia";
import { AuthService } from "./services/auth.service";

declare module "pinia" {
  export interface PiniaCustomProperties {
    authService: AuthService;
  }
}
