import { defineStore } from "pinia";
import { ResponseError } from "@/services/interfaces/response-error";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
import * as Types from "./types";
import { Role } from "@/models/role.model";

const toast = useToast();

export const useRolesStore = defineStore("useRoles", {
  state(): Types.RolesStoreState {
    return {
      roles: [] as Role[],
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingRoles: false,
    };
  },
  getters: {
    paginatedRoles(): Role[] {
      return this.roles as Role[];
    },
    isLoadingRoles(): boolean {
      return this.loadingRoles;
    },
  },
  actions: {
    async fetchRoles(page?: number, pageSize?: number): Promise<void> {
      const userStore = useAuthStore();

      this.loadingRoles = true;

      try {
        const paginatedResponse = await this.rolesService.fetchRoles(
          page,
          pageSize,
          userStore.authToken
        );

        this.roles = paginatedResponse.data;
        this.totalPages = paginatedResponse.totalPages;
        this.currentPage = paginatedResponse.currentPage;
        this.lastPage = paginatedResponse.lastPage;
        this.perPage = paginatedResponse.perPage;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.loadingRoles = false;
      }
    },
  },
});
