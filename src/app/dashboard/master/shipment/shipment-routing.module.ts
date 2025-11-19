// src/app/dashboard/master/shipment/shipment-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShipmentComponent } from './shipment.component';
import { TransitTypeComponent } from './transit-type.component';
import { AirlinesDetailsComponent } from './airlines-details.component';
import { FlightDetailsComponent } from './flight-details.component';

const routes: Routes = [
  {
    path: '',
    component: ShipmentComponent,
    children: [
      { path: 'transit-type', component: TransitTypeComponent },
      { path: 'airlines-details', component: AirlinesDetailsComponent },
      { path: 'flight-details', component: FlightDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentRoutingModule { }
