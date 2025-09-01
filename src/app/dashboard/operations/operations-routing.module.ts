import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsComponent } from './operations.component';
import { AwbSalesEntryComponent } from './awb-sales-entry.component';
import { AwbAuditingComponent } from './awb-auditing.component';
import { AwbViewModifyComponent } from './awb-view-modify.component';
import { AwbDeleteComponent } from './awb-delete.component';

const routes: Routes = [
  {
    path: '',
    component: OperationsComponent,
    children: [
      { path: 'awb-sales-entry', component: AwbSalesEntryComponent },
      { path: 'awb-view-modify', component: AwbViewModifyComponent },
      { path: 'awb-auditing', component: AwbAuditingComponent },
      { path: 'awb-delete', component: AwbDeleteComponent },
      { path: '', redirectTo: 'awb-sales-entry', pathMatch: 'full' }, // default
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationsRoutingModule {}
