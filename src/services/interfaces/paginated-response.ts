import { Serializable } from "@/models/contracts/serializable";

export class PaginatedResponse<T> {
  constructor(
    private _data: T[],
    private _currentPage: number,
    private _lastPage: number,
    private _perPage: number,
    private _totalPages: number
  ) {}

  public get data(): T[] {
    return this._data;
  }

  public get currentPage(): number {
    return this._currentPage;
  }

  public get lastPage(): number {
    return this._lastPage;
  }

  public get perPage(): number {
    return this._perPage;
  }

  public get totalPages(): number {
    return this._totalPages;
  }
}
