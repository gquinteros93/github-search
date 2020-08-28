import { Component, OnInit, Input } from '@angular/core';
import { GithubResult, GithubResultDTO } from '../../model/github-result.model';
import { Select } from '@ngxs/store';
import { SearchState } from '../../search-state/search.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  @Select(SearchState.getLastGithubResult) public githubResult$: Observable<GithubResultDTO>;
  constructor() { }

  ngOnInit(): void {
  }

}
