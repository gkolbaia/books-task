import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/interfaces/book.interface';
import { BooksService } from '../../services/books.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  books: Book[];
  constructor(
    private _bookService: BooksService,
    private _activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getQuery();
  }
  getBookList(query): void {
    this._bookService.getBookList(query).subscribe((res: Book[]) => {
      this.books = res;
    });
  }
  favClick(book: Book): void {
    this._bookService.favClick(book);
  }
  bookIsFavorite(id: string): boolean {
    return this._bookService.bookIsFavorite(id);
  }
  getQuery() {
    this._activeRoute.queryParams.subscribe((res: { searchQuery: string }) => {
      this.getBookList(res.searchQuery);
    });
  }
}
