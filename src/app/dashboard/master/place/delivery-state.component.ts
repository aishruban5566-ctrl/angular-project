import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface DeliveryState {
  id: number;
  code: string;
  name: string;
  country?: string;
  active?: boolean;
}

@Component({
  selector: 'app-delivery-state',
  templateUrl: './delivery-state.component.html',
  styleUrls: ['./delivery-state.component.css']
})
export class DeliveryStateComponent implements OnInit {
  items: DeliveryState[] = [];
  form!: FormGroup;
  isModalOpen = false;
  isConfirmOpen = false;
  isEditing = false;
  selectedId: number | null = null;
  deletingId: number | null = null;
  searchText = '';
  page = 1;
  pageSize = 10;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      country: ['', Validators.maxLength(80)],
      active: [true]
    });

    this.items = [
      { id: 1, code: 'ST001', name: 'Tamil Nadu', country: 'India', active: true },
      { id: 2, code: 'ST002', name: 'Maharashtra', country: 'India', active: true }
    ];
  }

  openAdd() { this.isEditing = false; this.selectedId = null; this.form.reset({ active: true }); this.isModalOpen = true; }
  openEdit(i: DeliveryState) { this.isEditing = true; this.selectedId = i.id; this.form.setValue({ code: i.code, name: i.name, country: i.country || '', active: !!i.active }); this.isModalOpen = true; }
  closeModal() { this.isModalOpen = false; }

  onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const payload = this.form.value;
    if (this.isEditing && this.selectedId !== null) {
      const idx = this.items.findIndex(x => x.id === this.selectedId);
      if (idx > -1) this.items[idx] = { id: this.selectedId, ...payload };
    } else {
      const newId = this.items.length ? Math.max(...this.items.map(x => x.id)) + 1 : 1;
      this.items.unshift({ id: newId, ...payload });
    }
    this.closeModal();
  }

  confirmDelete(id: number) { this.deletingId = id; this.isConfirmOpen = true; }
  cancelDelete() { this.deletingId = null; this.isConfirmOpen = false; }
  performDelete() { if (this.deletingId === null) return; this.items = this.items.filter(x => x.id !== this.deletingId); this.deletingId = null; this.isConfirmOpen = false; }

  filtered() {
    const q = this.searchText.trim().toLowerCase();
    if (!q) return this.items;
    return this.items.filter(i => i.code.toLowerCase().includes(q) || i.name.toLowerCase().includes(q) || (i.country || '').toLowerCase().includes(q));
  }
  paged() { const list = this.filtered(); const start = (this.page - 1) * this.pageSize; return list.slice(start, start + this.pageSize); }
  totalPages() { return Math.max(1, Math.ceil(this.filtered().length / this.pageSize)); }
  pages() { return Array.from({ length: this.totalPages() }, (_, i) => i + 1); }
  goPage(n: number) { if (n < 1) n = 1; if (n > this.totalPages()) n = this.totalPages(); this.page = n; }
  get fv() { return this.form.controls; }
}
