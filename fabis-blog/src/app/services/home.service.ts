import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Category } from '../category/category.component';
import { environment } from "src/environments/environment";
import { catchError, tap } from "rxjs/operators";
import { Post } from '../post/post.component';

const BACKEND_URL = environment.apiURL + '/public/';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(BACKEND_URL + 'category')
      .pipe(
        tap(_ => this.log('fetched Categories')),
        catchError(this.handleError('getCategories', []))
      );
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(BACKEND_URL + 'post')
      .pipe(
        tap(_ => this.log('fetched Posts')),
        catchError(this.handleError('getPosts', []))
      );
  }

  getPostsByCategory(id: any): Observable<Post[]> {
    return this.http.get<Post[]>(BACKEND_URL + 'bycategory/' + id)
      .pipe(
        tap(_ => this.log('fetched Posts')),
        catchError(this.handleError('getPosts', []))
      );
  }

  getPost(id: any): Observable<Post> {
    return this.http.get<Post>(BACKEND_URL + 'post/' + id)
      .pipe(
        tap(_ => console.log(`fetched post by id=${id}`)),
        catchError(this.handleError<Post>(`getPost id=${id}`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return(error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
