import { Serializable } from "./contracts/serializable";

export class Person implements Serializable {
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

  public static fromJson(json: any): Person {
    return new Person(json["id"], json["first_name"], json["last_name"]);
  }

  public toJson(): object {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
    };
  }
}
