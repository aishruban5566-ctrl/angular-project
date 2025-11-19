// src/app/dashboard/master/shipment/transit-type.component.ts
import { Component } from '@angular/core';

interface TransitType {
  id: number;
  name: string;
  code: string;
}

@Component({
  selector: 'app-transit-type',
  templateUrl: './transit-type.component.html',
  styleUrls: ['./transit-type.component.css']
})
export class TransitTypeComponent {
  transitTypes: TransitType[] = [
    { id: 1, name: 'AIR CARGO', code: 'A' },
    { id: 2, name: 'EXPRESS', code: 'E' },
    { id: 3, name: 'LOCAL', code: 'L' },
    { id: 4, name: 'PRIORITY', code: 'P' },
    { id: 5, name: 'ROAD', code: 'R' },
    { id: 6, name: 'SURFACE', code: 'S' },
    { id: 7, name: 'TRAIN', code: 'T' }
  ];

  newType: TransitType = { id: 0, name: '', code: '' };
  editIndex: number | null = null;

  save() {
    if (this.newType.name && this.newType.code) {
      if (this.editIndex !== null) {
        this.transitTypes[this.editIndex] = { ...this.newType };
        this.editIndex = null;
      } else {
        this.newType.id = this.transitTypes.length + 1;
        this.transitTypes.push({ ...this.newType });
      }
      this.refresh();
    }
  }

  edit(index: number) {
    this.newType = { ...this.transitTypes[index] };
    this.editIndex = index;
  }

  delete(index: number) {
    this.transitTypes.splice(index, 1);
    this.refresh();
  }

  refresh() {
    this.newType = { id: 0, name: '', code: '' };
    this.editIndex = null;
  }
}
