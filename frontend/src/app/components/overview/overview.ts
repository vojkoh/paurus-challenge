import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { ContentWrapper } from '../content-wrapper/content-wrapper';
import { TableModule } from 'primeng/table';
import { Student } from '../../classes/student';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-overview',
  imports: [Header, ContentWrapper, TableModule, RouterModule],
  templateUrl: './overview.html',
  styleUrl: './overview.css'
})
export class Overview implements OnInit {
  protected students: Student[] = [];

  ngOnInit(): void {
    this.students = [
    {
      "id": "soi4",
      "name": "Vojko Hysz",
      "year": 2,
      "subjects": ["1", "3"]
    },
    {
      "id": "xi3k",
      "name": "Another Student",
      "year": 1,
      "subjects": ["2"]
    }
  ];
  }
}
