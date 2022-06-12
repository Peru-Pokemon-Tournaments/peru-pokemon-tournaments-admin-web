import { Json } from "./json";

export interface CompetitorJson extends Json {
  id: string;
  nick_name: string;
  full_name: string;
}
