import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSearchComponent } from './components/home-search/home-search.component';
import { GithubService } from './github.service';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { NgxsModule } from '@ngxs/store';
import { SearchState } from './search-state/search.state';

const ROUTES: Routes = [
  { path: '', component: HomeSearchComponent }
];

@NgModule({
  declarations: [HomeSearchComponent, ListUsersComponent, UserInfoComponent],
  imports: [
    CommonModule,
    NgxsModule.forFeature([SearchState]),
    RouterModule.forChild(ROUTES)
  ],
  providers: [GithubService]
})
export class SearchModule { }
