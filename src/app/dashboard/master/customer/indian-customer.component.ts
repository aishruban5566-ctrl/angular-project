import { Component } from '@angular/core';

interface IndianCustomer {
  id: number;
  accountNo: string;
  iecCode: string;
  country: string;
  state: string;
  branch: string;
  name: string;
  address: string;
  mobile: string;
  city: string;
  postalCode: string;
  idType: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-indian-customer',
  templateUrl: './indian-customer.component.html',
  styleUrls: ['./indian-customer.component.css']
})
export class IndianCustomerComponent {
  searchIEC = '';
  searchName = '';
  searchIdType = '';

  customers: IndianCustomer[] = [
    {
      id: 1, accountNo: 'IC001', iecCode: 'IEC12345', country: 'India',
      state: 'Tamil Nadu', branch: 'Chennai', name: 'Arun Prakash',
      address: '45 Gandhi Street', mobile: '9876543210', city: 'Chennai',
      postalCode: '600001', idType: 'PAN', phone: '044-2222333', email: 'arun@test.com'
    },
    {
      id: 2, accountNo: 'IC002', iecCode: 'IEC67890', country: 'India',
      state: 'Delhi', branch: 'Delhi Main', name: 'Meena Sharma',
      address: '12 Connaught Place', mobile: '9123456780', city: 'Delhi',
      postalCode: '110001', idType: 'Aadhaar', phone: '011-3333444', email: 'meena@test.com'
    }
  ];

  filteredCustomers: IndianCustomer[] = [...this.customers];

  searchCustomers() {
    this.filteredCustomers = this.customers.filter(c =>
      c.iecCode.includes(this.searchIEC) &&
      c.name.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }

  addConsignee() {
    alert('Add Consignee clicked');
  }

  updateConsignee() {
    alert('Update Consignee clicked');
  }

  deleteConsignee() {
    alert('Delete Consignee clicked');
  }

  reset() {
    this.searchIEC = '';
    this.searchName = '';
    this.searchIdType = '';
    this.filteredCustomers = [...this.customers];
  }
}
