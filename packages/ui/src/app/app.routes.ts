import { Route } from '@angular/router';
import { DashboardComponent } from './screens/dashboard/dashboard.component';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => {
      return DashboardComponent;
    },
  },
];
