import { Competitor } from "./competitor.model";
import { PokemonShowdownTeam } from "./pokemon-showdown-team.model";
import { Serializable } from "./contracts/serializable";
import { TournamentInscriptionJson } from "./jsons/tournament-inscription.json";

export class TournamentInscription
  implements Serializable<TournamentInscriptionJson>
{
  constructor(
    private _id: string,
    private _status: string,
    private _pokemonShowdownTeam: PokemonShowdownTeam,
    private _competitor: Competitor,
    private _tournament: { id: string; title: string }
  ) {}

  public static fromJson(
    json: TournamentInscriptionJson
  ): TournamentInscription {
    return new TournamentInscription(
      json["id"],
      json["status"],
      PokemonShowdownTeam.fromJson(json["pokemon_showdown_team"]),
      Competitor.fromJson(json["competitor"]),
      json["tournament"]
    );
  }

  public get id(): string {
    return this._id;
  }

  public get status(): string {
    return this._status;
  }

  public get pokemonShowdownTeam(): PokemonShowdownTeam {
    return this._pokemonShowdownTeam;
  }

  public get competitor(): Competitor {
    return this._competitor;
  }

  public get tournamentId(): string {
    return this._tournament.id;
  }

  public get tournamentTitle(): string {
    return this._tournament.title;
  }

  public get translatedStatus(): string {
    if (this.status === "pending") {
      return "pendiente";
    }

    if (this.status === "accepted") {
      return "aceptado";
    }

    if (this.status === "rejected") {
      return "rechazado";
    }

    return "not found";
  }

  public toJson(): TournamentInscriptionJson {
    return {
      id: this._id,
      status: this._status,
      pokemon_showdown_team: this._pokemonShowdownTeam.toJson(),
      competitor: this._competitor.toJson(),
      tournament: this._tournament,
    };
  }
}
