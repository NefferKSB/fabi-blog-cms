import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { Post } from '../post/post';

const BACKEND_URL = environment.apiURL + '/post/';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(BACKEND_URL)
      .pipe(
        tap(_ => this.log('fetched Posts')),
        catchError(this.handleError('getPosts', []))
      );
  }

  getPost(id: any): Observable<Post> {
    const url = `${BACKEND_URL}/${id}`;
    return this.http.get<Post>(url).pipe(
      tap(_ => console.log(`fetched post by id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(BACKEND_URL, post).pipe(
      tap((prod: Post) => console.log(`added post w/ id=${post.id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }

  updatePost(id: any, post: Post): Observable<any> {
    const url = `${BACKEND_URL}/${id}`;
    return this.http.put(url, post).pipe(
      tap(_ => console.log(`updated post id=${id}`)),
      catchError(this.handleError<any>('updatePost'))
    );
  }

  deletePost(id: any): Observable<Post> {
    const url = `${BACKEND_URL}/${id}`;
    return this.http.delete<Post>(url).pipe(
      tap(_ => console.log(`deleted post id=${id}`)),
      catchError(this.handleError<Post>('deletePost'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
