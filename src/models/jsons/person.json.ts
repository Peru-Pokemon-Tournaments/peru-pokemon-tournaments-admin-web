import { Json } from "./json";

export interface PersonJson extends Json {
  id: string;
  first_name: string;
  last_name: string;
}
