import { Serializable } from "./contracts/serializable";
import { PokemonShowdownTeamJson } from "./jsons/pokemon-showdown-team.json";

export class PokemonShowdownTeam
  implements Serializable<PokemonShowdownTeamJson>
{
  constructor(private _id: string, private _team: string) {}

  public static fromJson(json: PokemonShowdownTeamJson): PokemonShowdownTeam {
    return new PokemonShowdownTeam(json["id"], json["team"]);
  }

  public get id(): string {
    return this._id;
  }

  public get team(): string {
    return this._team;
  }

  public toJson(): PokemonShowdownTeamJson {
    return {
      id: this._id,
      team: this._team,
    };
  }
}
