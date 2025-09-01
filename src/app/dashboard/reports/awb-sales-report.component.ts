import { Component } from '@angular/core';

interface SalesRecord {
  id: number;
  date: string;
  amount: number;
}

@Component({
  selector: 'app-awb-sales-report',
  templateUrl: './awb-sales-report.component.html',
  styleUrls: ['./awb-sales-report.component.css']
})
export class AwbSalesReportComponent {
  fromDate: string = '';
  toDate: string = '';
  salesData: SalesRecord[] = [];

  generateSalesReport(): void {
    if (!this.fromDate || !this.toDate) {
      this.salesData = [];
      return;
    }

    // Mock data for demonstration
    this.salesData = [
      { id: 1, date: this.fromDate, amount: 5000 },
      { id: 2, date: this.toDate, amount: 3000 }
    ];
  }

  clearReport(): void {
    this.fromDate = '';
    this.toDate = '';
    this.salesData = [];
  }
}
