import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Charge {
  chargeType: string;
  chargeName: string;
  hsnCode: string;
}

@Component({
  selector: 'app-charge-name',
  templateUrl: './charge-name.component.html',
  styleUrls: ['./charge-name.component.css']
})
export class ChargeNameComponent implements OnInit {
  chargeForm!: FormGroup;
  charges: Charge[] = [];
  selectedRow: Charge | null = null;

  chargeTypes: string[] = [
    'BANK CHARGES',
    'CO COURIER CHARGES',
    'INSURANCE',
    'TRANSPORT CHARGE',
    'BOOKING CHARGES',
    'DELIVERY CHARGE'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.chargeForm = this.fb.group({
      chargeType: ['', Validators.required],
      chargeName: ['', Validators.required],
      hsnCode: ['', Validators.required],
    });

    // Load dummy data (can be replaced with API call)
    this.charges = [
      { chargeType: 'BANK CHARGES', chargeName: 'CHQ. RETURN CHARGE', hsnCode: 'CRC' },
      { chargeType: 'CO COURIER CHARGES', chargeName: 'CO CONNECTION', hsnCode: 'CCN' },
      { chargeType: 'INSURANCE', chargeName: 'INSURANCE CHARGE', hsnCode: 'INS' },
      { chargeType: 'TRANSPORT CHARGE', chargeName: 'LOADING CHARGE', hsnCode: '005' },
    ];
  }

  onSave(): void {
    if (this.chargeForm.valid) {
      this.charges.push(this.chargeForm.value);
      this.chargeForm.reset();
    }
  }

  onUpdate(): void {
    if (this.selectedRow && this.chargeForm.valid) {
      Object.assign(this.selectedRow, this.chargeForm.value);
      this.selectedRow = null;
      this.chargeForm.reset();
    }
  }

  onDelete(): void {
    if (this.selectedRow) {
      this.charges = this.charges.filter(c => c !== this.selectedRow);
      this.selectedRow = null;
      this.chargeForm.reset();
    }
  }

  onRefresh(): void {
    this.chargeForm.reset();
    this.selectedRow = null;
  }

  onSelectRow(charge: Charge): void {
    this.selectedRow = charge;
    this.chargeForm.patchValue(charge);
  }
}
