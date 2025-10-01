import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Enrollment } from '../classes/enrollment';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {
  constructor(protected readonly http: HttpClient) {}

  protected apiUrl = 'http://localhost:3000';
  // TO-DO: Environment variable

  public getEnrollments4Student(studentId: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`
      ${this.apiUrl}/enrollments?studentId=${studentId}&_embed=subject`).pipe(
      catchError(this.handleError)
    );
  };

  protected handleError(error: HttpErrorResponse) {
    console.error(`${error.status}, ${error.message}`);
    return throwError(() => error);
  }
}
