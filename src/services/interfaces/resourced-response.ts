import { BasicResponse } from "./basic-response";

export class ResourcedResponse<T> extends BasicResponse {
  private _resource: T;

  constructor(message: string, resource: T) {
    super(message);
    this._resource = resource;
  }

  public get resource(): T {
    return this._resource;
  }
}
