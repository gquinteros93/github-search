import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSearchComponent } from './components/home-search/home-search.component';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { NgxsModule } from '@ngxs/store';
import { SearchState } from './search-state/search.state';
import { PaginatorHandlerService } from './services/paginator-handler.service';
import { GithubService } from './services/github.service';

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
  providers: [GithubService, PaginatorHandlerService]
})
export class SearchModule { }
