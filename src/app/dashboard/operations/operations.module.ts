import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OperationsRoutingModule } from './operations-routing.module';

import { OperationsComponent } from './operations.component';
import { AwbSalesEntryComponent } from './awb-sales-entry.component';
import { AwbAuditingComponent } from './awb-auditing.component';
import { AwbViewModifyComponent } from './awb-view-modify.component';
import { AwbDeleteComponent } from './awb-delete.component';

@NgModule({
  declarations: [
    OperationsComponent,
    AwbSalesEntryComponent,
    AwbAuditingComponent,
    AwbViewModifyComponent,
    AwbDeleteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,           // needed for [(ngModel)]
    OperationsRoutingModule,
  ],
})
export class OperationsModule {}
