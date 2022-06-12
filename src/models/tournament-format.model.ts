import { Serializable } from "./contracts/serializable";
import { TournamentFormatJson } from "./jsons/tournament-format.json";

export class TournamentFormat implements Serializable<TournamentFormatJson> {
  constructor(private _id: string, private _name: string) {}

  public static fromJson(json: TournamentFormatJson): TournamentFormat {
    return new TournamentFormat(json["id"], json["name"]);
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public toJson(): TournamentFormatJson {
    return {
      id: this._id,
      name: this._name,
    };
  }
}
