import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { AwbPrintReportComponent } from './awb-print-report.component';
import { AwbSalesReportComponent } from './awb-sales-report.component';

@NgModule({
  declarations: [
    ReportsComponent,
    AwbPrintReportComponent,
    AwbSalesReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule {}
