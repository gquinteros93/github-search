import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../github.service';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss']
})
export class HomeSearchComponent implements OnInit {

  constructor(private githubSearch: GithubService) { }

  ngOnInit(): void {
  }

}
