import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ShipperTariff {
  country: string;
  client: string;
  service: string;
  zoneTariff: string;
  rateTariff: string;
}

@Component({
  selector: 'app-shipper-tariff',
  templateUrl: './shipper-tariff.component.html',
  styleUrls: ['./shipper-tariff.component.css']
})
export class ShipperTariffComponent {
  shipperForm: FormGroup;
  shipperTariffs: ShipperTariff[] = [];

  countries = ['India', 'USA', 'UK', 'Germany', 'Japan'];
  clients = ['Client A', 'Client B', 'Client C'];
  services = ['Air', 'Sea', 'Road'];
  zoneTariffs = ['Zone 1', 'Zone 2', 'Zone 3'];
  rateTariffs = ['120', '68', '200'];

  constructor(private fb: FormBuilder) {
    this.shipperForm = this.fb.group({
      country: ['', Validators.required],
      client: ['', Validators.required],
      service: ['', Validators.required],
      zoneTariff: ['', Validators.required],
      rateTariff: ['', Validators.required]
    });
  }

  add() {
    if (this.shipperForm.valid) {
      this.shipperTariffs.push(this.shipperForm.value);
      this.shipperForm.reset();
    }
  }

  update() {
    alert('Update functionality to be implemented');
  }

  delete() {
    if (this.shipperTariffs.length > 0) {
      this.shipperTariffs.pop();
    }
  }

  clear() {
    this.shipperForm.reset();
  }
}
