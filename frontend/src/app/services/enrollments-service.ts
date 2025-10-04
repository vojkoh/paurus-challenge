import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Enrollment } from '../classes/enrollment';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { CreateEnrollmentDto } from '../dtos/create-enrollment-dto';
import { NewEnrollmentDto } from '../dtos/new-enrollment-dto';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {
  constructor(protected readonly http: HttpClient) {}

  protected apiUrl = environment.apiUrl;

  public getEnrollments4Student(studentId: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`
      ${this.apiUrl}/enrollments?studentId=${studentId}&_embed=subject`).pipe(
      catchError(this.handleError)
    );
  };

  public addEnrollment(enrollment: CreateEnrollmentDto): Observable<NewEnrollmentDto> {
    return this.http.post<NewEnrollmentDto>(`${this.apiUrl}/enrollments`, enrollment).pipe(
      catchError(this.handleError)
    );
  }

  public deleteEnrollment(enrollmentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/enrollments/${enrollmentId}`).pipe(
      catchError(this.handleError)
    );
  }

  protected handleError(error: HttpErrorResponse) {
    console.error(`${error.status}, ${error.message}`);
    return throwError(() => error);
  }
}
