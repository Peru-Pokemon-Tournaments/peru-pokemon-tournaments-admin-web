import { Json } from "./json";

export interface TournamentPriceJson extends Json {
  id: string;
  symbol: string;
  amount: number;
}
