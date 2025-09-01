import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master.component';

/* Billing */
import { BillingComponent } from './billing/billing.component';
import { ChargeNameComponent } from './billing/charge-name.component';
import { ChargeTypeComponent } from './billing/charge-type.component';

/* Currency */
import { CurrencyComponent } from './currency/currency.component';

/* Item HS Entry */
import { ItemHsEntryComponent } from './item-hs-entry/item-hs-entry.component';

/* Organization */
import { OrganizationComponent } from './organization/organization.component';
import { CompanyComponent } from './organization/company.component';
import { DepartmentComponent } from './organization/department.component';
import { DesignationComponent } from './organization/designation.component';

/* Place */
import { PlaceComponent } from './place/place.component';
import { ClearanceLocationComponent } from './place/clearance-location.component';
import { ClearancePartComponent } from './place/clearance-part.component';
import { ClientComponent } from './place/client.component';
import { CountryComponent } from './place/country.component';
import { DeliveryStateComponent } from './place/delivery-state.component';
import { DestinationComponent } from './place/destination.component';
import { OriginBranchComponent } from './place/origin-branch.component';
import { ParentClientComponent } from './place/parent-client.component';

/* Tariff */
import { TariffComponent } from './tariff/tariff.component';
import { CarrierTariffComponent } from './tariff/carrier-tariff.component';
import { ClientTariffComponent } from './tariff/client-tariff.component';
import { ShipperTariffComponent } from './tariff/shipper-tariff.component';

/* Unit */
import { UnitOfMeasurementComponent } from './unit-of-measurement/unit-of-measurement.component';

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [
      { path: 'billing', component: BillingComponent },
      { path: 'billing/charge-name', component: ChargeNameComponent },
      { path: 'billing/charge-type', component: ChargeTypeComponent },

      { path: 'currency', component: CurrencyComponent },

      { path: 'item-hs-entry', component: ItemHsEntryComponent },

      { path: 'organization', component: OrganizationComponent },
      { path: 'organization/company', component: CompanyComponent },
      { path: 'organization/department', component: DepartmentComponent },
      { path: 'organization/designation', component: DesignationComponent },

      { path: 'place', component: PlaceComponent },
      { path: 'place/clearance-location', component: ClearanceLocationComponent },
      { path: 'place/clearance-part', component: ClearancePartComponent },
      { path: 'place/client', component: ClientComponent },
      { path: 'place/country', component: CountryComponent },
      { path: 'place/delivery-state', component: DeliveryStateComponent },
      { path: 'place/destination', component: DestinationComponent },
      { path: 'place/origin-branch', component: OriginBranchComponent },
      { path: 'place/parent-client', component: ParentClientComponent },

      { path: 'tariff', component: TariffComponent },
      { path: 'tariff/carrier-tariff', component: CarrierTariffComponent },
      { path: 'tariff/client-tariff', component: ClientTariffComponent },
      { path: 'tariff/shipper-tariff', component: ShipperTariffComponent },

      { path: 'unit-of-measurement', component: UnitOfMeasurementComponent },

      { path: '', redirectTo: 'billing', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
