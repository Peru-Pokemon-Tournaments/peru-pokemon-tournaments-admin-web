import { Role } from "@/models/role.model";

export interface RolesStoreState {
  roles: Role[];
  selectedRole: Role | null;
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingRoles: boolean;
  createRoleLoading: boolean;
  updateSelectedRoleLoading: boolean;
  getSelectedRoleLoading: boolean;
  rolesChanged: boolean;
}
