import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../github.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GithubResultDTO } from '../../model/github-result.model';
import { PaginatorIndex } from '../../model/paginator-index.model';

@UntilDestroy()
@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss']
})
export class HomeSearchComponent implements OnInit {
  private _lastResult: string = null; 
  public githubResult: GithubResultDTO = null;
  public paginatorIndex: PaginatorIndex;
  constructor(private githubSearch: GithubService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.watchQueryParams();
  }

  public search(value: string, page: number = 1): void {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { q: value.trim(), page }});
  }

  public changeIndex(value: number) {
    if(this.paginatorIndex.changeIndex(value)) {
      this.search(this._lastResult, value);
    }
  }

  private watchQueryParams(): void {
    this.route.queryParams.pipe(untilDestroyed(this), mergeMap((params) => {
      const queryValue = params['q'];
      if(queryValue && queryValue.length > 0 && queryValue.trim().length > 0) {
        let page: number = params['page'] && +params['page'] ? +params['page'] : 1;
        this._lastResult =  queryValue.trim();
        return this.githubSearch.searchUser(this._lastResult, page);
      }
      return of(null);
    })).subscribe(result => {
      if (result) {
        this.githubResult = result;
        if(!this.paginatorIndex) {
          this.paginatorIndex = new PaginatorIndex();
        }
        this.paginatorIndex.populate(20, this.githubResult.total_count, result.page);
      } else {
        this.githubResult = null;
        this.paginatorIndex = null;
      }
    });
  }
}
