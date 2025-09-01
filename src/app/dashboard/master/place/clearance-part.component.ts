import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ClearancePart {
  id: number;
  code: string;
  name: string;
  description?: string;
  active?: boolean;
}

@Component({
  selector: 'app-clearance-part',
  templateUrl: './clearance-part.component.html',
  styleUrls: ['./clearance-part.component.css']
})
export class ClearancePartComponent implements OnInit {
  items: ClearancePart[] = [];
  form!: FormGroup;
  isModalOpen = false;
  isConfirmOpen = false;
  isEditing = false;
  selectedId: number | null = null;
  deletingId: number | null = null;
  searchText = '';
  page = 1;
  pageSize = 8;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(12)]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(240)],
      active: [true]
    });

    this.items = [
      { id: 1, code: 'CP001', name: 'Part A', description: 'Clearance part A', active: true },
      { id: 2, code: 'CP002', name: 'Part B', description: 'Clearance part B', active: true }
    ];
  }

  openAdd() { this.isEditing = false; this.selectedId = null; this.form.reset({ active: true }); this.isModalOpen = true; }
  openEdit(item: ClearancePart) { this.isEditing = true; this.selectedId = item.id; this.form.setValue({ code: item.code, name: item.name, description: item.description || '', active: !!item.active }); this.isModalOpen = true; }
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
    return this.items.filter(i => i.code.toLowerCase().includes(q) || i.name.toLowerCase().includes(q) || (i.description || '').toLowerCase().includes(q));
  }
  paged() { const list = this.filtered(); const start = (this.page - 1) * this.pageSize; return list.slice(start, start + this.pageSize); }
  totalPages() { return Math.max(1, Math.ceil(this.filtered().length / this.pageSize)); }
  pages() { return Array.from({ length: this.totalPages() }, (_, i) => i + 1); }
  goPage(n: number) { if (n < 1) n = 1; if (n > this.totalPages()) n = this.totalPages(); this.page = n; }
  get fv() { return this.form.controls; }
}
