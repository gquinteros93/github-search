import { Component, OnInit, Input } from '@angular/core';
import { GithubUser } from '../../model/github-user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() githubUser: GithubUser;
  constructor() { }

  ngOnInit(): void {
  }

}
