import { Serializable } from "./contracts/serializable";
import { TournamentPrizeJson } from "./jsons/tournament-prize.json";

export class TournamentPrize implements Serializable<TournamentPrizeJson> {
  constructor(
    private _id: string,
    private _title: string,
    private _description: string
  ) {}

  public static fromJson(json: TournamentPrizeJson): TournamentPrize {
    return new TournamentPrize(json["id"], json["title"], json["description"]);
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get description(): string {
    return this._description;
  }

  public toJson(): TournamentPrizeJson {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
    };
  }
}
