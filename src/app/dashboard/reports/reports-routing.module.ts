import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { AwbPrintReportComponent } from './awb-print-report.component';
import { AwbSalesReportComponent } from './awb-sales-report.component';

const routes: Routes = [
  { path: '', component: ReportsComponent },
  { path: 'awb-print', component: AwbPrintReportComponent },
  { path: 'awb-sales', component: AwbSalesReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
