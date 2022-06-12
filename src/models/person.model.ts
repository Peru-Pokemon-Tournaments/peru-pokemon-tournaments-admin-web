import { Serializable } from "./contracts/serializable";
import { PersonJson } from "./jsons/person.json";

export class Person implements Serializable<PersonJson> {
  constructor(
    private _id: string,
    private _firstName: string,
    private _lastName: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public static fromJson(json: PersonJson): Person {
    return new Person(json["id"], json["first_name"], json["last_name"]);
  }

  public toJson(): PersonJson {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
    };
  }
}
