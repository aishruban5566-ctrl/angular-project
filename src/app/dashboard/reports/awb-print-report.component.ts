import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-awb-print-report',
  templateUrl: './awb-print-report.component.html',
  styleUrls: ['./awb-print-report.component.css']
})
export class AwbPrintReportComponent implements OnInit {
  printReportForm!: FormGroup;
  today: Date = new Date();

  branches: string[] = ['-Select-', 'AGARTALA', 'DELHI', 'MUMBAI'];
  clients: string[] = ['-Select-', 'Client A', 'Client B', 'Client C'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.printReportForm = this.fb.group({
      billingBranch: ['-Select-'],
      billingClient: ['-Select-'],
      noOfCopy: [1]
    });
  }

  // Customer Print
  onCustomerPrint(): void {
    const vals = this.printReportForm.value;
    if (vals.billingBranch === '-Select-' || vals.billingClient === '-Select-') {
      alert('⚠ Please select both Branch and Client before printing.');
      return;
    }
    const content = `
      Customer Print Report
      ----------------------
      Branch: ${vals.billingBranch}
      Client: ${vals.billingClient}
      Copies: ${vals.noOfCopy}
      Date: ${this.today.toLocaleDateString()}
    `;

    // Open print window
    const printWin = window.open('', '', 'width=800,height=600');
    if (printWin) {
      printWin.document.write('<pre>' + content + '</pre>');
      printWin.document.close();
      printWin.print();
    }
  }

  // Empty Print
  onEmptyPrint(): void {
    const content = `
      Empty Print Report
      ----------------------
      Date: ${this.today.toLocaleDateString()}
    `;
    const printWin = window.open('', '', 'width=800,height=600');
    if (printWin) {
      printWin.document.write('<pre>' + content + '</pre>');
      printWin.document.close();
      printWin.print();
    }
  }

  // Clear
  onClear(): void {
    this.printReportForm.reset({ billingBranch: '-Select-', billingClient: '-Select-', noOfCopy: 1 });
  }

  // Refresh
  onRefresh(): void {
    window.location.reload();
  }

  // Export (CSV)
  onExport(): void {
    const vals = this.printReportForm.value;
    const rows = [
      ['Branch', 'Client', 'No of Copy', 'Date'],
      [vals.billingBranch, vals.billingClient, vals.noOfCopy, this.today.toLocaleDateString()]
    ];

    let csvContent = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'print-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
