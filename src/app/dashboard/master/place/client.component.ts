import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Client {
  id: number;
  code: string;
  name: string;
  shortName?: string;
  email?: string;
  active?: boolean;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
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
      code: ['', [Validators.required, Validators.maxLength(12)]],
      name: ['', [Validators.required, Validators.maxLength(120)]],
      shortName: ['', Validators.maxLength(30)],
      email: ['', Validators.email],
      active: [true]
    });

    this.clients = [
      { id: 1, code: 'CLT001', name: 'Alpha Logistics', shortName: 'Alpha', email: 'alpha@example.com', active: true },
      { id: 2, code: 'CLT002', name: 'Beta Cargo', shortName: 'Beta', email: 'beta@example.com', active: true }
    ];
  }

  openAdd() { this.isEditing = false; this.selectedId = null; this.form.reset({ active: true }); this.isModalOpen = true; }
  openEdit(c: Client) { this.isEditing = true; this.selectedId = c.id; this.form.setValue({ code: c.code, name: c.name, shortName: c.shortName || '', email: c.email || '', active: !!c.active }); this.isModalOpen = true; }
  closeModal() { this.isModalOpen = false; }

  onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const payload = this.form.value;
    if (this.isEditing && this.selectedId !== null) {
      const idx = this.clients.findIndex(x => x.id === this.selectedId);
      if (idx > -1) this.clients[idx] = { id: this.selectedId, ...payload };
    } else {
      const newId = this.clients.length ? Math.max(...this.clients.map(x => x.id)) + 1 : 1;
      this.clients.unshift({ id: newId, ...payload });
    }
    this.closeModal();
  }

  confirmDelete(id: number) { this.deletingId = id; this.isConfirmOpen = true; }
  cancelDelete() { this.deletingId = null; this.isConfirmOpen = false; }
  performDelete() { if (this.deletingId === null) return; this.clients = this.clients.filter(c => c.id !== this.deletingId); this.deletingId = null; this.isConfirmOpen = false; }

  filtered() {
    const q = this.searchText.trim().toLowerCase();
    if (!q) return this.clients;
    return this.clients.filter(c =>
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      (c.shortName || '').toLowerCase().includes(q) ||
      (c.email || '').toLowerCase().includes(q)
    );
  }
  paged() { const list = this.filtered(); const start = (this.page - 1) * this.pageSize; return list.slice(start, start + this.pageSize); }
  totalPages() { return Math.max(1, Math.ceil(this.filtered().length / this.pageSize)); }
  pages() { return Array.from({ length: this.totalPages() }, (_, i) => i + 1); }
  goPage(n: number) { if (n < 1) n = 1; if (n > this.totalPages()) n = this.totalPages(); this.page = n; }
  get fv() { return this.form.controls; }
}
