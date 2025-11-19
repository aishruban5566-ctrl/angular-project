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
import { EmployeeComponent } from './organization/employee.component';
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
import { TariffComponent } from './tariff/tariff.component';
import { RateTariffComponent } from './tariff/rate-tariff.component';
import { ZoneTariffComponent } from './tariff/zone-tariff.component';
import { ShipperTariffComponent } from './tariff/shipper-tariff.component';

/* Unit of Measurement */
import { UnitOfMeasurementComponent } from './unit-of-measurement/unit-of-measurement.component';

/*Shipment*/
import { ShipmentModule } from './shipment/shipment.module';

/*Customer Details*/
import { CustomerComponent } from './customer/customer.component';
import { OriginCustomerComponent } from './customer/origin-customer.component';
import { IndianCustomerComponent } from './customer/indian-customer.component';


// Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomerModule } from './customer/customer.module';



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
    EmployeeComponent,
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

    RateTariffComponent,
    ZoneTariffComponent,
    ShipperTariffComponent,
    TariffComponent,

    UnitOfMeasurementComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MasterRoutingModule,
    ShipmentModule,
    CustomerModule ,
  ]
})
export class MasterModule { }
