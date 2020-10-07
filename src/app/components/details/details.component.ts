import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/interfaces/book.interface';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  book: Book;
  constructor(
    private _bookService: BooksService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBook();
  }
  get bookId() {
    return this._route.snapshot.params.id;
  }
  getBook() {
    const id = this.bookId;
    this._bookService.getBook(id).subscribe((res: Book) => {
      this.book = res;
    });
  }
  favClick(book: Book): void {
    this._bookService.favClick(book);
  }
  bookIsFavorite(id: string): boolean {
    return this._bookService.bookIsFavorite(id);
  }
}
