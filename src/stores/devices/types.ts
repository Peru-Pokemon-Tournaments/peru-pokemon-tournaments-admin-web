import { Device } from "@/models/device.model";

export interface DevicesStoreState {
  devices: Device[];
  selectedDevice: Device | null;
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingDevices: boolean;
  createDeviceLoading: boolean;
  updateSelectedDeviceLoading: boolean;
  getSelectedDeviceLoading: boolean;
  devicesChanged: boolean;
}
