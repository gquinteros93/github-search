import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../github.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GithubResult } from '../../model/github-result.model';

@UntilDestroy()
@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss']
})
export class HomeSearchComponent implements OnInit {
  public githubResult: GithubResult = null;
  constructor(private githubSearch: GithubService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(untilDestroyed(this), mergeMap((params) => {
      const queryValue = params['q'];
      if(queryValue && queryValue.length > 0 && queryValue.trim().length > 0) {
        return this.githubSearch.searchUser(queryValue.trim());
      }
      return of(null);
    })).subscribe(result => {
      this.githubResult = result;
    });
  }

  public search(value: string) {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { q: value.trim() }});
  }
}
