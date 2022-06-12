import { Serializable } from "./contracts/serializable";

export class GameGeneration implements Serializable {
  constructor(
    private _id: string,
    private _generation: string,
    private _description: string
  ) {}

  public static fromJson(json: {
    id: string;
    generation: string;
    description: string;
  }): GameGeneration {
    return new GameGeneration(
      json["id"],
      json["generation"],
      json["description"]
    );
  }

  public get id(): string {
    return this._id;
  }

  public get generation(): string {
    return this._generation;
  }

  public get description(): string {
    return this._description;
  }

  public toJson(): object {
    return {
      id: this._id,
      generation: this._generation,
      description: this._description,
    };
  }
}
