import { GameGenerationJson } from "./game-generation.json";
import { Json } from "./json";

export interface GameJson extends Json {
  id: string;
  name: string;
  game_generation: GameGenerationJson;
}
