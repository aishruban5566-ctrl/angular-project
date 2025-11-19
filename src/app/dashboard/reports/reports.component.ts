import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  showSalesReport = false;
  showPrintReport = false;

  // Print Report popup
  openPrintReport() {
    this.showPrintReport = true;
  }
  closePrintReport() {
    this.showPrintReport = false;
  }

  // Sales Report popup
  openSalesReport() {
    this.showSalesReport = true;
  }
  closeSalesReport() {
    this.showSalesReport = false;
  }
}
