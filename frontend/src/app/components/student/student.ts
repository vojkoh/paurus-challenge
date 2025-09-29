import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { ActivatedRoute } from '@angular/router';
import { ContentWrapper } from '../content-wrapper/content-wrapper';

@Component({
  selector: 'app-student',
  imports: [Header, ContentWrapper],
  templateUrl: './student.html',
  styleUrl: './student.css'
})
export class Student implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  protected studentId!: string;

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('id') || '';
    // Fetch student data using studentId
  }
}
