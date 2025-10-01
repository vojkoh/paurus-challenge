import { Routes } from '@angular/router';
import { Overview } from './components/overview/overview';
import { StudentView } from './components/student/student';

export const routes: Routes = [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    {
    path: 'overview',
    component: Overview,
  },
  {
    path: 'student/:id',
    component: StudentView,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'overview',
  },
];
