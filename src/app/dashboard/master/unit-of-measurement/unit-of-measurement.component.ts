import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Uom {
  id: number;
  name: string;
}

@Component({
  selector: 'app-unit-of-measurement',
  templateUrl: './unit-of-measurement.component.html',
  styleUrls: ['./unit-of-measurement.component.css']
})
export class UnitOfMeasurementComponent implements OnInit {

  uomForm!: FormGroup;
  uoms: Uom[] = [];
  today: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.uomForm = this.fb.group({
      name: ['', Validators.required]
    });

    // demo data
    this.uoms = [
      { id: 1, name: 'FLAT' },
      { id: 2, name: 'KG' },
      { id: 3, name: 'PCS' }
    ];

    this.today = new Date().toLocaleDateString('en-GB'); // DD-MM-YYYY
  }

  save(): void {
    if (this.uomForm.valid) {
      const newUom: Uom = {
        id: this.uoms.length + 1,
        name: this.uomForm.value.name
      };
      this.uoms.push(newUom);
      this.uomForm.reset();
    }
  }

  update(): void {
    if (this.uomForm.valid) {
      const index = this.uoms.findIndex(u => u.name === this.uomForm.value.name);
      if (index !== -1) {
        this.uoms[index].name = this.uomForm.value.name;
        this.uomForm.reset();
      }
    }
  }

  delete(): void {
    const name = this.uomForm.value.name;
    this.uoms = this.uoms.filter(u => u.name !== name);
    this.uomForm.reset();
  }

  refresh(): void {
    this.uomForm.reset();
  }
}
