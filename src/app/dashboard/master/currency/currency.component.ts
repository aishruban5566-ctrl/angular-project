import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent {
  currencyForm: FormGroup;
  currencies: Currency[] = [

  ];

  editingIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.currencyForm = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(3)]],
      name: ['', Validators.required],
      symbol: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.currencyForm.invalid) return;

    if (this.editingIndex !== null) {
      this.currencies[this.editingIndex] = this.currencyForm.value;
      this.editingIndex = null;
    } else {
      this.currencies.push(this.currencyForm.value);
    }

    this.currencyForm.reset();
  }

  onEdit(index: number) {
    this.editingIndex = index;
    this.currencyForm.patchValue(this.currencies[index]);
  }

  onDelete(index: number) {
    this.currencies.splice(index, 1);
  }

  onCancel() {
    this.currencyForm.reset();
    this.editingIndex = null;
  }
}
