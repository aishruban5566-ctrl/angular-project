import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Country {
  id: number;
  countryName: string;
  countryCode: string;
  phoneCode: string;
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countryForm!: FormGroup;
  countries: Country[] = [];
  editMode = false;
  selectedId: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.countryForm = this.fb.group({
      countryName: ['', Validators.required],
      countryCode: ['', Validators.required],
      phoneCode: ['', Validators.required],
    });

    // mock data
    this.countries = [
      { id: 1, countryName: 'INDIA', countryCode: 'IN', phoneCode: '91' }
    ];
  }

  onSave(): void {
    if (this.countryForm.valid) {
      const newCountry: Country = {
        id: this.countries.length + 1,
        ...this.countryForm.value
      };
      this.countries.push(newCountry);
      this.countryForm.reset();
    }
  }

  onUpdate(): void {
    if (this.selectedId !== null && this.countryForm.valid) {
      const index = this.countries.findIndex(c => c.id === this.selectedId);
      if (index !== -1) {
        this.countries[index] = { id: this.selectedId, ...this.countryForm.value };
        this.onRefresh();
      }
    }
  }

  onDelete(): void {
    if (this.selectedId !== null) {
      this.countries = this.countries.filter(c => c.id !== this.selectedId);
      this.onRefresh();
    }
  }

  onRefresh(): void {
    this.countryForm.reset();
    this.editMode = false;
    this.selectedId = null;
  }

  onSelect(country: Country): void {
    this.editMode = true;
    this.selectedId = country.id;
    this.countryForm.patchValue({
      countryName: country.countryName,
      countryCode: country.countryCode,
      phoneCode: country.phoneCode
    });
  }
}
