import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Student } from '../classes/student';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Subject } from '../classes/subject';
import { Enrollment } from '../classes/enrollment';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  constructor(protected readonly http: HttpClient) {}

  protected apiUrl = 'http://localhost:3000';

  public getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/subjects`).pipe(
      catchError(this.handleError)
    );
  };

  protected handleError(error: HttpErrorResponse) {
    console.error(`${error.status}, ${error.message}`);
    return throwError(() => error);
  }
}
