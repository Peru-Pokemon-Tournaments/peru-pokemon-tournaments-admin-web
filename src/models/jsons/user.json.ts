import { CompetitorJson } from "./competitor.json";
import { Json } from "./json";
import { PersonJson } from "./person.json";

export interface UserJson extends Json {
  id: string;
  name: string;
  email: string;
  person: PersonJson;
  competitor: CompetitorJson;
}
