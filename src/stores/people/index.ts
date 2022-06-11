import { defineStore } from "pinia";
import { Person } from "@/models/person.model";
import { ResponseError } from "@/services/interfaces/response-error";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
import * as Types from "./types";

const toast = useToast();

export const usePeopleStore = defineStore("usePeople", {
  state(): Types.PeopleStoreState {
    return {
      people: [] as Person[],
      totalPages: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      loadingPeople: false,
    };
  },
  getters: {
    paginatedPeople(): Person[] {
      return this.people as Person[];
    },
    isLoadingPeople(): boolean {
      return this.loadingPeople;
    },
  },
  actions: {
    async fetchPeople(page?: number, pageSize?: number): Promise<void> {
      const userStore = useAuthStore();

      this.loadingPeople = true;

      try {
        const paginatedResponse = await this.peopleService.fetchPeople(
          page,
          pageSize,
          userStore.authToken
        );

        this.people = paginatedResponse.data;
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
        this.loadingPeople = false;
      }
    },
  },
});
