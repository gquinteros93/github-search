import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../github.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { GithubResultDTO } from '../../model/github-result.model';
import { PaginatorIndex } from '../../model/paginator-index.model';
import { Store, Select } from '@ngxs/store';
import { SearchUser } from '../../search-state/actions/search.action';
import { SearchState } from '../../search-state/search.state';
import { PaginatorHandlerService } from '../../services/paginator-handler.service';

@UntilDestroy()
@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss']
})
export class HomeSearchComponent implements OnInit {
  public githubResult: GithubResultDTO = null;
  @Select(SearchState.getLastGithubResult) public githubResult$: Observable<GithubResultDTO>;
  @Select(SearchState.getPaginationIndex) public paginationIndex$: Observable<PaginatorIndex>
  constructor(public paginatorHandlerService: PaginatorHandlerService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store) { }

  ngOnInit(): void {
    this.watchQueryParams();
  }

  public search(value: string, page: number = 1) {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { q: value.trim(), page }});
  }

  public changeIndex(paginationIndex: PaginatorIndex, value: number) {
    console.log('hola changeIndex');
    console.log(paginationIndex);
    console.log(value);
    if(this.paginatorHandlerService.changeIndex(paginationIndex ,value)) {
      const lastResult = this.store.selectSnapshot(SearchState.getLastSearch);
      this.search(lastResult, value);
    }
  }

  private watchQueryParams(): void {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params)=> {
      const queryValue = params['q'];
      if(queryValue && queryValue.length > 0 && queryValue.trim().length > 0) {
        let page: number = params['page'] && +params['page'] ? +params['page'] : 1;
        this.store.dispatch(new SearchUser(queryValue.trim(), page));
      }
    });
  }
}
