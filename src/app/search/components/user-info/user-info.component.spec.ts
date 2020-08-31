import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserInfoComponent } from './user-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GithubService } from '../../services/github.service';
import { GithubUserProfile, GithubUser } from '../../model/github-user.model';
import { of } from 'rxjs';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoComponent ],
      providers: [GithubService],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on set githubUser it should to call getUserProfile', () => {
    const spyOnGetUserProfile = spyOn<any>(component, 'getUserProfile');
    component.githubUser = {id: 1} as GithubUser;
    expect(spyOnGetUserProfile).toHaveBeenCalled();
  });

  it('on set githubUser with wrong value it shouldn\'t to call getUserProfile', () => {
    const spyOnGetUserProfile = spyOn<any>(component, 'getUserProfile');
    component.githubUser = null;
    expect(spyOnGetUserProfile).not.toHaveBeenCalled();
  });

  it('if githubSearch.searchUserPofile emits a value it should store the value in githubUserProfile property', fakeAsync(() => {
    const fakeGithubUserProfile = {id: 3} as GithubUserProfile;
    spyOn(component['githubSearch'], 'searchUserPofile').and.returnValue(of(fakeGithubUserProfile));
    component['getUserProfile']({url: 'test'}  as GithubUser);
    tick();
    fixture.detectChanges();
    expect(component.githubUserProfile).toEqual(fakeGithubUserProfile);
  }));

});
