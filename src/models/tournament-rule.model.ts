import { Serializable } from "./contracts/serializable";
import { TournamentRuleJson } from "./jsons/tournament-rule.json";

export class TournamentRule implements Serializable<TournamentRuleJson> {
  constructor(
    private _id: string,
    private _name: string,
    private _description: string
  ) {}

  public static fromJson(json: TournamentRuleJson): TournamentRule {
    return new TournamentRule(json["id"], json["name"], json["description"]);
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

  public toJson(): TournamentRuleJson {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
    };
  }
}
