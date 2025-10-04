import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { ContentWrapper } from '../content-wrapper/content-wrapper';
import { TableModule } from 'primeng/table';
import { Student } from '../../classes/student';
import { RouterModule } from '@angular/router';
import { StudentsService } from '../../services/students-service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { SubjectsService } from '../../services/subjects-service';
import { EnrollmentsService } from '../../services/enrollments-service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { forkJoin } from 'rxjs';


interface SubjectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-overview',
  imports: [
    Header,
    ContentWrapper,
    TableModule,
    RouterModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    FloatLabel,
    InputNumberModule,
    MultiSelectModule,
    PaginatorModule
  ],
  templateUrl: './overview.html',
  styleUrl: './overview.css'
})
export class Overview implements OnInit {
  constructor(
    protected readonly studentsService: StudentsService,
    protected readonly subjectsService: SubjectsService,
    protected readonly enrollmentsService: EnrollmentsService
  ) {}

  protected students: Student[] = [];
  protected subjects: SubjectOption[] = [];
  protected dialogVisible: boolean = false;

  // for new student creation (NgModel)
  protected studentSurname: string = '';
  protected studentName: string = '';
  protected studentYear: number | null = null;
  protected studentSubjectIds: string[] = [];

  // for pagination
  protected first: number = 0;
  protected page: number = 0;
  protected rows: number = 20;
  protected totalRecords!: number;

  ngOnInit(): void {
    this.getStudents();
    this.getAllSubjects();
  }

  protected getStudents() {
    this.studentsService.getStudents(this.page + 1, this.rows).subscribe({
      next: (res) => {
        this.students = res.data;
        this.totalRecords = res.items;
      },
      error: (error) => {
        console.error('Error fetching students');
      }
    });
  }

  protected getAllSubjects() {
    this.subjectsService.getSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects.map(subject => ({ 
          label: subject.name, 
          value: subject.id 
        }));
      },
      error: (error) => {
        console.error('Error fetching subjects');
      }
    });
  }


  protected saveStudent() {

    if (!this.studentName || !this.studentYear) {
      console.error('Invalid student data');
      return;
    }

    this.studentsService.addStudent({
      surname: this.studentSurname,
      name: this.studentName,
      year: this.studentYear
    }).subscribe({
      next: (student) => {
        this.students.push(student);

        // collecting all enrollment observables
        const enrollmentObservables = this.studentSubjectIds.map(subjectId => {
          return this.enrollmentsService.addEnrollment({
            studentId: student.id,
            subjectId
          });
        })

        // Using forkJoin to wait for all enrollment requests to complete
        forkJoin(enrollmentObservables).subscribe({
          next: () => {
            console.log('All enrollments saved successfully');
            // cleanup and close dialog
            this.hideDialog();
            this.studentName = '';
            this.studentYear = null;
            this.studentSubjectIds = [];
          },
          error: () => {
            console.log('Error saving enrollments');
          }
        });
      },
      error: (error) => {
        console.error('Error saving student:', error);
      }
    });
  }

  protected deleteStudent(studentId: string) {
    this.studentsService.deleteStudent(studentId).subscribe({
      next: () => {
        // Remove student from the list
        this.students = this.students.filter(student => student.id !== studentId);
      },
      error: (error) => {
        console.error('Error deleting student:', error);
      }
    });
  }

  onPageChange(event: PaginatorState) {
    // paginator state refresh
    this.first = event.first ?? 0;
    this.page = event.page ?? 1;
    this.rows = event.rows ?? 20;
    this.getStudents();
  }

  showDialog() {
    this.dialogVisible = true;
  }

  hideDialog() {
    this.dialogVisible = false;
  }
}
