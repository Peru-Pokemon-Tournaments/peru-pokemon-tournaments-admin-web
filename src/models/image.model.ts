import { Serializable } from "./contracts/serializable";
import { ImageJson } from "./jsons/image.json";

export class Image implements Serializable<ImageJson> {
  constructor(
    private _id: string,
    private _name: string,
    private _url: string
  ) {}

  public static fromJson(json: ImageJson): Image {
    return new Image(json["id"], json["name"], json["url"]);
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get url(): string {
    return this._url;
  }

  public toJson(): ImageJson {
    return {
      id: this._id,
      name: this._name,
      url: this._url,
    };
  }
}
