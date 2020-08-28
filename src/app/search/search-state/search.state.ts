import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PaginatorIndex } from '../model/paginator-index.model';
import { SearchStateModel } from './search-state.model';
import { Injectable } from '@angular/core';
import { GithubService } from '../github.service';
import { SearchUser, ResetSearch } from './actions/search.action';
import * as _ from 'underscore';
import { GithubResultDTO } from '../model/github-result.model';
import { tap } from 'rxjs/operators';
import { PaginatorHandlerService } from '../services/paginator-handler.service';

@State<SearchStateModel>({
  name: 'search',
  defaults: {
    lastSearch: null,
    lastResult: null,
    paginationIndex: null
  }
})

@Injectable()
export class SearchState {
  constructor(private githubSearch: GithubService,
              private paginatorHandlerService: PaginatorHandlerService) { }

  @Selector()
  public static getLastSearch(state: SearchStateModel): string {
    return state.lastSearch;
  }

  @Selector()
  public static getPaginationIndex(state: SearchStateModel): PaginatorIndex {
    return state.paginationIndex;
  }

  @Selector()
  public static getLastGithubResult(state: SearchStateModel): GithubResultDTO {
    return state.lastResult;
  }

  @Action(SearchUser)
  public searchUser({ getState, patchState }: StateContext<SearchStateModel>, { query, page }: SearchUser) {
    const currentState = getState();
    if (currentState.lastSearch && currentState.lastSearch.toLowerCase() === query.toLowerCase() && currentState.paginationIndex.currentIndex === page) {
      patchState({ lastResult: _.clone(currentState.lastResult) });
      return;
    }
    return this.githubSearch.searchUser(query, page).pipe(tap((result) => {
      const state = getState();
      let pagination: PaginatorIndex = state.paginationIndex;
      if (!pagination || _.isEmpty(pagination)) {
        pagination = new PaginatorIndex();
      } else {
        pagination = _.clone(pagination);
      }
      this.paginatorHandlerService.populate(pagination, 20, result.total_count, result.page);
      patchState({
        lastSearch: query,
        lastResult: result,
        paginationIndex: pagination
      });
    }));
  }

  @Action(ResetSearch)
  public resetSearch({ patchState }: StateContext<SearchStateModel>) {
    patchState({
      lastSearch: null,
      lastResult: null,
      paginationIndex: null
    });
  }
}
