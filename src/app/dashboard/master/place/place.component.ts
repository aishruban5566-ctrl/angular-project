import { Component, Type } from '@angular/core';
import { ClearanceLocationComponent } from './clearance-location.component';
import { ClearancePartComponent } from './clearance-part.component';
import { ClientComponent } from './client.component';
import { CountryComponent } from './country.component';
import { DeliveryStateComponent } from './delivery-state.component';
import { DestinationComponent } from './destination.component';
import { OriginBranchComponent } from './origin-branch.component';
import { ParentClientComponent } from './parent-client.component';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent {
  sections = [
    { label: 'Clearance Locations', component: ClearanceLocationComponent },
    { label: 'Clearance Parts', component: ClearancePartComponent },
    { label: 'Clients', component: ClientComponent },
    { label: 'Country', component: CountryComponent },
    { label: 'Delivery States', component: DeliveryStateComponent },
    { label: 'Destinations', component: DestinationComponent },
    { label: 'Origin Branches', component: OriginBranchComponent },
    { label: 'Parent Clients', component: ParentClientComponent }
  ];

  activeComponent: Type<any> | null = null;

  openSection(component: Type<any>) {
    this.activeComponent = component;
  }

  closeSection() {
    this.activeComponent = null;
  }
}
