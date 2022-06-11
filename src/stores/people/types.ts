import { Person } from "@/models/person.model";

export interface PeopleStoreState {
  people: Person[];
  totalPages: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  loadingPeople: boolean;
}
