import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [Header],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  protected userId!: string;

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    // Fetch user data using userId
  }
}
