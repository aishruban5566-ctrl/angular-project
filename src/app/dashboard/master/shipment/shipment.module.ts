// src/app/dashboard/master/shipment/shipment.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShipmentRoutingModule } from './shipment-routing.module';

import { ShipmentComponent } from './shipment.component';
import { TransitTypeComponent } from './transit-type.component';
import { AirlinesDetailsComponent } from './airlines-details.component';
import { FlightDetailsComponent } from './flight-details.component';

@NgModule({
  declarations: [
    ShipmentComponent,
    TransitTypeComponent,
    AirlinesDetailsComponent,
    FlightDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShipmentRoutingModule
  ],
  exports: [
    ShipmentComponent
  ]
})
export class ShipmentModule { }
