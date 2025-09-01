import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ClearanceLocation {
  id: number;
  code: string;
  name: string;
  description?: string;
  active?: boolean;
}

@Component({
  selector: 'app-clearance-location',
  templateUrl: './clearance-location.component.html',
  styleUrls: ['./clearance-location.component.css']
})
export class ClearanceLocationComponent implements OnInit {
  clearanceLocations: ClearanceLocation[] = [];
  clearanceForm!: FormGroup;
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
    this.clearanceForm = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(12)]],
      name: ['', [Validators.required, Validators.maxLength(80)]],
      description: ['', Validators.maxLength(240)],
      active: [true]
    });

    // demo data
    this.clearanceLocations = [
      { id: 1, code: 'CL001', name: 'Chennai Port', description: 'Main sea clearance', active: true },
      { id: 2, code: 'CL002', name: 'Mumbai Airport', description: 'Air cargo clearance', active: true },
      { id: 3, code: 'CL003', name: 'Tuticorin Port', description: 'Regional port', active: false }
    ];
  }

  // modal handlers
  openAdd(): void { this.isEditing = false; this.selectedId = null; this.clearanceForm.reset({ active: true }); this.isModalOpen = true; }
  openEdit(item: ClearanceLocation): void {
    this.isEditing = true;
    this.selectedId = item.id;
    this.clearanceForm.setValue({ code: item.code, name: item.name, description: item.description || '', active: !!item.active });
    this.isModalOpen = true;
  }
  closeModal(): void { this.isModalOpen = false; this.clearanceForm.markAsPristine(); this.clearanceForm.markAsUntouched(); }

  onSubmit(): void {
    if (this.clearanceForm.invalid) { this.clearanceForm.markAllAsTouched(); return; }
    const payload = this.clearanceForm.value;
    if (this.isEditing && this.selectedId !== null) {
      const idx = this.clearanceLocations.findIndex(c => c.id === this.selectedId);
      if (idx > -1) this.clearanceLocations[idx] = { id: this.selectedId, ...payload };
    } else {
      const newId = this.clearanceLocations.length ? Math.max(...this.clearanceLocations.map(c => c.id)) + 1 : 1;
      this.clearanceLocations.unshift({ id: newId, ...payload });
    }
    this.closeModal();
  }

  confirmDelete(id: number): void { this.deletingId = id; this.isConfirmOpen = true; }
  cancelDelete(): void { this.deletingId = null; this.isConfirmOpen = false; }
  performDelete(): void { if (this.deletingId === null) return; this.clearanceLocations = this.clearanceLocations.filter(c => c.id !== this.deletingId); this.deletingId = null; this.isConfirmOpen = false; }

  // filtering & paging
  filtered(): ClearanceLocation[] {
    const q = this.searchText.trim().toLowerCase();
    if (!q) return this.clearanceLocations;
    return this.clearanceLocations.filter(c =>
      (c.code || '').toLowerCase().includes(q) ||
      (c.name || '').toLowerCase().includes(q) ||
      (c.description || '').toLowerCase().includes(q)
    );
  }

  paged(): ClearanceLocation[] { const list = this.filtered(); const start = (this.page - 1) * this.pageSize; return list.slice(start, start + this.pageSize); }
  totalPages(): number { return Math.max(1, Math.ceil(this.filtered().length / this.pageSize)); }
  pages(): number[] { return Array.from({ length: this.totalPages() }, (_, i) => i + 1); }
  goPage(n: number): void { if (n < 1) n = 1; if (n > this.totalPages()) n = this.totalPages(); this.page = n; }

  get fv() { return this.clearanceForm.controls; }
}
