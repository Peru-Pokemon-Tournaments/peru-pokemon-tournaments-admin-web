import { Serializable } from "./contracts/serializable";
import { Device } from "./device.model";
import { ExternalBracket } from "./external-bracket.model";
import { Game } from "./game.model";
import { Image } from "./image.model";
import { TournamentJson } from "./jsons/tournament.json";
import { TournamentFormat } from "./tournament-format.model";
import { TournamentPrice } from "./tournament-price.model";
import { TournamentPrize } from "./tournament-prize.model";
import { TournamentRule } from "./tournament-rule.model";
import { TournamentSystem } from "./tournament-system.model";
import { TournamentType } from "./tournament-type.model";

export class Tournament implements Serializable<TournamentJson> {
  constructor(
    private _id: string,
    private _title: string,
    private _description: string,
    private _place: string,
    private _startDate: Date,
    private _endDate: Date,
    private _status: string,
    private _totalCompetitors: number,
    private _image: Image | null,
    private _tournamentType: TournamentType,
    private _tournamentFormat: TournamentFormat,
    private _tournamentPrice: TournamentPrice,
    private _externalBracket: ExternalBracket | null,
    private _devices: Device[],
    private _games: Game[],
    private _tournamentPrizes: TournamentPrize[],
    private _tournamentRules: TournamentRule[],
    private _tournamentSystems: TournamentSystem[]
  ) {}

  public static fromJson(json: TournamentJson): Tournament {
    return new Tournament(
      json["id"],
      json["title"],
      json["description"],
      json["place"],
      new Date(json["start_date"] + "+0"),
      new Date(json["end_date"] + "+0"),
      json["status"],
      json["total_competitors"],
      json["image"] ? Image.fromJson(json["image"]) : null,
      TournamentType.fromJson(json["tournament_type"]),
      TournamentFormat.fromJson(json["tournament_format"]),
      TournamentPrice.fromJson(json["tournament_price"]),
      json["external_bracket"]
        ? ExternalBracket.fromJson(json["external_bracket"])
        : null,
      json["devices"].map((deviceJson) => Device.fromJson(deviceJson)),
      json["games"].map((gameJson) => Game.fromJson(gameJson)),
      json["tournament_prizes"].map((tournamentPrizeJson) =>
        TournamentPrize.fromJson(tournamentPrizeJson)
      ),
      json["tournament_rules"].map((tournamentRuleJson) =>
        TournamentRule.fromJson(tournamentRuleJson)
      ),
      json["tournament_systems"].map((tournamentSystemJson) =>
        TournamentSystem.fromJson(tournamentSystemJson)
      )
    );
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

  public get place(): string {
    return this._place;
  }

  public get startDate(): Date {
    return this._startDate;
  }

  public get endDate(): Date {
    return this._endDate;
  }

  public get status(): string {
    return this._status;
  }

  public get totalCompetitors(): number {
    return this._totalCompetitors;
  }

  public get image(): Image | null {
    return this._image;
  }

  public get tournamentType(): TournamentType {
    return this._tournamentType;
  }

  public get tournamentFormat(): TournamentFormat {
    return this._tournamentFormat;
  }

  public get tournamentPrice(): TournamentPrice {
    return this._tournamentPrice;
  }

  public get externalBracket(): ExternalBracket | null {
    return this._externalBracket;
  }

  public get devices(): Device[] {
    return this._devices;
  }

  public get games(): Game[] {
    return this._games;
  }

  public get tournamentPrizes(): TournamentPrize[] {
    return this._tournamentPrizes;
  }

  public get tournamentRules(): TournamentRule[] {
    return this._tournamentRules;
  }

  public get tournamentSystems(): TournamentSystem[] {
    return this._tournamentSystems;
  }

  public get formattedStatus(): string {
    if (this.status == "IN_PROGRESS") return "En progreso";
    if (this.status == "NOT_STARTED") return "Sin empezar";
    return "Finalizado";
  }

  public toJson(): TournamentJson {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      place: this._place,
      start_date: this._startDate.toUTCString(),
      end_date: this._endDate.toUTCString(),
      status: this._status,
      total_competitors: this._totalCompetitors,
      image: this._image ? this._image.toJson() : null,
      tournament_type: this._tournamentType.toJson(),
      tournament_format: this._tournamentFormat.toJson(),
      tournament_price: this._tournamentPrice.toJson(),
      external_bracket: this._externalBracket
        ? this._externalBracket.toJson()
        : null,
      devices: this._devices.map((device) => device.toJson()),
      games: this._games.map((game) => game.toJson()),
      tournament_prizes: this._tournamentPrizes.map((tournamentPrize) =>
        tournamentPrize.toJson()
      ),
      tournament_rules: this.tournamentRules.map((tournamentRule) =>
        tournamentRule.toJson()
      ),
      tournament_systems: this._tournamentSystems.map((tournamentSystem) =>
        tournamentSystem.toJson()
      ),
    };
  }
}
