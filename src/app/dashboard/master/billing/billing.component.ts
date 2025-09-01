import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BillingRecord } from './billing.model';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  // model bound to form
  model: Partial<BillingRecord> = {
    id: undefined,
    name: '',
    chargeType: '',
    amount: null,
    currency: '',
    active: false
  };

  // support edit/create toggle
  editingId: number | null = null;

  // search filter
  filterText = '';

  // list of all records
  billingList: BillingRecord[] = [];

  // computed list with filter applied
  get filteredList(): BillingRecord[] {
    if (!this.filterText.trim()) {
      return this.billingList;
    }
    const search = this.filterText.toLowerCase();
    return this.billingList.filter(b =>
      b.name.toLowerCase().includes(search) ||
      (b.chargeType?.toLowerCase().includes(search)) ||
      (b.currency?.toLowerCase().includes(search))
    );
  }

  addOrUpdate(form: NgForm) {
    if (!this.model.name || this.model.amount === null) {
      alert('Name and Amount are required.');
      return;
    }

    if (this.editingId) {
      // Update existing
      const index = this.billingList.findIndex(b => b.id === this.editingId);
      if (index !== -1) {
        this.billingList[index] = { ...this.model, id: this.editingId } as BillingRecord;
      }
    } else {
      // Create new
      const newRecord: BillingRecord = {
        id: this.billingList.length + 1,
        name: this.model.name!,
        chargeType: this.model.chargeType,
        amount: this.model.amount,
        currency: this.model.currency,
        active: this.model.active ?? false
      };
      this.billingList.push(newRecord);
    }

    this.resetForm(form);
  }

  edit(record: BillingRecord) {
    this.model = { ...record };
    this.editingId = record.id ?? null;
  }

  delete(id: number) {
    this.billingList = this.billingList.filter(b => b.id !== id);
    if (this.editingId === id) {
      this.editingId = null;
      this.model = {
        id: undefined,
        name: '',
        chargeType: '',
        amount: null,
        currency: '',
        active: false
      };
    }
  }

  toggleActive(record: BillingRecord) {
    record.active = !record.active;
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.model = {
      id: undefined,
      name: '',
      chargeType: '',
      amount: null,
      currency: '',
      active: false
    };
    this.editingId = null;
  }
}
