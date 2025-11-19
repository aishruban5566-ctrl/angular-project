import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Branch {
  slNo: number;
  branchName: string;
  branchCode: string;
  state: string;
  country: string;
  contactPerson: string;
  panNo: string;
  gstNo: string;
  creditLimit: number;
  creditDays: number;
  paymentMode: string;
}

@Component({
  selector: 'app-origin-branch',
  templateUrl: './origin-branch.component.html',
  styleUrls: ['./origin-branch.component.css']
})
export class OriginBranchComponent implements OnInit {
  branchForm!: FormGroup;
  branches: Branch[] = [];
  countries = ['INDIA', 'USA', 'UK'];
  states = ['AGARTALA', 'AGRA', 'GUJARAT', 'ANDHRA PRADESH'];
  paymentModes = ['CASH', 'CREDIT', 'ONLINE'];

  selectedIndex: number | null = null; // for Update/Delete tracking

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.branchForm = this.fb.group({
      country: ['', Validators.required],
      branchName: ['', Validators.required],
      branchCode: ['', Validators.required],
      state: ['', Validators.required],
      contactNo: [''],
      email: ['', [Validators.email]],
      address: [''],
      prefix: [''],
      paymentMode: ['', Validators.required],
      contactPerson: [''],
      panNo: [''],
      gstNo: [''],
      creditLimit: [0],
      creditDays: [0],
      openingBalance: [0]
    });

    // Sample data
    this.branches = [
      { slNo: 1, branchName: 'AGARTALA', branchCode: '12363', state: 'AGARTALA', country: 'INDIA', contactPerson: 'Agartala', panNo: '---', gstNo: '', creditLimit: 0, creditDays: 0, paymentMode: 'CREDIT' },
      { slNo: 2, branchName: 'AGRA', branchCode: 'ARA', state: 'AGRA', country: 'INDIA', contactPerson: 'ARA', panNo: '---', gstNo: '', creditLimit: 0, creditDays: 0, paymentMode: 'CREDIT' }
    ];
  }

  // ADD / SAVE
  onSave(): void {
    if (this.branchForm.valid) {
      if (this.selectedIndex !== null) {
        // Update existing record
        this.branches[this.selectedIndex] = {
          slNo: this.branches[this.selectedIndex].slNo,
          ...this.branchForm.value
        };
        this.selectedIndex = null;
      } else {
        // Add new record
        const newBranch: Branch = {
          slNo: this.branches.length + 1,
          ...this.branchForm.value
        };
        this.branches.push(newBranch);
      }
      this.branchForm.reset();
    }
  }

  // EDIT (Load into form for updating)
  onEdit(index: number): void {
    this.selectedIndex = index;
    this.branchForm.patchValue(this.branches[index]);
  }

  // UPDATE (committed inside onSave if selectedIndex !== null)
  onUpdate(): void {
    if (this.selectedIndex !== null) {
      this.onSave(); // reuse save logic for update
      alert('Branch updated successfully!');
    } else {
      alert('Please select a branch to update.');
    }
  }

  // DELETE
  onDelete(index?: number): void {
    if (index !== undefined) {
      this.branches.splice(index, 1);
      this.reassignSlNo();
      alert('Branch deleted successfully!');
    } else if (this.selectedIndex !== null) {
      this.branches.splice(this.selectedIndex, 1);
      this.reassignSlNo();
      this.selectedIndex = null;
      this.branchForm.reset();
      alert('Branch deleted successfully!');
    } else {
      alert('Please select a branch to delete.');
    }
  }

  // CLEAR form
  onClear(): void {
    this.branchForm.reset();
    this.selectedIndex = null;
  }

  // REFRESH (reset form + reload sample data)
  onRefresh(): void {
    this.ngOnInit();
    alert('Form and data refreshed!');
  }

  // EXPORT to CSV
  onExport(): void {
    const csvRows: string[] = [];
    const headers = Object.keys(this.branches[0] || {}).join(',');
    csvRows.push(headers);

    for (const branch of this.branches) {
      csvRows.push(Object.values(branch).join(','));
    }

    const csvData = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(csvData);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'branches.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    alert('Data exported to branches.csv');
  }

  // FILE UPLOAD (unchanged)
  onFileUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      alert(`File uploaded: ${file.name}`);
    }
  }

  // Utility - reassign serial numbers after delete
  private reassignSlNo(): void {
    this.branches = this.branches.map((b, i) => ({ ...b, slNo: i + 1 }));
  }
}
