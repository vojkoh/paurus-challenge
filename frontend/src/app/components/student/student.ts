import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { ActivatedRoute } from '@angular/router';
import { ContentWrapper } from '../content-wrapper/content-wrapper';
import { Student } from '../../classes/student';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { StudentsService } from '../../services/students-service';
import { SubjectsService } from '../../services/subjects-service';
import { Subject } from '../../classes/subject';
import { EnrollmentsService } from '../../services/enrollments-service';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { Enrollment } from '../../classes/enrollment';
import { NewEnrollmentDto } from '../../dtos/new-enrollment-dto';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs';


interface SubjectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-student',
  imports: [
    Header, 
    ContentWrapper, 
    CommonModule, 
    TableModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    FloatLabelModule,
    MultiSelectModule
  ],
  templateUrl: './student.html',
  styleUrl: './student.css'
})
export class StudentView implements OnInit {
  constructor(
    private readonly studentsService: StudentsService, 
    private readonly subjectsService: SubjectsService,
    private readonly enrollmentsService: EnrollmentsService
  ) {}

  protected dialogVisible: boolean = false;
  private route: ActivatedRoute = inject(ActivatedRoute);
  protected subjects: SubjectOption[] = [];

  protected studentId!: string;
  protected student: Student = { id: '', name: '', surname: '', year: 0 };

  // For editing enrollments
  protected studentEnrollments: Enrollment[] = [];
  protected studentSubjects: Subject[] = [];

  // For form binding
  protected studentSubjectIds: string[] = [];

  protected cols: { field: string; header: string; }[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'semester', header: 'Semester' },
    { field: 'ects', header: 'ECTS' }
  ];

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('id') || '';
    this.getStudentData();
    this.getStudentEnrollments();
    this.getAllSubjects();
  }

  protected getStudentData() {
     this.studentsService.getStudent(this.studentId).subscribe({
      next: (student) => {
        this.student = student;
      },
      error: (error) => {
        console.error('Error fetching students:', error);
      }
    });
  }

  protected getStudentEnrollments() {
    this.enrollmentsService.getEnrollments4Student(this.studentId).subscribe({
      next: (enrollments) => {
        this.studentEnrollments = enrollments;
        this.studentSubjects = enrollments.map(enrollment => enrollment.subject);
        this.studentSubjectIds = this.studentEnrollments.map(enrollment => enrollment.subject.id);
      },
      error: (error) => {
        console.error('Error fetching subjects for student:', error);
      }
    });
  };

  protected getAllSubjects() {
    this.subjectsService.getSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects.map(subject => ({ 
          label: subject.name, 
          value: subject.id 
        }));
      },
      error: (error) => {
        console.error('Error fetching subjects:', error);
      }
    });
  };

  protected async editStudent() {

    // Observables for adding/removing enrollments
    const requests: Observable<NewEnrollmentDto | void>[] = [];

    this.subjects.map(subject => {
      const subjectId: string = subject.value;
      const currentlyEnrolled: Enrollment | undefined = this.studentEnrollments.find(enrollment => 
        enrollment.subject.id === subjectId
      );

      if (this.studentSubjectIds.includes(subjectId)) {
        if (!currentlyEnrolled) {
          // If subject is selected and not already enrolled, add enrollment
          requests.push(this.enrollmentsService.addEnrollment({
            studentId: this.student.id,
            subjectId
          }));
        }
      } else {
        if (currentlyEnrolled) {
          // Delete enrollment even if it doesn't exist
          requests.push(this.enrollmentsService.deleteEnrollment(currentlyEnrolled.id));
        }
      }
    });

    // Joining all requests and executing them
    forkJoin(requests).subscribe({
      next: () => {
        console.log('Enrollments updated successfully');
        this.getStudentEnrollments();
        this.hideDialog();
      },
      error: (error) => {
        console.error('Error updating enrollments:', error);
      }
    });
  }

  showDialog() {
    this.dialogVisible = true;
  }

  hideDialog() {
    this.dialogVisible = false;
  }
}
