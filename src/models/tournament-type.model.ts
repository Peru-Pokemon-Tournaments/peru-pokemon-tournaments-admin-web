import { Serializable } from "./contracts/serializable";
import { TournamentTypeJson } from "./jsons/tournament-type.json";

export class TournamentType implements Serializable<TournamentTypeJson> {
  constructor(private _id: string, private _name: string) {}

  public static fromJson(json: TournamentTypeJson): TournamentType {
    return new TournamentType(json["id"], json["name"]);
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public toJson(): TournamentTypeJson {
    return {
      id: this._id,
      name: this._name,
    };
  }
}
