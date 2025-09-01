import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Country {
  id: number;
  iso: string;
  name: string;
  code?: string;
  active?: boolean;
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  items: Country[] = [];
  form!: FormGroup;
  isModalOpen = false;
  isConfirmOpen = false;
  isEditing = false;
  selectedId: number | null = null;
  deletingId: number | null = null;
  searchText = '';
  page = 1;
  pageSize = 12;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      iso: ['', [Validators.required, Validators.maxLength(4)]],
      name: ['', [Validators.required, Validators.maxLength(120)]],
      code: ['', Validators.maxLength(10)],
      active: [true]
    });

    this.items = [
      { id: 1, iso: 'IN', name: 'India', code: '+91', active: true },
      { id: 2, iso: 'US', name: 'United States', code: '+1', active: true }
    ];
  }

  openAdd() { this.isEditing = false; this.selectedId = null; this.form.reset({ active: true }); this.isModalOpen = true; }
  openEdit(c: Country) { this.isEditing = true; this.selectedId = c.id; this.form.setValue({ iso: c.iso, name: c.name, code: c.code || '', active: !!c.active }); this.isModalOpen = true; }
  closeModal() { this.isModalOpen = false; }

  onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const payload = this.form.value;
    if (this.isEditing && this.selectedId !== null) {
      const idx = this.items.findIndex(i => i.id === this.selectedId);
      if (idx > -1) this.items[idx] = { id: this.selectedId, ...payload };
    } else {
      const newId = this.items.length ? Math.max(...this.items.map(i => i.id)) + 1 : 1;
      this.items.unshift({ id: newId, ...payload });
    }
    this.closeModal();
  }

  confirmDelete(id: number) { this.deletingId = id; this.isConfirmOpen = true; }
  cancelDelete() { this.deletingId = null; this.isConfirmOpen = false; }
  performDelete() { if (this.deletingId === null) return; this.items = this.items.filter(i => i.id !== this.deletingId); this.deletingId = null; this.isConfirmOpen = false; }

  filtered() {
    const q = this.searchText.trim().toLowerCase();
    if (!q) return this.items;
    return this.items.filter(i => i.iso.toLowerCase().includes(q) || i.name.toLowerCase().includes(q) || (i.code || '').toLowerCase().includes(q));
  }
  paged() { const list = this.filtered(); const start = (this.page - 1) * this.pageSize; return list.slice(start, start + this.pageSize); }
  totalPages() { return Math.max(1, Math.ceil(this.filtered().length / this.pageSize)); }
  pages() { return Array.from({ length: this.totalPages() }, (_, i) => i + 1); }
  goPage(n: number) { if (n < 1) n = 1; if (n > this.totalPages()) n = this.totalPages(); this.page = n; }
  get fv() { return this.form.controls; }
}
