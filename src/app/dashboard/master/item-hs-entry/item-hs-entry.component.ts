// src/app/dashboard/master/item-hs-entry/item-hs-entry.component.ts
import { Component, OnInit } from '@angular/core';

interface HsEntry {
  id: number;
  hsCode: string;
  description: string;
  active: boolean;
}

@Component({
  selector: 'app-item-hs-entry',
  templateUrl: './item-hs-entry.component.html',
  styleUrls: ['./item-hs-entry.component.css']
})
export class ItemHsEntryComponent implements OnInit {
  list: HsEntry[] = [];
  nextId = 1;

  model: Partial<HsEntry> = { hsCode: '', description: '', active: true };
  editingId: number | null = null;
  search = '';

  ngOnInit(): void {
    this.list = [
      { id: this.nextId++, hsCode: '0101', description: 'Live horses, asses, mules and hinnies', active: true },
      { id: this.nextId++, hsCode: '0201', description: 'Meat of bovine animals, fresh or chilled', active: true },
    ];
  }

  save() {
    if (!this.model.hsCode) return;
    if (this.editingId != null) {
      const idx = this.list.findIndex(x => x.id === this.editingId);
      if (idx !== -1) {
        this.list[idx] = { id: this.editingId, hsCode: this.model.hsCode!, description: this.model.description || '', active: !!this.model.active };
      }
      this.editingId = null;
    } else {
      this.list.push({ id: this.nextId++, hsCode: this.model.hsCode!, description: this.model.description || '', active: !!this.model.active });
    }
    this.reset();
  }

  edit(it: HsEntry) {
    this.editingId = it.id;
    this.model = { ...it };
  }

  remove(it: HsEntry) {
    this.list = this.list.filter(x => x.id !== it.id);
    if (this.editingId === it.id) this.reset();
  }

  reset() {
    this.model = { hsCode: '', description: '', active: true };
    this.editingId = null;
  }

  get filtered() {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.list;
    return this.list.filter(i => i.hsCode.includes(q) || (i.description || '').toLowerCase().includes(q));
  }
}
