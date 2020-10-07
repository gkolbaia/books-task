import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/interfaces/book.interface';
import { Result } from '../models/classes/result.class';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private _httpClient: HttpClient) {}
  getBookList(query: string): Observable<Book[]> {
    const q = query ? query : 1;
    return this._httpClient
      .get<Result<Book[]>>(`https://www.googleapis.com/books/v1/volumes?q=${q}`)
      .pipe(map((res: Result<Book[]>) => res.items));
  }
  getBook(id: string): Observable<Book> {
    return this._httpClient.get<Book>(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );
  }
  bookIsFavorite(id: string): boolean {
    const favoriteBooks = localStorage.getItem('favorite-books');
    if (!favoriteBooks) return false;
    const isFavorite = JSON.parse(favoriteBooks).find(
      (book: Book) => book.id === id
    );
    return !!isFavorite;
  }
  deleteBookFromFavorite(id: string): void {
    const favoriteBooks = JSON.parse(localStorage.getItem('favorite-books'));
    const newFavourites = favoriteBooks.filter((book: Book) => book.id !== id);
    localStorage.setItem('favorite-books', JSON.stringify(newFavourites));
  }
  addBookToFavorites(book: Book): void {
    const favoriteBooks = JSON.parse(localStorage.getItem('favorite-books'));
    if (!favoriteBooks) {
      localStorage.setItem('favorite-books', JSON.stringify([book]));
    } else {
      favoriteBooks.push(book);
      localStorage.setItem('favorite-books', JSON.stringify(favoriteBooks));
    }
  }
  favClick(book: Book): void {
    const isFavorite = this.bookIsFavorite(book.id);
    if (isFavorite) {
      this.deleteBookFromFavorite(book.id);
    } else {
      this.addBookToFavorites(book);
    }
  }
}
