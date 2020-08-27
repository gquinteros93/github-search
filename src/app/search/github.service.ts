import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { GithubResultDTO } from './model/github-result.model';
import { first, map } from 'rxjs/operators';
import { GithubUserProfile } from './model/github-user.model';

@Injectable()
export class GithubService {

  constructor(private http: HttpClient) {}

  public searchUser(query: string, page: number = 1, per_page: number = 20): Observable<GithubResultDTO> {
    return this.http.get<GithubResultDTO>(`${environment.GITHUB_API}/search/users?q=${query}&page=${page}&per_page=${per_page}`)
      .pipe(first(), map((result => {
        result.per_page = 20;
        result.page = page;
        return result;
      })))
  }

  public searchUserPofile(url: string): Observable<GithubUserProfile> {
    return this.http.get<GithubUserProfile>(url).pipe(first())
  }
}
