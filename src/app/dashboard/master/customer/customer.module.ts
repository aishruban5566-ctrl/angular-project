import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { OriginCustomerComponent } from './origin-customer.component';
import { IndianCustomerComponent } from './indian-customer.component';

@NgModule({
  declarations: [
    CustomerComponent,
    OriginCustomerComponent,
    IndianCustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRoutingModule
  ],
  exports: [
    CustomerComponent    // <<--- EXPORT so other modules can use <app-customer>
  ]
})
export class CustomerModule { }
