import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [ CommonModule, ButtonModule, RouterModule ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  @Input() name!: string;
  @Input() year?: number;
}
