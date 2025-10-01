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


@Component({
  selector: 'app-student',
  imports: [Header, ContentWrapper, CommonModule, TableModule],
  templateUrl: './student.html',
  styleUrl: './student.css'
})
export class StudentView implements OnInit {
  constructor(
    private readonly studentsService: StudentsService, 
    private readonly subjectsService: SubjectsService,
    private readonly enrollmentsService: EnrollmentsService
  ) {}

  private route: ActivatedRoute = inject(ActivatedRoute);
  protected studentId!: string;
  protected student!: Student;
  protected subjects: Subject[] = [];

  protected cols: { field: string; header: string; }[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'semester', header: 'Semester' },
    { field: 'ects', header: 'ECTS' }
  ];
  // TO-DO: Fetch column names

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('id') || '';
    // Fetch student data using studentId
    this.studentsService.getStudent(this.studentId).subscribe({
      next: (student) => {
        this.student = student;
      },
      error: (error) => {
        console.error('Error fetching students:', error);
      }
    });

    this.enrollmentsService.getEnrollments4Student(this.studentId).subscribe({
      next: (enrollments) => {
        this.subjects = enrollments.map(enrollment => enrollment.subject);
      },
      error: (error) => {
        console.error('Error fetching subjects for student:', error);
      }
    });
  }
}
