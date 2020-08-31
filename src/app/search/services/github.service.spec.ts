import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { GithubService } from './github.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('GithubService', () => {
  let service: GithubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GithubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('on call searchUser it should return the same value for page attribute in the response', fakeAsync(() => {
    spyOn(service['http'], 'get').and.returnValue(of({}));
    service.searchUser('test', 2, 30).subscribe((result) => {
      expect(result.page).toEqual(2);
      expect(result.per_page).toEqual(30);
    })
    tick();
    flush();
  }));

  it('on call searchUser if no page or per_page parameters are passed, it should use defaults values', fakeAsync(() => {
    spyOn(service['http'], 'get').and.returnValue(of({}));
    service.searchUser('test').subscribe((result) => {
      expect(result.page).toEqual(1);
      expect(result.per_page).toEqual(20);
    })
    tick();
    flush();
  }));

  it('on call searchUserPofile it should call http.get with the url passed as parameter', () => {
    const spyHttp = spyOn(service['http'], 'get').and.returnValue(of({}));
    const url = 'test';
    service.searchUserPofile(url);
    expect(spyHttp).toHaveBeenCalledWith(url);
  });
  
});
