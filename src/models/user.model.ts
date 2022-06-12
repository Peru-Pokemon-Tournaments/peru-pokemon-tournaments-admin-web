import { Competitor } from "./competitor.model";
import { Serializable } from "./contracts/serializable";
import { UserJson } from "./jsons/user.json";
import { Person } from "./person.model";

export class User implements Serializable<UserJson> {
  constructor(
    private _id: string,
    private _name: string,
    private _email: string,
    private _person: Person,
    private _competitor: Competitor
  ) {}

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public get person(): Person {
    return this._person;
  }

  public get competitor(): Competitor {
    return this._competitor;
  }

  public static fromJson(json: UserJson): User {
    return new User(
      json["id"],
      json["name"],
      json["email"],
      Person.fromJson(json["person"]),
      Competitor.fromJson(json["competitor"])
    );
  }

  public toJson(): UserJson {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      person: this.person.toJson(),
      competitor: this.competitor.toJson(),
    };
  }
}
