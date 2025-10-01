import { Injectable } from '@angular/core';
import { Student } from '../classes/student';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(protected readonly http: HttpClient) {}

  protected apiUrl = 'http://localhost:3000';
  
  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students`).pipe(
      catchError(this.handleError)
    );
  };

  public getStudent(studentId: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/students/${studentId}`).pipe(
      catchError(this.handleError)
    );
  };

  protected handleError(error: HttpErrorResponse) {
    console.error(`${error.status}, ${error.message}`);
    return throwError(() => error);
  }
}
