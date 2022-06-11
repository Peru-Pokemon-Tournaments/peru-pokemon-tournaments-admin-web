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
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingDevices: false,
    };
  },
  getters: {
    paginatedDevices(): Device[] {
      return this.devices as Device[];
    },
    isLoadingDevices(): boolean {
      return this.loadingDevices;
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
  },
});
