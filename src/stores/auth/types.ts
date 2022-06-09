import { User } from "@/models/user.model";

export interface AuthState {
  user: null | User;
  token: null | string;
  loadingLogin: boolean;
}
