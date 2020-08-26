import { Injectable } from '@angular/core';
import { SearchModule } from './search.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { GithubResult } from './model/github-result.model';

@Injectable({
  providedIn: SearchModule
})
export class GithubService {

  constructor(private http: HttpClient) {}

  public searchUser(query: string): Observable<GithubResult> {
    return this.http.get<GithubResult>(`${environment.GITHUB_API}/search/users?q=${query}`)
  }
}
