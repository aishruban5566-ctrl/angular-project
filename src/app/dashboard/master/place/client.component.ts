import { Component } from '@angular/core';

interface Client {
  branchName: string;
  organizationName: string;
  clientName: string;
  clientCode: string;
  clientCountry: string;
  clientState: string;
  address1: string;
  address2: string;
  address3: string;
  pincode: string;
  ownerEmail: string;
  contactNo: string;
  contactPerson: string;
  panNo: string;
  gstNo: string;
  operationEmail: string;
  csEmail: string;
  billingEmail: string;
  creditLimit: number | null;
  openingBalance: number | null;
  creditDays: number | null;
  leftoverAmount: number | null;
  awbPrefix: string;
  activeStatus: string;
  gstBillStatus: string;
  webStatus: string;
  paymentMode: string;
  totalCredit: number | null;
  userName: string;
  password: string;
  salesPerson: string;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  client: Client = this.initClient();
  clientList: Client[] = [];
  selected: Client | null = null;

  branches = ['MUMBAI', 'BANGALORE', 'DELHI'];
  orgs = ['Org1', 'Org2'];
  countries = ['INDIA', 'USA', 'UK'];
  states = ['MAHARASHTRA', 'KARNATAKA', 'TAMILNADU'];

  private initClient(): Client {
    return {
      branchName: '',
      organizationName: '',
      clientName: '',
      clientCode: '',
      clientCountry: '',
      clientState: '',
      address1: '',
      address2: '',
      address3: '',
      pincode: '',
      ownerEmail: '',
      contactNo: '',
      contactPerson: '',
      panNo: '',
      gstNo: '',
      operationEmail: '',
      csEmail: '',
      billingEmail: '',
      creditLimit: null,
      openingBalance: null,
      creditDays: null,
      leftoverAmount: null,
      awbPrefix: '',
      activeStatus: 'YES',
      gstBillStatus: 'YES',
      webStatus: 'YES',
      paymentMode: '',
      totalCredit: null,
      userName: '',
      password: '',
      salesPerson: ''
    };
  }

  save() {
    if (!this.client.clientCode || !this.client.clientState || !this.client.clientCountry) {
      alert('Required fields are missing');
      return;
    }
    this.clientList.push({ ...this.client });
    this.refresh();
  }

  update() {
    if (this.selected) {
      Object.assign(this.selected, this.client);
      this.refresh();
    } else {
      alert('Select a row to update');
    }
  }

  delete() {
    if (this.selected) {
      this.clientList = this.clientList.filter(c => c !== this.selected);
      this.refresh();
    } else {
      alert('Select a row to delete');
    }
  }

  refresh() {
    this.client = this.initClient();
    this.selected = null;
  }

  selectRow(c: Client) {
    this.selected = c;
    this.client = { ...c };
  }

  export() {
    if (this.clientList.length === 0) {
      alert('No data to export');
      return;
    }
    const headers = Object.keys(this.clientList[0]).join(',');
    const rows = this.clientList.map(obj => Object.values(obj).join(','));
    const csvContent = [headers, ...rows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clients.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
