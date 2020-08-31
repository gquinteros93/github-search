import { PaginatorIndex } from './paginator-index.model';
import { fakeAsync } from '@angular/core/testing';

describe(`PaginatorIndex Model`, () => {
  let mockPaginator: PaginatorIndex;

  beforeEach(() => {
    mockPaginator = new PaginatorIndex();
  });

  it('isFirstIndexSelected should return true', fakeAsync(() => {
    mockPaginator.currentIndex = 1;
    mockPaginator.firstIndex = 1;
    expect(mockPaginator.isFirstIndexSelected).toBeTrue();
  }));

  it('isFirstIndexSelected should return false', () => {
    mockPaginator.currentIndex = 2;
    mockPaginator.firstIndex = 1;
    expect(mockPaginator.isFirstIndexSelected).toBeFalse();
  });

  it('isLastIndexSelected should return true', () => {
    mockPaginator.currentIndex = 3;
    mockPaginator.lastIndex = 3;
    expect(mockPaginator.isLastIndexSelected).toBeTrue();
  });

  it('isLastIndexSelected should return false', () => {
    mockPaginator.currentIndex = 2;
    mockPaginator.lastIndex = 3;
    expect(mockPaginator.isLastIndexSelected).toBeFalse();
  });
});