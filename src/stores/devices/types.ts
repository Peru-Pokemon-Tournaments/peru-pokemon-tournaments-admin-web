import { Device } from "@/models/device.model";

export interface DevicesStoreState {
  devices: Device[];
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingDevices: boolean;
}
