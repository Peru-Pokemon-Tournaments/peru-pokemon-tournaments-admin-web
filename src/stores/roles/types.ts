import { Role } from "@/models/role.model";

export interface RolesStoreState {
  roles: Role[];
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingRoles: boolean;
}
