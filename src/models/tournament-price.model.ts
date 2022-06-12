import { Serializable } from "./contracts/serializable";
import { TournamentPriceJson } from "./jsons/tournament-price.json";

export class TournamentPrice implements Serializable<TournamentPriceJson> {
  constructor(
    private _id: string,
    private _symbol: string,
    private _amount: number
  ) {}

  public static fromJson(json: TournamentPriceJson): TournamentPrice {
    return new TournamentPrice(json["id"], json["symbol"], json["amount"]);
  }

  public get id(): string {
    return this._id;
  }

  public get symbol(): string {
    return this._symbol;
  }

  public get amount(): number {
    return this._amount;
  }

  public get formattedPrice(): string {
    return `${this.symbol} ${this.amount.toFixed(2)}`;
  }

  public get isFree(): boolean {
    return this.amount === 0;
  }

  public toJson(): TournamentPriceJson {
    return {
      id: this._id,
      symbol: this._symbol,
      amount: this._amount,
    };
  }
}
