import { Component } from '@angular/core';

@Component({
  selector: 'app-awb-print-report',
  templateUrl: './awb-print-report.component.html',
  styleUrls: ['./awb-print-report.component.css']
})
export class AwbPrintReportComponent {
  awbNumber: string = '';
  reportData: { awb: string; date: string; status: string } | null = null;

  generateReport(): void {
    if (!this.awbNumber.trim()) {
      this.reportData = null;
      return;
    }

    // Mock data generation
    this.reportData = {
      awb: this.awbNumber,
      date: new Date().toLocaleDateString(),
      status: 'Delivered'
    };
  }

  clearForm(): void {
    this.awbNumber = '';
    this.reportData = null;
  }
}
