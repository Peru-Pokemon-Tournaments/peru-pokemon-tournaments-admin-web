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
      selectedRole: null as Role | null,
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingRoles: false,
      createRoleLoading: false,
      updateSelectedRoleLoading: false,
      getSelectedRoleLoading: false,
      rolesChanged: false,
    };
  },
  getters: {
    paginatedRoles(): Role[] {
      return this.roles as Role[];
    },
    isLoadingRoles(): boolean {
      return this.loadingRoles;
    },
    isCreateRoleLoading(): boolean {
      return this.createRoleLoading;
    },
    isUpdateSelectedRoleLoading(): boolean {
      return this.updateSelectedRoleLoading;
    },
    isGetSelectedRoleLoading(): boolean {
      return this.getSelectedRoleLoading;
    },
    rolesHasChanged(): boolean {
      return this.rolesChanged;
    },
    hasSelectedRole(): boolean {
      return this.selectedRole != null;
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
    async createRole({ name }: { name: string }): Promise<void> {
      const userStore = useAuthStore();

      this.createRoleLoading = true;

      try {
        const basicResponse = await this.rolesService.createRole(
          { name },
          userStore.authToken
        );
        toast.success(basicResponse.message);
        this.rolesChanged = true;
        setTimeout(() => (this.rolesChanged = false), 1000);
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.createRoleLoading = false;
      }
    },
    async selectRole(roleId: string): Promise<void> {
      const userStore = useAuthStore();

      this.getSelectedRoleLoading = true;
      this.selectedRole = null;

      try {
        const response = await this.rolesService.getRole(
          roleId,
          userStore.authToken
        );

        this.selectedRole = response.resource;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.getSelectedRoleLoading = false;
      }
    },

    async updateSelectedRole(attributes: { name: string }): Promise<void> {
      if (!this.hasSelectedRole) {
        return;
      }

      const userStore = useAuthStore();

      this.updateSelectedRoleLoading = true;

      try {
        const response = await this.rolesService.updateRole(
          this.selectedRole!.id,
          attributes,
          userStore.authToken
        );
        this.rolesChanged = true;
        setTimeout(() => (this.rolesChanged = false), 1000);
        toast.success(response.message);
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.updateSelectedRoleLoading = false;
      }
    },
  },
});
