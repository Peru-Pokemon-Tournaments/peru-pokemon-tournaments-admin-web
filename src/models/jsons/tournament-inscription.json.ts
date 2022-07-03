import { CompetitorJson } from "./competitor.json";
import { Json } from "./json";
import { PokemonShowdownTeamJson } from "./pokemon-showdown-team.json";

export interface TournamentInscriptionJson extends Json {
  id: string;
  competitor: CompetitorJson;
  pokemon_showdown_team: PokemonShowdownTeamJson;
  tournament: { id: string; title: string };
  status: string;
}
