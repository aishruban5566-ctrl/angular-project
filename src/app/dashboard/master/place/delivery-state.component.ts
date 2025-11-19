import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface DeliveryState {
  id: number;
  countryName: string;
  deliveryStateName: string;
  stateCode: string;
  customStateCode: string;
}

@Component({
  selector: 'app-delivery-state',
  templateUrl: './delivery-state.component.html',
  styleUrls: ['./delivery-state.component.css']
})
export class DeliveryStateComponent implements OnInit {
  deliveryStateForm!: FormGroup;
  states: DeliveryState[] = [];
  editIndex: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.deliveryStateForm = this.fb.group({
      countryName: ['', Validators.required],
      deliveryStateName: ['', Validators.required],
      stateCode: ['', Validators.required],
      customStateCode: ['', Validators.required]
    });

    // Dummy initial data
    this.states = [
      { id: 1, countryName: 'INDIA', deliveryStateName: 'TAMILNADU', stateCode: 'TN', customStateCode: '33' },
      { id: 2, countryName: 'INDIA', deliveryStateName: 'KERALA', stateCode: 'KL', customStateCode: '32' },
      { id: 3, countryName: 'INDIA', deliveryStateName: 'KARNATAKA', stateCode: 'KA', customStateCode: '29' },
    ];
  }

  onSave() {
    if (this.deliveryStateForm.valid) {
      const formValue = this.deliveryStateForm.value;

      if (this.editIndex !== null) {
        this.states[this.editIndex] = {
          id: this.states[this.editIndex].id,
          ...formValue
        };
        this.editIndex = null;
      } else {
        this.states.push({
          id: this.states.length + 1,
          ...formValue
        });
      }

      this.deliveryStateForm.reset();
    }
  }

  onEdit(state: DeliveryState, index: number) {
    this.deliveryStateForm.patchValue(state);
    this.editIndex = index;
  }

  onDelete(index: number) {
    this.states.splice(index, 1);
  }

  onRefresh() {
    this.deliveryStateForm.reset();
    this.editIndex = null;
  }

  onExport() {
    const data = JSON.stringify(this.states, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'delivery-states.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
