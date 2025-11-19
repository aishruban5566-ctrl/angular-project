import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-hs-entry',
  templateUrl: './item-hs-entry.component.html',
  styleUrls: ['./item-hs-entry.component.css']
})
export class ItemHsEntryComponent implements OnInit {
  hsForm!: FormGroup;
  data: any[] = [];
  filteredData: any[] = [];
  searchText: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.hsForm = this.fb.group({
      hsCode: ['', Validators.required],
      descGoods: ['', Validators.required],
      customNotifiNo: [''],
      customSerialNo: [''],
      basicCustomDuty: [''],
      igstNotifiNo: [''],
      igstSerialNo: [''],
      igstDuty: [''],
      bcdExemption: [''],
      bannedItem: ['No']
    });
  }

  onSave() {
    if (this.hsForm.valid) {
      this.data.push(this.hsForm.value);
      this.filteredData = [...this.data];
      this.hsForm.reset({ bannedItem: 'No' });
    }
  }

  onUpdate() {
    alert('Update functionality not implemented yet.');
  }

  onDelete() {
    alert('Delete functionality not implemented yet.');
  }

  onRefresh() {
    this.hsForm.reset({ bannedItem: 'No' });
  }

  applySearch() {
    if (!this.searchText) {
      this.filteredData = [...this.data];
    } else {
      this.filteredData = this.data.filter(item =>
        item.hsCode.includes(this.searchText) ||
        item.descGoods.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
}
