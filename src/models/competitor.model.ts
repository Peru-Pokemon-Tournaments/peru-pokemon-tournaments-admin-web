import { Serializable } from "./contracts/serializable";
import { CompetitorJson } from "./jsons/competitor.json";

export class Competitor implements Serializable<CompetitorJson> {
  constructor(
    private _id: string,
    private _nickName: string,
    private _fullName: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get nickName(): string {
    return this._nickName;
  }

  public get fullName(): string {
    return this._fullName;
  }

  public static fromJson(json: CompetitorJson): Competitor {
    return new Competitor(json["id"], json["nick_name"], json["full_name"]);
  }

  public toJson(): CompetitorJson {
    return {
      id: this.id,
      full_name: this.fullName,
      nick_name: this.nickName,
    };
  }
}
