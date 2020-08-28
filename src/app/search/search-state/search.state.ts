import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PaginatorIndex } from '../model/paginator-index.model';
import { SearchStateModel } from './search-state.model';
import { Injectable } from '@angular/core';
import { GithubService } from '../github.service';
import { SearchUser } from './actions/search.action';
import * as _ from 'underscore';
import { GithubResultDTO } from '../model/github-result.model';

@State<SearchStateModel>({
  name: 'search',
  defaults: {
    lastSearch: null,
    lastResult: null,
    paginationIndex: new PaginatorIndex()
  }
})

@Injectable()
export class SearchState {
  constructor(private githubSearch: GithubService) { }


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
    const state = getState();
    if (state.lastSearch && state.lastSearch.toLowerCase() === query.toLowerCase() && state.paginationIndex.currentIndex === page) {
      patchState({ lastResult: _.clone(state.lastResult) });
      return;
    }
    this.githubSearch.searchUser(query, page).subscribe((result) => {
      const pagination = _.clone(state.paginationIndex);
      pagination.populate(20, result.total_count, result.page);
      patchState({
        lastSearch: query,
        lastResult: result,
        paginationIndex: pagination
      });
    });
  }
}