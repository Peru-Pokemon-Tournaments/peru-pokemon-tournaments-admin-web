export class ResponseError extends Error {
  private _errors: any;

  constructor(message: string, errors: any) {
    super(message);
    this._errors = errors;
  }

  public get errors(): string[] {
    const errors: string[] = [];
    for (const field in this._errors["fields"]) {
      for (const error of this._errors["fields"][field]) {
        errors.push(error);
      }
    }
    return errors;
  }

  public get fullErrorMessage(): string {
    return this.errors.reduce((p, c) => p + c + "\n", "");
  }
}
