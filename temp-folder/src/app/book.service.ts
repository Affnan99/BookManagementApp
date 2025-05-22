// 📁 src/app/book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Book } from './book';
import { environment } from '../environments/environment';

@Injectable({
providedIn: 'root'
})
export class BookService {
private baseUrl = environment.endpoints.books.base;

constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl)
      .pipe(retry(1), catchError(this.handleError));
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${id}`, book)
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (environment.debug) {
      console.error('API Error:', error);
    }
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
