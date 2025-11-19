import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { OriginCustomerComponent } from './origin-customer.component';
import { IndianCustomerComponent } from './indian-customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      { path: 'origin-customer', component: OriginCustomerComponent },
      { path: 'indian-customer', component: IndianCustomerComponent },
      { path: '', redirectTo: 'origin-customer', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
