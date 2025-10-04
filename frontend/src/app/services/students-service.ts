import { Injectable } from '@angular/core';
import { Student } from '../classes/student';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, Observable } from 'rxjs';
import { CreateStudentDto } from '../dtos/create-student-dto';
import { PaginateResponse } from '../dtos/paginate-response';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(protected readonly http: HttpClient) {}

  protected apiUrl = environment.apiUrl;

  public getStudents(page: number, perPage: number): Observable<PaginateResponse> {
    return this.http.get<PaginateResponse>(`${this.apiUrl}/students?_page=${page}&_per_page=${perPage}`).pipe(
      catchError(this.handleError)
    );
  };

  public getStudent(studentId: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/students/${studentId}`).pipe(
      catchError(this.handleError)
    );
  };

  public addStudent(student: CreateStudentDto): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/students`, student).pipe(
      catchError(this.handleError)
    );
  };

  public deleteStudent(studentId: string): Observable<Student> {
    // TO-DO: Check if enrollments are deleted as well ... ain't
    return this.http.delete<Student>(`${this.apiUrl}/students/${studentId}`).pipe(
      catchError(this.handleError)
    );
  };


  protected handleError(error: HttpErrorResponse) {
    console.error(`${error.status}, ${error.message}`);
    return throwError(() => error);
  }
}
