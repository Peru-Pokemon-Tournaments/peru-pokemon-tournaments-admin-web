import { Json } from "../jsons/json";

export interface Serializable<T extends Json> {
  toJson(): T;
}
