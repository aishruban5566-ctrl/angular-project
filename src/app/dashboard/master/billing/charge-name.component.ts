// src/app/dashboard/master/billing/charge-name.component.ts
import { Component, OnInit } from '@angular/core';

interface ChargeName {
  id: number;
  code: string;
  description: string;
  active: boolean;
}

@Component({
  selector: 'app-charge-name',
  templateUrl: './charge-name.component.html',
  styleUrls: ['./charge-name.component.css']
})
export class ChargeNameComponent implements OnInit {
  items: ChargeName[] = [];
  nextId = 1;

  model: Partial<ChargeName> = { code: '', description: '', active: true };
  editingId: number | null = null;
  filter = '';

  ngOnInit(): void {
    this.items = [
      { id: this.nextId++, code: 'FRT', description: 'Freight charge', active: true },
      { id: this.nextId++, code: 'CUS', description: 'Customs charge', active: true },
    ];
  }

  save() {
    if (!this.model.code) return;
    if (this.editingId != null) {
      const idx = this.items.findIndex(x => x.id === this.editingId);
      if (idx !== -1) {
        this.items[idx] = { id: this.editingId, code: this.model.code!, description: this.model.description || '', active: !!this.model.active };
      }
      this.editingId = null;
    } else {
      this.items.push({ id: this.nextId++, code: this.model.code!, description: this.model.description || '', active: !!this.model.active });
    }
    this.reset();
  }

  edit(it: ChargeName) {
    this.editingId = it.id;
    this.model = { ...it };
  }

  remove(it: ChargeName) {
    this.items = this.items.filter(x => x.id !== it.id);
    if (this.editingId === it.id) this.reset();
  }

  reset() {
    this.model = { code: '', description: '', active: true };
    this.editingId = null;
  }

  get filtered() {
    const q = (this.filter || '').trim().toLowerCase();
    if (!q) return this.items;
    return this.items.filter(i => i.code.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
  }
}
