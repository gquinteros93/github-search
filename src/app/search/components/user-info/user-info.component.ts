import { Component, Input } from '@angular/core';
import { GithubUser, GithubUserProfile } from '../../model/github-user.model';
import { GithubService } from '../../github.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  public githubUserProfile: GithubUserProfile;
  @Input() public set githubUser(value: GithubUser) {
    if(value) {
      this.getUserProfile(value);
    }
  }

  constructor(private githubSearch: GithubService) { }

  private getUserProfile(value: GithubUser): void {
    this.githubSearch.searchUserPofile(value.url).subscribe(
      (userProfile) => {
        this.githubUserProfile = userProfile;
      }
    );
  }
}
