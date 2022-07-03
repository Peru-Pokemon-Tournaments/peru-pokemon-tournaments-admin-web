import { DeviceJson } from "./device.json";
import { ExternalBracketJson } from "./external-bracket.json";
import { GameJson } from "./game.json";
import { ImageJson } from "./image.json";
import { Json } from "./json";
import { TournamentFormatJson } from "./tournament-format.json";
import { TournamentPriceJson } from "./tournament-price.json";
import { TournamentPrizeJson } from "./tournament-prize.json";
import { TournamentRuleJson } from "./tournament-rule.json";
import { TournamentSystemJson } from "./tournament-system.json";
import { TournamentTypeJson } from "./tournament-type.json";

export interface TournamentJson extends Json {
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
  devices: DeviceJson[];
  games: GameJson[];
  tournament_prizes: TournamentPrizeJson[];
  tournament_rules: TournamentRuleJson[];
  tournament_systems: TournamentSystemJson[];
}
