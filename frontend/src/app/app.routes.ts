import { Routes } from '@angular/router';
import { Overview } from './components/overview/overview';
import { User } from './components/user/user';

export const routes: Routes = [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    {
    path: 'overview',
    component: Overview,
  },
  {
    path: 'user/:id',
    component: User,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'overview',
  },
];
