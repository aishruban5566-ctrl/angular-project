// src/app/dashboard/master/shipment/shipment.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent {
  activeTab = 'transit'; // default
}
