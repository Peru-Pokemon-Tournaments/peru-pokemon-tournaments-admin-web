import { defineStore } from "pinia";
import { ResponseError } from "@/services/interfaces/response-error";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
import * as Types from "./types";
import { Device } from "@/models/device.model";

const toast = useToast();

export const useDevicesStore = defineStore("useDevices", {
  state(): Types.DevicesStoreState {
    return {
      devices: [] as Device[],
      selectedDevice: null as Device | null,
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingDevices: false,
      createDeviceLoading: false,
      updateSelectedDeviceLoading: false,
      getSelectedDeviceLoading: false,
      devicesChanged: false,
    };
  },
  getters: {
    paginatedDevices(): Device[] {
      return this.devices as Device[];
    },
    isLoadingDevices(): boolean {
      return this.loadingDevices;
    },
    isCreateDeviceLoading(): boolean {
      return this.createDeviceLoading;
    },
    isUpdateSelectedDeviceLoading(): boolean {
      return this.updateSelectedDeviceLoading;
    },
    isGetSelectedDeviceLoading(): boolean {
      return this.getSelectedDeviceLoading;
    },
    devicesHasChanged(): boolean {
      return this.devicesChanged;
    },
    hasSelectedDevice(): boolean {
      return this.selectedDevice != null;
    },
  },
  actions: {
    async fetchDevices(page?: number, pageSize?: number): Promise<void> {
      const userStore = useAuthStore();

      this.loadingDevices = true;

      try {
        const paginatedResponse = await this.devicesService.fetchDevices(
          page,
          pageSize,
          userStore.authToken
        );

        this.devices = paginatedResponse.data;
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
        this.loadingDevices = false;
      }
    },
    async createDevice({ name }: { name: string }): Promise<void> {
      const userStore = useAuthStore();

      this.createDeviceLoading = true;

      try {
        const basicResponse = await this.devicesService.createDevice(
          { name },
          userStore.authToken
        );
        toast.success(basicResponse.message);
        this.devicesChanged = true;
        setTimeout(() => (this.devicesChanged = false), 1000);
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.createDeviceLoading = false;
      }
    },
    async selectDevice(deviceId: string): Promise<void> {
      const userStore = useAuthStore();

      this.getSelectedDeviceLoading = true;
      this.selectedDevice = null;

      try {
        const response = await this.devicesService.getDevice(
          deviceId,
          userStore.authToken
        );

        this.selectedDevice = response.resource;
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.getSelectedDeviceLoading = false;
      }
    },

    async updateSelectedDevice(attributes: { name: string }): Promise<void> {
      if (!this.hasSelectedDevice) {
        return;
      }

      const userStore = useAuthStore();

      this.updateSelectedDeviceLoading = true;

      try {
        const response = await this.devicesService.updateDevice(
          this.selectedDevice!.id,
          attributes,
          userStore.authToken
        );
        this.devicesChanged = true;
        setTimeout(() => (this.devicesChanged = false), 1000);
        toast.success(response.message);
      } catch (error: unknown | ResponseError) {
        if (error instanceof ResponseError) {
          toast.error(error.fullErrorMessage);
        } else {
          console.warn(error);
        }
      } finally {
        this.updateSelectedDeviceLoading = false;
      }
    },
  },
});
