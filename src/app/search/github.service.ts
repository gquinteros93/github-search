import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { GithubResult } from './model/github-result.model';
import { first } from 'rxjs/operators';
import { GithubUserProfile } from './model/github-user.model';

@Injectable()
export class GithubService {

  constructor(private http: HttpClient) {}

  public searchUser(query: string): Observable<GithubResult> {
    return this.http.get<GithubResult>(`${environment.GITHUB_API}/search/users?q=${query}`).pipe(first())
  }

  public searchUserPofile(url: string): Observable<GithubUserProfile> {
    return this.http.get<GithubUserProfile>(url).pipe(first())
  }
}
