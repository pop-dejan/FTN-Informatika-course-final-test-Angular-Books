import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Book, BookSearchResult } from '../model/book.model';
import { Review } from '../model/review.model';
const baseURL = "http://localhost:3000/api/books"
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBooks(params?:any): Observable<BookSearchResult> {
    let queryParams = {}
    if (params) {
      queryParams = {
        params: new HttpParams()
        .set("page", params.page || "")
        .set("pageSize", params.pageSize || "")
        .set("sort", params.sort || "")
        .set("sortDirection", params.sortDirection || "")
        .set("filter", params.filter && JSON.stringify(params.filter) || "")
      }
    }
    return this.http.get(baseURL, queryParams).pipe(map((data: any) => {
      return new BookSearchResult(data);
    }))
  }

  getBook(id: number): Observable<Book> {
    return this.http.get(baseURL  + '/' + id).pipe(
      map((elem: any) => {
        return new Book(elem);
      })
    );
  }

  postBook(book: Book): Observable<Book> {
    return this.http.post(baseURL, book).pipe(
      map((data: any) => {
        return new Book(data);
      })
    );
  }

  getReviews(id: number): Observable<Review[]> {

    return this.http.get(baseURL + id + "/reviews").pipe(map((data: any) => {
      return data.map((elem: any) => new Review(elem));
    }))
  }

  deleteReview(review: Review): Observable<Review> {
    return this.http.delete('http://localhost:3000/api/reviews/' + review._id).pipe(
        map((data: any) => {
          return new Review(data);
        })
      );
  }

  izmeniKnjigu(book: Book): Observable<Book> {
    return this.http.put(baseURL + book._id, book).pipe(
      map((data: any) => {
        return new Book(data);
      })
    );
  }
}
