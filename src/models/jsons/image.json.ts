import { Json } from "./json";

export interface ImageJson extends Json {
  id: string;
  name: string;
  url: string;
}
