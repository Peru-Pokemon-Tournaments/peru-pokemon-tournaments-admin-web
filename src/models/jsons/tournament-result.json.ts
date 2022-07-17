import { Json } from "./json";
import { TournamentInscriptionJson } from "./tournament-inscription.json";

export interface TournamentResultJson extends Json {
  id: string;
  score: number;
  place: number;
  tournament_inscription: TournamentInscriptionJson;
}
