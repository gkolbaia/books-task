import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private _activateRoute: ActivatedRoute, private _route: Router) {}
  searchQuery: string = '';
  ngOnInit() {
    this.getQuery();
  }
  searchBook() {
    console.log(this.searchQuery.trim());
    if (this.searchQuery && this.searchQuery.trim().length) {
      this._route.navigate([`/home`], {
        queryParams: { searchQuery: this.searchQuery.trim() },
      });
    }
  }
  getQuery() {
    this._activateRoute.queryParams.subscribe(
      (res: { searchQuery: string }) => {
        if (res.searchQuery) {
          this.searchQuery = res.searchQuery;
        }
      }
    );
  }
}
