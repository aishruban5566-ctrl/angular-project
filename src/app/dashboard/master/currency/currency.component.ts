import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Currency {
  id: number;
  name: string;
  code: string;
  importedGoods: string;
  exportedGoods: string;
}

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  currencyForm!: FormGroup;
  currencies: Currency[] = [];
  today: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.currencyForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      importedGoods: [''],
      exportedGoods: ['']
    });

    // Demo data
    this.currencies = [
      { id: 1, name: 'INDIA', code: 'INR', importedGoods: '', exportedGoods: '' }
    ];

    this.today = new Date().toLocaleDateString('en-GB'); // DD-MM-YYYY
  }

  save(): void {
    if (this.currencyForm.valid) {
      const newCurrency: Currency = {
        id: this.currencies.length + 1,
        name: this.currencyForm.value.name,
        code: this.currencyForm.value.code,
        importedGoods: this.currencyForm.value.importedGoods,
        exportedGoods: this.currencyForm.value.exportedGoods
      };
      this.currencies.push(newCurrency);
      this.currencyForm.reset();
    }
  }

  update(): void {
    if (this.currencyForm.valid) {
      const index = this.currencies.findIndex(c => c.code === this.currencyForm.value.code);
      if (index !== -1) {
        this.currencies[index] = {
          id: this.currencies[index].id,
          ...this.currencyForm.value
        };
        this.currencyForm.reset();
      }
    }
  }

  delete(): void {
    const code = this.currencyForm.value.code;
    this.currencies = this.currencies.filter(c => c.code !== code);
    this.currencyForm.reset();
  }

  refresh(): void {
    this.currencyForm.reset();
  }
}
