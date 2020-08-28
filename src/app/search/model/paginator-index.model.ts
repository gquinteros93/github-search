export class PaginatorIndex {
  public currentIndex: number;
  public firstIndex: number;
  public lastIndex: number;
  public elementPerPage: number;
  public totalOfElement: number;
  public pages: number[];

  constructor() {}

  public get isFirstIndexSelected(): boolean {
    return this.firstIndex === this.currentIndex;
  }

  public get isLastIndexSelected(): boolean {
    return this.lastIndex === this.currentIndex;
  }
}
