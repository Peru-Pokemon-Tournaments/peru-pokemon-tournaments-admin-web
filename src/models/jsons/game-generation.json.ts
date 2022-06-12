import { Json } from "./json";

export interface GameGenerationJson extends Json {
  id: string;
  generation: string;
  description: string;
}
