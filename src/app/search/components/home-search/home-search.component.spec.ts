import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';

import { HomeSearchComponent } from './home-search.component';
import { NgxsModule } from '@ngxs/store';
import { SearchState } from '../../search-state/search.state';
import { PaginatorHandlerService } from '../../services/paginator-handler.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GithubService } from '../../services/github.service';
import { SearchUser, ResetSearch } from '../../search-state/actions/search.action';

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

describe('HomeSearchComponent', () => {
  let component: HomeSearchComponent;
  let fixture: ComponentFixture<HomeSearchComponent>;
  let fakeRouterEvents: Subject<any> = new Subject();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSearchComponent],
      providers: [
        GithubService,
        PaginatorHandlerService,
       { provide: ActivatedRoute, useValue: {
          queryParams: fakeRouterEvents.asObservable(),
       } },
       { provide: Router, useValue: routerSpy }
      ],
      imports: [
        NgxsModule.forRoot([SearchState]),
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on call search it should call the router.navigate', () => {
    component.search('test');
    expect(routerSpy.navigate).toHaveBeenCalled();
  });

  it('on call changeIndex if paginatorHandlerService.changeIndex return true it should call search()', () => {
    const spyOnSearch = spyOn(component, 'search');
    spyOn(component['paginatorHandlerService'], 'allowChangeIndex').and.returnValue(true);
    component.changeIndex(null, 2);
    expect(spyOnSearch).toHaveBeenCalled();
  });

  it('on call changeIndex if paginatorHandlerService.changeIndex return false it shouldn\'t call search()', () => {
    const spyOnSearch = spyOn(component, 'search');
    spyOn(component['paginatorHandlerService'], 'allowChangeIndex').and.returnValue(false);
    component.changeIndex(null, 2);
    expect(spyOnSearch).not.toHaveBeenCalled();
  });

  it('if queryParams emits a parameter q with value it should call dispatch a SearchUser Action', fakeAsync(() => {
    const spyOnDispatch = spyOn(component['store'], 'dispatch');
    fakeRouterEvents.next({q: 'test'});
    tick();
    fixture.detectChanges();
    expect(spyOnDispatch).toHaveBeenCalledWith(new SearchUser('test', 1));
    flush();
  }));

  it('if queryParams emits a parameter q and pages with their respective values it should call dispatch a SearchUser Action', fakeAsync(() => {
    const spyOnDispatch = spyOn(component['store'], 'dispatch');
    fakeRouterEvents.next({q: 'test', page: '2'});
    tick();
    fixture.detectChanges();
    expect(spyOnDispatch).toHaveBeenCalledWith(new SearchUser('test', 2));
    flush();
  }));

  it('if queryParams emits without parameter q it should call dispatch a ResetSearch Action', fakeAsync(() => {
    const spyOnDispatch = spyOn(component['store'], 'dispatch');
    fakeRouterEvents.next({});
    tick();
    fixture.detectChanges();
    expect(spyOnDispatch).toHaveBeenCalledWith(new ResetSearch());
    flush();
  }));
});
