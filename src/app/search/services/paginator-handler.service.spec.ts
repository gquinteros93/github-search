import { TestBed } from '@angular/core/testing';

import { PaginatorHandlerService } from './paginator-handler.service';
import { PaginatorIndex } from '../model/paginator-index.model';

describe('PaginatorHandlerService', () => {
  let service: PaginatorHandlerService;
  let mockPaginator: PaginatorIndex;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginatorHandlerService]
    });
    service = TestBed.inject(PaginatorHandlerService);

    mockPaginator = {
      currentIndex: 1,
      firstIndex: 1,
      lastIndex: 20,
      elementPerPage: 20,
      totalOfElement: 400,
      pages: Array.from(Array(20), (_, i) => i + 1),
      isFirstIndexSelected: false,
      isLastIndexSelected: false
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shouldDisplayItem should return true', () => {
    mockPaginator.currentIndex = 16;
    expect(service.shouldDisplayItem(mockPaginator, 18)).toBeTruthy();
  });

  it('shouldDisplayItem should return false', () => {
    mockPaginator.currentIndex = 10;
    expect(service.shouldDisplayItem(mockPaginator, 18)).toBeFalse();
  });

  it('on call populate it should set the new values for the PaginatorIndex properties ', () => {
    service.populate(mockPaginator, 10, 100, 2);
    expect(mockPaginator.currentIndex).toEqual(2);
    expect(mockPaginator.firstIndex).toEqual(1);
    expect(mockPaginator.elementPerPage).toEqual(10);
    expect(mockPaginator.totalOfElement).toEqual(100);
    expect(mockPaginator.lastIndex).toEqual(10);
    expect(mockPaginator.pages.length).toEqual(10);
    service.populate(mockPaginator, 10, 100);
    expect(mockPaginator.currentIndex).toEqual(1);
  });

  it('should increase the value of the currentIndex', () => {
    mockPaginator.currentIndex = 1;
    service.increaseIndex(mockPaginator)
    expect(mockPaginator.currentIndex).toEqual(2);
  });

  it('shouldn\'t increase the value of the currentIndex', () => {
    mockPaginator.currentIndex = 1;
    mockPaginator.lastIndex = 1;
    service.increaseIndex(mockPaginator)
    expect(mockPaginator.currentIndex).toEqual(1);
  });

  it('should decrease the value of the currentIndex', () => {
    mockPaginator.currentIndex = 3;
    service.decreaseIndex(mockPaginator)
    expect(mockPaginator.currentIndex).toEqual(2);
  });

  it('shouldn\'t decrease the value of the currentIndex', () => {
    mockPaginator.currentIndex = 1;
    service.decreaseIndex(mockPaginator)
    expect(mockPaginator.currentIndex).toEqual(1);
  });

  it('on call changeIndex it should change the value of currentIndex', () => {
    mockPaginator.currentIndex = 1;
    service.changeIndex(mockPaginator, 5)
    expect(mockPaginator.currentIndex).toEqual(5);
  });

  it('on call changeIndex it shouldn\'t change the value of currentIndex', () => {
    mockPaginator.currentIndex = 1;
    mockPaginator.lastIndex = 20;
    expect(service.changeIndex(mockPaginator, 21)).toBeFalse();
    expect(mockPaginator.currentIndex).toEqual(1);
  });
});
