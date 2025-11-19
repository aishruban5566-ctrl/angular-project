import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface RateTariff {
  rateName: string;
  amount: number;
}

@Component({
  selector: 'app-rate-tariff',
  templateUrl: './rate-tariff.component.html',
  styleUrls: ['./rate-tariff.component.css']
})
export class RateTariffComponent {
  rateForm: FormGroup;
  rateTariffs: RateTariff[] = [];

  constructor(private fb: FormBuilder) {
    this.rateForm = this.fb.group({
      rateName: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  save() {
    if (this.rateForm.valid) {
      this.rateTariffs.push(this.rateForm.value);
      this.rateForm.reset();
    }
  }

  update() {
    alert('Update functionality to be implemented');
  }

  delete() {
    if (this.rateTariffs.length > 0) {
      this.rateTariffs.pop();
    }
  }

  refresh() {
    this.rateForm.reset();
  }
}
