import { Component, OnInit, Input } from '@angular/core';
import { GithubResult } from '../../model/github-result.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  @Input() githubResult: GithubResult;
  constructor() { }

  ngOnInit(): void {
  }

}
