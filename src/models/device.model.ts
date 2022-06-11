import { Serializable } from "./contracts/serializable";

export class Device implements Serializable {
  constructor(private _id: string, private _name: string) {}

  public static fromJson(json: { id: string; name: string }): Device {
    return new Device(json["id"], json["name"]);
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
