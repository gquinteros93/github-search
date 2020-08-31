import { Injectable } from '@angular/core';
import { PaginatorIndex } from '../model/paginator-index.model';

@Injectable()
export class PaginatorHandlerService {

  public shouldDisplayItem(pagintor: PaginatorIndex, value: number) {
    return pagintor.currentIndex === value || value === pagintor.lastIndex || value === pagintor.firstIndex ||
      pagintor.currentIndex + 1  === value || pagintor.currentIndex + 2  === value ||
      pagintor.currentIndex - 1  === value || pagintor.currentIndex - 2  === value
  }

  public populate(pagintor: PaginatorIndex, elementPerPage: number, totalOfElement: number, page: number = 1): void {
    pagintor.currentIndex = page;
    pagintor.firstIndex = 1;
    pagintor.elementPerPage = elementPerPage;
    pagintor.totalOfElement = totalOfElement;
    pagintor.lastIndex = Math.ceil(totalOfElement / elementPerPage);
    pagintor.pages = Array.from(Array(pagintor.lastIndex), (_, i) => i + 1);
  }

  public increaseIndex(pagintor: PaginatorIndex): void {
    if (pagintor.currentIndex + 1 <= pagintor.lastIndex) {
      pagintor.currentIndex += 1;
    }
  }

  public decreaseIndex(pagintor: PaginatorIndex): void {
    if (pagintor.currentIndex - 1 >= pagintor.firstIndex) {
      pagintor.currentIndex -= 1;
    }
  }

  public changeIndex(pagintor: PaginatorIndex, value: number): boolean {
    if (pagintor && value >= pagintor.firstIndex && value <= pagintor.lastIndex && value !== pagintor.firstIndex) {
      pagintor.currentIndex = value;
      return true;
    }
    return false;
  }
}
