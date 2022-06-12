import { Serializable } from "./contracts/serializable";
import { ExternalBracketJson } from "./jsons/external-bracket.json";

export class ExternalBracket implements Serializable<ExternalBracketJson> {
  constructor(
    private _id: string,
    private _reference: string,
    private _url: string
  ) {}

  public static fromJson(json: ExternalBracketJson): ExternalBracket {
    return new ExternalBracket(json["id"], json["reference"], json["url"]);
  }

  public get id(): string {
    return this._id;
  }

  public get reference(): string {
    return this._reference;
  }

  public get url(): string {
    return this._url;
  }

  public toJson(): ExternalBracketJson {
    return {
      id: this._id,
      reference: this._reference,
      url: this._url,
    };
  }
}
