import { Serializable } from "./contracts/serializable";
import { TournamentResultJson } from "./jsons/tournament-result.json";
import { TournamentInscription } from "./tournament-inscription.model";

export class TournamentResult implements Serializable<TournamentResultJson> {
  constructor(
    private _id: string,
    private _score: number,
    private _place: number,
    private _tournamentInscription: TournamentInscription
  ) {}

  public static fromJson(json: TournamentResultJson): TournamentResult {
    return new TournamentResult(
      json["id"],
      json["score"],
      json["place"],
      TournamentInscription.fromJson(json["tournament_inscription"])
    );
  }

  public get id(): string {
    return this._id;
  }

  public get score(): number {
    return this._score;
  }

  public get place(): number {
    return this._place;
  }

  public get tournamentInscription(): TournamentInscription {
    return this._tournamentInscription;
  }

  public toJson(): TournamentResultJson {
    return {
      id: this._id,
      score: this._score,
      place: this._place,
      tournament_inscription: this._tournamentInscription.toJson(),
    };
  }
}
