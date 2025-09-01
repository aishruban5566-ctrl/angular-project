import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'master',
        loadChildren: () =>
          import('./dashboard/master/master.module').then(m => m.MasterModule),
      },
      {
        path: 'operations',
        loadChildren: () =>
          import('./dashboard/operations/operations.module').then(m => m.OperationsModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./dashboard/reports/reports.module').then(m => m.ReportsModule),
      },
      { path: '', redirectTo: 'master', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
