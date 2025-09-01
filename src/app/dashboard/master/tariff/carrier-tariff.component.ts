import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface CarrierTariff {
clientName: any;
  id: number;
  carrierName: string;
  tariffCode: string;
  description: string;
  effectiveDate: string;
}

@Component({
  selector: 'app-carrier-tariff',
  templateUrl: './carrier-tariff.component.html',
  styleUrls: ['./carrier-tariff.component.css']
})
export class CarrierTariffComponent implements OnInit {
  tariffForm!: FormGroup;
  tariffs: CarrierTariff[] = [];
  editingIndex: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.tariffForm = this.fb.group({
      carrierName: ['', Validators.required],
      tariffCode: ['', Validators.required],
      description: [''],
      effectiveDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.tariffForm.invalid) return;

    if (this.editingIndex !== null) {
      this.tariffs[this.editingIndex] = {
        id: this.tariffs[this.editingIndex].id,
        ...this.tariffForm.value
      };
      this.editingIndex = null;
    } else {
      this.tariffs.push({
        id: this.tariffs.length + 1,
        ...this.tariffForm.value
      });
    }

    this.tariffForm.reset();
  }

  editTariff(index: number): void {
    this.editingIndex = index;
    this.tariffForm.patchValue(this.tariffs[index]);
  }

  deleteTariff(index: number): void {
    this.tariffs.splice(index, 1);
    if (this.editingIndex === index) {
      this.editingIndex = null;
      this.tariffForm.reset();
    }
  }

  resetForm(): void {
    this.editingIndex = null;
    this.tariffForm.reset();
  }
}
