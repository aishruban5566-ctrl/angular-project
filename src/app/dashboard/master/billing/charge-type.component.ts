import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ChargeType {
  id: number;
  name: string;
}

@Component({
  selector: 'app-charge-type',
  templateUrl: './charge-type.component.html',
  styleUrls: ['./charge-type.component.css']
})
export class ChargeTypeComponent implements OnInit {
  chargeForm!: FormGroup;
  chargeTypes: ChargeType[] = [];
  editIndex: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.chargeForm = this.fb.group({
      name: ['', Validators.required]
    });

    // Preloaded values
    this.chargeTypes = [
      { id: 1, name: 'BANK CHARGES' },
      { id: 2, name: 'BOOKING CHARGES' },
      { id: 3, name: 'CO COURIER CHARGE' },
      { id: 4, name: 'DELIVERY CHARGE' },
      { id: 5, name: 'INSURANCE' },
      { id: 6, name: 'TRANSPORT CHARGES' }
    ];
  }

  onSave() {
    if (this.chargeForm.invalid) return;
    const newId = this.chargeTypes.length + 1;
    this.chargeTypes.push({ id: newId, name: this.chargeForm.value.name });
    this.chargeForm.reset();
  }

  onUpdate() {
    if (this.chargeForm.invalid || this.editIndex === null) return;
    this.chargeTypes[this.editIndex].name = this.chargeForm.value.name;
    this.editIndex = null;
    this.chargeForm.reset();
  }

  onDelete(index: number) {
    this.chargeTypes.splice(index, 1);
    this.chargeTypes = this.chargeTypes.map((c, i) => ({ id: i + 1, name: c.name }));
  }

  onEdit(index: number) {
    this.editIndex = index;
    this.chargeForm.patchValue({ name: this.chargeTypes[index].name });
  }

  onRefresh() {
    this.chargeForm.reset();
    this.editIndex = null;
  }
}
