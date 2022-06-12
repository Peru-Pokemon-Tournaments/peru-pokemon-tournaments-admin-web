import { Serializable } from "./contracts/serializable";
import { TournamentSystemJson } from "./jsons/tournament-system.json";

export class TournamentSystem implements Serializable<TournamentSystemJson> {
  constructor(
    private _id: string,
    private _name: string,
    private _description: string
  ) {}

  public static fromJson(json: TournamentSystemJson): TournamentSystem {
    return new TournamentSystem(json["id"], json["name"], json["description"]);
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public toJson(): TournamentSystemJson {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
    };
  }
}
