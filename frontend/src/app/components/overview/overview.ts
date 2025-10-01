import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { ContentWrapper } from '../content-wrapper/content-wrapper';
import { TableModule } from 'primeng/table';
import { Student } from '../../classes/student';
import { RouterModule } from '@angular/router';
import { StudentsService } from '../../services/students-service';

@Component({
  selector: 'app-overview',
  imports: [Header, ContentWrapper, TableModule, RouterModule],
  templateUrl: './overview.html',
  styleUrl: './overview.css'
})
export class Overview implements OnInit {
  constructor(protected readonly studentsService: StudentsService) {}

  protected students: Student[] = [];

  ngOnInit(): void {
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (error) => {
        console.error('Error fetching students:', error);
      }
    });
  }
}
