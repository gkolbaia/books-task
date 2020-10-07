import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/interfaces/book.interface';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  constructor(private _bookService: BooksService) {}
  books: Book[];
  ngOnInit(): void {
    this.getFavoriteBooks();
  }

  getFavoriteBooks() {
    const favoriteBooks = JSON.parse(localStorage.getItem('favorite-books'));
    if (favoriteBooks && favoriteBooks.length) {
      this.books = favoriteBooks;
    }
  }
  favClick(book: Book): void {
    this.books = this.books.filter((item: Book) => item.id !== book.id);
    this._bookService.favClick(book);
  }
  bookIsFavorite(id: string): boolean {
    return this._bookService.bookIsFavorite(id);
  }
  getDescription(description: string) {
    if (description.length > 80) {
      return `${description.slice(0, 77)}...`;
    } else {
      return description;
    }
  }
}
