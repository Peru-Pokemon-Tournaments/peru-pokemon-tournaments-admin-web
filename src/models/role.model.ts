import { Serializable } from "./contracts/serializable";

export class Role implements Serializable {
  constructor(private _id: string, private _name: string) {}

  public static fromJson(json: { id: string; name: string }): Role {
    return new Role(json["id"], json["name"]);
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public toJson(): object {
    return {
      id: this._id,
      name: this._name,
    };
  }
}
