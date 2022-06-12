import { Json } from "./json";

export interface TournamentRuleJson extends Json {
  id: string;
  name: string;
  description: string;
}
