import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Category } from "../category/category";

const BACKEND_URL = environment.apiURL + '/public/';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(BACKEND_URL)
      .pipe(
        tap(_ => this.log('fetched Categories')),
        catchError(this.handleError('getCategories', []))
      );
  }

  getCategory(id: any): Observable<Category> {
    const url = `${BACKEND_URL}/${id}`;
    return this.http.get<Category>(url)
      .pipe(
        tap(_ => this.log(`fetched Category by id=${id}`)),
        catchError(this.handleError<Category>(`getCategory id=${id}`))
      );
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(BACKEND_URL, category)
      .pipe(
        tap((prod: Category) => console.log(`added category w/ id=${category.id}`)),
        catchError(this.handleError<Category>('addCategory'))
      );
  }

  updateCategory(id: any, category: Category): Observable<any> {
    const url = `${BACKEND_URL}/${id}`;
    return this.http.put(url, category)
      .pipe(
        tap(_ => console.log(`updated category id=${id}`)),
        catchError(this.handleError<any>('updateCategory'))
      );
  }

  deleteCategory(id: any): Observable<Category> {
    const url = `${BACKEND_URL}/${id}`;
    return this.http.delete<Category>(url)
      .pipe(
        tap(_ => console.log(`deleted category id=${id}`)),
        catchError(this.handleError<Category>('deleteCategory'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error:any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
