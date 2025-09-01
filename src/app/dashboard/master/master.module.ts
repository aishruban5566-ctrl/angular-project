import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MasterRoutingModule } from './master-routing.module';
import { ReactiveFormsModule} from '@angular/forms';
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
import { CompanyComponent } from './organization/company.component';
import { DepartmentComponent } from './organization/department.component';
import { DesignationComponent } from './organization/designation.component';
import { OrganizationComponent } from './organization/organization.component';

/* Place */
import { ClearanceLocationComponent } from './place/clearance-location.component';
import { ClearancePartComponent } from './place/clearance-part.component';
import { ClientComponent } from './place/client.component';
import { CountryComponent } from './place/country.component';
import { DeliveryStateComponent } from './place/delivery-state.component';
import { DestinationComponent } from './place/destination.component';
import { OriginBranchComponent } from './place/origin-branch.component';
import { ParentClientComponent } from './place/parent-client.component';
import { PlaceComponent } from './place/place.component';


/* Tariff */
import { CarrierTariffComponent } from './tariff/carrier-tariff.component';
import { ClientTariffComponent } from './tariff/client-tariff.component';
import { ShipperTariffComponent } from './tariff/shipper-tariff.component';
import { TariffComponent } from './tariff/tariff.component';

/* Unit of Measurement */
import { UnitOfMeasurementComponent } from './unit-of-measurement/unit-of-measurement.component';

@NgModule({
  declarations: [
    MasterComponent,

    BillingComponent,
    ChargeNameComponent,
    ChargeTypeComponent,

    CurrencyComponent,

    ItemHsEntryComponent,

    CompanyComponent,
    DepartmentComponent,
    DesignationComponent,
    OrganizationComponent,

    ClearanceLocationComponent,
    ClearancePartComponent,
    ClientComponent,
    CountryComponent,
    DeliveryStateComponent,
    DestinationComponent,
    OriginBranchComponent,
    ParentClientComponent,
    PlaceComponent,

    CarrierTariffComponent,
    ClientTariffComponent,
    ShipperTariffComponent,
    TariffComponent,

    UnitOfMeasurementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MasterRoutingModule
  ]
})
export class MasterModule { }
