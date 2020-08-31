import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersComponent } from './list-users.component';
import { PaginatorHandlerService } from '../../services/paginator-handler.service';
import { NgxsModule } from '@ngxs/store';
import { SearchState } from '../../search-state/search.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GithubService } from '../../services/github.service';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUsersComponent ],
      providers: [GithubService, PaginatorHandlerService],
       imports: [NgxsModule.forRoot([SearchState]), HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
