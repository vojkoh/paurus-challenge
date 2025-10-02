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
    MultiSelectModule
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
  protected visible: boolean = false;

  protected studentName: string = '';
  protected studentYear: number | null = null;
  protected studentSubjectIds: string[] = [];

  ngOnInit(): void {
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (error) => {
        console.error('Error fetching students:', error);
      }
    });

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
  }

  protected async saveStudent() {
    // TO-DO: Save student logic

    if (!this.studentName || !this.studentYear) {
      console.error('Invalid student data');
      return;
    }

    this.studentsService.addStudent({
      name: this.studentName,
      year: this.studentYear
    }).subscribe({
      next: (student) => {
        // Adding student to the list
        this.students.push(student);
        // Saving enrollments
        this.studentSubjectIds.forEach(subjectId => { 
          this.enrollmentsService.addEnrollment({
            studentId: student.id,
            subjectId
          }).subscribe({
            error: () => {
              console.log('error reserving timeslots');
            }
          })
        });

        this.hideDialog();
        this.studentName = '';
        this.studentYear = null;
        this.studentSubjectIds = [];
      },
      error: (error) => {
        console.error('Error saving student:', error);
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
  }
}
