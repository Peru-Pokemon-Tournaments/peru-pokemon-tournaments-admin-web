import { Json } from "./json";

export interface ExternalBracketJson extends Json {
  id: string;
  reference: string;
  url: string;
}
