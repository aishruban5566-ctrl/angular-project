import { Component } from '@angular/core';

interface Customer {
  id: number;
  accountNo: string;
  country: string;
  branch: string;
  name: string;
  mobile: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-origin-customer',
  templateUrl: './origin-customer.component.html',
  styleUrls: ['./origin-customer.component.css']
})
export class OriginCustomerComponent {
  searchMobile = '';
  searchName = '';
  searchIdType = '';

  customers: Customer[] = [
    {
      id: 1, accountNo: 'C001', country: 'India', branch: 'Chennai',
      name: 'Ravi Kumar', mobile: '9876543210', address: 'No.12, Street Rd',
      city: 'Chennai', postalCode: '600001', phone: '044-2222333', email: 'ravi@test.com'
    },
    {
      id: 2, accountNo: 'C002', country: 'India', branch: 'Delhi',
      name: 'Sita Devi', mobile: '9123456780', address: '45, Market Rd',
      city: 'Delhi', postalCode: '110001', phone: '011-2222333', email: 'sita@test.com'
    }
  ];

  filteredCustomers: Customer[] = [...this.customers];

  searchCustomers() {
    this.filteredCustomers = this.customers.filter(c =>
      c.mobile.includes(this.searchMobile) &&
      c.name.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }

  addShipper() {
    alert('Add Shipper clicked');
  }

  updateShipper() {
    alert('Update Shipper clicked');
  }

  deleteShipper() {
    alert('Delete Shipper clicked');
  }

  reset() {
    this.searchMobile = '';
    this.searchName = '';
    this.searchIdType = '';
    this.filteredCustomers = [...this.customers];
  }
}
