import { User } from "@/models/user.model";
import { ResponseError } from "@/services/interfaces/response-error";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import * as Types from "./types";

const toast = useToast();

export const useAuthStore = defineStore("useAuth", {
  state(): Types.AuthState {
    return {
      user: null as User | null,
      token: null as string | null,
      loadingLogin: false as boolean,
    };
  },
  getters: {
    authToken(): string {
      return this.token as string;
    },
    isLoggedIn(): boolean {
      return this.user !== null;
    },
    loggedUser(): User | null {
      return this.user as User;
    },
    isLoadingLogin(): boolean {
      return this.loadingLogin;
    },
  },
  actions: {
    tryLogInFromCache(): void {
      const stringUser: string | null = localStorage.getItem("user");
      const token: string | null = localStorage.getItem("token");

      if (!stringUser || !token) {
        return;
      }

      this.user = User.fromJson(JSON.parse(stringUser));
      this.token = token;
    },
    async loginUser({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<void> {
      this.loadingLogin = true;
      try {
        const userToken = await this.authService.login(email, password);

        this.user = userToken.user;
        this.token = userToken.token;

        localStorage.setItem("user", JSON.stringify(userToken.user.toJson()));
        localStorage.setItem("token", userToken.token);

        toast.success(userToken.message);
      } catch (error: any | ResponseError) {
        toast.error(error.message);
      } finally {
        this.loadingLogin = false;
      }
    },
    logout(): void {
      this.user = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      toast.success("Has salido de Perú Pokémon Tournaments Admin");
    },
  },
});
