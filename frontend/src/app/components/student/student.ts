import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { ActivatedRoute } from '@angular/router';
import { ContentWrapper } from '../content-wrapper/content-wrapper';
import { Student } from '../../classes/student';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Subject } from '../../classes/subject';


@Component({
  selector: 'app-student',
  imports: [Header, ContentWrapper, CommonModule, TableModule],
  templateUrl: './student.html',
  styleUrl: './student.css'
})
export class StudentView implements OnInit {
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

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('id') || '';
    // Fetch student data using studentId
    this.student = { id: this.studentId, name: 'John Doe', year: 2, subjects: ["1", "2"] };
    this.subjects= [{
      "id": "1",
      "name": "math",
      "semester": "winter",
      "ects": 6
    },
    {
      "id": "2",
      "name": "english",
      "semester": "summer",
      "ects": 3
    },
    {
      "id": "3",
      "name": "programming",
      "semester": "winter",
      "ects": 6
    }];
  }
}
