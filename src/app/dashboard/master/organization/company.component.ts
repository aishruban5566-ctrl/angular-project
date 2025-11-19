import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface CompanyRow {
  id: number;
  organizationName: string;
  organizationCode: string;
  phoneNumber: string;
  address: string;
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  today = new Date();
  companyForm!: FormGroup;

  // sample rows to match the screenshot
  companies: CompanyRow[] = [
    { id: 1, organizationName: 'AV LOGISTICS',        organizationCode: 'AVL', phoneNumber: '9876543210', address: '' },
    { id: 2, organizationName: 'AR ENTERPRISES',      organizationCode: 'ARE', phoneNumber: '9123456789', address: '' },
    { id: 3, organizationName: 'BHUVANA ENTERPRISES', organizationCode: 'BE',  phoneNumber: '9000000000', address: '' }
  ];

  selectedIndex: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      logo: [null, Validators.required],
      year: [''],
      bankName: [''],
      bankAccNo: [''],
      swiftCode: [''],
      address: [''],
      phoneNumber: [''],
      branchName: [''],
      ifscCode: [''],
      website: [''],
      email: [''],
      tinNumber: [''],
      panNumber: [''],
      bankAddress: ['']
    });
  }

  // ✅ Save new row
  save(): void {
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      return;
    }
    const v = this.companyForm.value;
    const row: CompanyRow = {
      id: this.companies.length + 1,
      organizationName: v.name || '',
      organizationCode: v.code || '',
      phoneNumber: v.phoneNumber || '',
      address: v.address || ''
    };
    this.companies = [...this.companies, row];
    this.refresh();
  }

  // ✅ Update selected row
  update(): void {
    if (this.selectedIndex === null) return;
    const v = this.companyForm.value;
    const current = this.companies[this.selectedIndex];
    this.companies[this.selectedIndex] = {
      ...current,
      organizationName: v.name || '',
      organizationCode: v.code || '',
      phoneNumber: v.phoneNumber || '',
      address: v.address || ''
    };
    this.companies = [...this.companies];
    this.refresh();
  }

  // ✅ Delete selected row
  delete(): void {
    if (this.selectedIndex === null) return;
    this.companies = this.companies.filter((_, i) => i !== this.selectedIndex);
    this.selectedIndex = null;
    this.refresh();
  }

  // ✅ Reset form
  refresh(): void {
    this.companyForm.reset();
    this.selectedIndex = null;
  }

  // ✅ Row select → patch into form
  selectRow(i: number, c: CompanyRow): void {
    this.selectedIndex = i;
    this.companyForm.patchValue({
      name: c.organizationName,
      code: c.organizationCode,
      phoneNumber: c.phoneNumber,
      address: c.address
    });
  }

  // ✅ Export as CSV (basic)
  export(): void {
    const headers = ['ID','Organization Name','Code','Phone','Address'];
    const rows = this.companies.map(c =>
      [c.id, c.organizationName, c.organizationCode, c.phoneNumber, c.address].join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'companies.csv';
    link.click();
  }
}
