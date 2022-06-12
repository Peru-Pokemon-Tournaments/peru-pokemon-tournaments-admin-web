import { ExternalBracketJson } from "./external-bracket.json";
import { ImageJson } from "./image.json";
import { Json } from "./json";
import { TournamentFormatJson } from "./tournament-format.json";
import { TournamentPriceJson } from "./tournament-price.json";
import { TournamentTypeJson } from "./tournament-type.json";

export interface SmallTournamentJson extends Json {
  id: string;
  title: string;
  description: string;
  place: string;
  start_date: string;
  end_date: string;
  status: string;
  total_competitors: number;
  image: ImageJson | null;
  tournament_type: TournamentTypeJson;
  tournament_format: TournamentFormatJson;
  tournament_price: TournamentPriceJson;
  external_bracket: ExternalBracketJson | null;
}
