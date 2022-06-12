import { Serializable } from "./contracts/serializable";
import { DeviceJson } from "./jsons/device.json";

export class Device implements Serializable<DeviceJson> {
  constructor(private _id: string, private _name: string) {}

  public static fromJson(json: DeviceJson): Device {
    return new Device(json["id"], json["name"]);
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public toJson(): DeviceJson {
    return {
      id: this._id,
      name: this._name,
    };
  }
}
