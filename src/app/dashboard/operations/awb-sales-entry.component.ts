import { Component } from '@angular/core';

interface SalesEntry {
  awbNo: string;
  customer: string;
  amount: number;
  date: string;
}

@Component({
  selector: 'app-awb-sales-entry',
  templateUrl: './awb-sales-entry.component.html',
  styleUrls: ['./awb-sales-entry.component.css']
})
export class AwbSalesEntryComponent {
  salesList: SalesEntry[] = [];
  model: SalesEntry = { awbNo: '', customer: '', amount: 0, date: '' };

  addSale() {
    if (this.model.awbNo && this.model.customer && this.model.amount > 0) {
      this.salesList.push({ ...this.model });
      this.model = { awbNo: '', customer: '', amount: 0, date: '' };
    }
  }
}
