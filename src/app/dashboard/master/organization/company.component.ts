import { Component, OnInit } from '@angular/core';

interface Company {
  id: number;
  name: string;
  code: string;
  address: string;
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companies: Company[] = [];
  newCompany: Company = { id: 0, name: '', code: '', address: '' };
  editing: boolean = false;

  ngOnInit(): void {
    // Example data
    this.companies = [
      { id: 1, name: 'ABC Pvt Ltd', code: 'ABC', address: 'Bangalore' },
      { id: 2, name: 'XYZ Ltd', code: 'XYZ', address: 'Chennai' }
    ];
  }

  saveCompany() {
    if (this.editing) {
      let index = this.companies.findIndex(c => c.id === this.newCompany.id);
      this.companies[index] = { ...this.newCompany };
    } else {
      this.newCompany.id = this.companies.length + 1;
      this.companies.push({ ...this.newCompany });
    }
    this.cancel();
  }

  editCompany(company: Company) {
    this.newCompany = { ...company };
    this.editing = true;
  }

  deleteCompany(id: number) {
    this.companies = this.companies.filter(c => c.id !== id);
  }

  cancel() {
    this.newCompany = { id: 0, name: '', code: '', address: '' };
    this.editing = false;
  }
}
