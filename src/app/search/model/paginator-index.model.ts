export class PaginatorIndex {
  private _currentIndex: number;
  private _firstIndex: number;
  private _lastIndex: number;
  private _elementPerPage: number;
  private _totalOfElement: number;
  private _pages: number[];

  constructor() {}

  public get currentIndex(): number {
    return this._currentIndex;
  }

  public get isFirstIndexSelected(): boolean {
    return this._firstIndex === this.currentIndex;
  }

  public get isLastIndexSelected(): boolean {
    return this._lastIndex === this.currentIndex;
  }

  public get pages(): number[] {
    return this._pages;
  }

  public shouldDisplay(value: number) {
    return this.currentIndex === value || value === this._lastIndex || value === this._firstIndex ||
      this.currentIndex + 1  === value || this.currentIndex + 2  === value ||
      this.currentIndex - 1  === value || this.currentIndex - 2  === value
  }

  public populate(elementPerPage: number, totalOfElement: number, page: number = 1): void {
    this._currentIndex = page;
    this._firstIndex = 1;
    this._elementPerPage = elementPerPage;
    this._totalOfElement = totalOfElement;
    this._lastIndex = Math.ceil(totalOfElement / elementPerPage);
    this._pages = Array.from(Array(this._lastIndex), (_, i) => i + 1);
  }

  public increaseIndex(): void {
    if (this.currentIndex + 1 <= this._lastIndex) {
      this._currentIndex += 1;
    }
  }

  public decreaseIndex(): void {
    if (this.currentIndex - 1 >= this._firstIndex) {
      this._currentIndex -= 1;
    }
  }

  public changeIndex(value: number): boolean {
    if (value >= this._firstIndex && value <= this._lastIndex && value !== this.currentIndex) {
      this._currentIndex = value;
      return true;
    }
    return false;
  }
}
