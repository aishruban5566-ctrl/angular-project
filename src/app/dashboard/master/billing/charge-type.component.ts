// src/app/dashboard/master/billing/charge-type.component.ts
import { Component, OnInit } from '@angular/core';

interface ChargeType {
  id: number;
  name: string;
  description?: string;
  calculation: 'Flat' | 'Weight' | 'Percentage' | 'Other';
  active: boolean;
}

@Component({
  selector: 'app-charge-type',
  templateUrl: './charge-type.component.html',
  styleUrls: ['./charge-type.component.css']
})
export class ChargeTypeComponent implements OnInit {
  types: ChargeType[] = [];
  nextId = 1;

  model: Partial<ChargeType> = { name: '', calculation: 'Flat', active: true };
  editingId: number | null = null;
  search = '';

  ngOnInit(): void {
    this.types = [
      { id: this.nextId++, name: 'Flat', description: 'Flat amount per shipment', calculation: 'Flat', active: true },
      { id: this.nextId++, name: 'Weight', description: 'Calculated by weight', calculation: 'Weight', active: true },
      { id: this.nextId++, name: 'Percentage', description: 'Percentage of base amount', calculation: 'Percentage', active: true }
    ];
  }

  save() {
    if (!this.model.name) return;
    if (this.editingId != null) {
      const idx = this.types.findIndex(t => t.id === this.editingId);
      if (idx !== -1) {
        this.types[idx] = {
          id: this.editingId,
          name: this.model.name!,
          description: this.model.description || '',
          calculation: (this.model.calculation as any) || 'Other',
          active: !!this.model.active
        };
      }
      this.editingId = null;
    } else {
      this.types.push({
        id: this.nextId++,
        name: this.model.name!,
        description: this.model.description || '',
        calculation: (this.model.calculation as any) || 'Other',
        active: !!this.model.active
      });
    }
    this.reset();
  }

  edit(t: ChargeType) {
    this.editingId = t.id;
    this.model = { ...t };
  }

  remove(t: ChargeType) {
    this.types = this.types.filter(x => x.id !== t.id);
    if (this.editingId === t.id) this.reset();
  }

  reset() {
    this.model = { name: '', calculation: 'Flat', active: true };
    this.editingId = null;
  }

  get filtered() {
    const q = (this.search || '').trim().toLowerCase();
    if (!q) return this.types;
    return this.types.filter(t => t.name.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q));
  }
}
