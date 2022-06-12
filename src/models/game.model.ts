import { Serializable } from "./contracts/serializable";
import { GameGeneration } from "./game-generation.model";
import { GameJson } from "./jsons/game.json";

export class Game implements Serializable<GameJson> {
  constructor(
    private _id: string,
    private _name: string,
    private _gameGeneration: GameGeneration
  ) {}

  public static fromJson(json: GameJson): Game {
    return new Game(
      json["id"],
      json["name"],
      GameGeneration.fromJson(json["game_generation"])
    );
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get gameGeneration(): GameGeneration {
    return this._gameGeneration;
  }

  public toJson(): GameJson {
    return {
      id: this._id,
      name: this._name,
      game_generation: this._gameGeneration.toJson(),
    };
  }
}
