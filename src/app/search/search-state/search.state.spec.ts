import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { SearchState } from './search.state';
import { PaginatorHandlerService } from '../services/paginator-handler.service';
import { GithubService } from '../services/github.service';
import { ResetSearch, SearchUser } from './actions/search.action';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { GithubResultDTO } from '../model/github-result.model';

describe(`App State`, () => {
  let store: Store;
  let githubService: GithubService;
  let paginatorHandlerService: PaginatorHandlerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubService, PaginatorHandlerService],
      imports: [
        NgxsModule.forRoot([SearchState]),
        HttpClientTestingModule
    ],
    }).compileComponents();
    store = TestBed.get(Store);
    githubService = TestBed.get(GithubService);
    paginatorHandlerService = TestBed.get(PaginatorHandlerService);
  });

  it(`after call ResetSearch the values of the state should be null`, () => {
    store.dispatch(new ResetSearch());
    expect(store.selectSnapshot(SearchState.getLastSearch)).toBeNull();
    expect(store.selectSnapshot(SearchState.getPaginationIndex)).toBeNull();
    expect(store.selectSnapshot(SearchState.getLastGithubResult)).toBeNull();
  });

  it('if the new search is equal to the last search, it should return the stored value', fakeAsync(() => {
    const newResult = {total_count: 20, page: 1} as GithubResultDTO;
    spyOn(githubService, 'searchUser').and.returnValue(of(newResult));
    const spyOnPopulate = spyOn(paginatorHandlerService, 'populate');
    store.dispatch(new SearchUser('test', 1));
    expect(spyOnPopulate).toHaveBeenCalled();
    tick();
    store.dispatch(new SearchUser('test', 1));
    tick();
    const result = store.selectSnapshot(SearchState.getLastGithubResult);
    expect(result.total_count).toEqual(newResult.total_count);
    expect(result.page).toEqual(newResult.page);
    flush();
  }));
});