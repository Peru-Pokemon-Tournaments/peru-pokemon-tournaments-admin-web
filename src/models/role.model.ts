import { Serializable } from "./contracts/serializable";
import { RoleJson } from "./jsons/role.json";

export class Role implements Serializable<RoleJson> {
  constructor(private _id: string, private _name: string) {}

  public static fromJson(json: RoleJson): Role {
    return new Role(json["id"], json["name"]);
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public toJson(): RoleJson {
    return {
      id: this._id,
      name: this._name,
    };
  }
}
