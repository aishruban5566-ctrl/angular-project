import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-awb-sales-report',
  templateUrl: './awb-sales-report.component.html',
  styleUrls: ['./awb-sales-report.component.css']
})
export class AwbSalesReportComponent implements OnInit {
  reportForm!: FormGroup;
  reports: any[] = [];
  today: Date = new Date();   // ✅ Fix for error

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      originBranch: [''],
      billingBranch: [''],
      billingClient: [''],
      destinationLoc: [''],
      serviceType: [''],
      documentType: [''],
      paymentMode: ['']
    });

    // initial dummy data
    this.reports = [
      { id: 1, origin: 'DELHI', dest: 'MUMBAI', client: 'Client A', amount: 2000, date: '2025-09-10' },
      { id: 2, origin: 'AGARTALA', dest: 'DELHI', client: 'Client B', amount: 1500, date: '2025-09-11' }
    ];
  }

  // ✅ Show Report (apply filters)
  showReport(): void {
    const filters = this.reportForm.value;
    console.log('Filters:', filters);

    // here filter from reports (dummy example)
    this.reports = this.reports.filter(r => {
      const matchClient = !filters.billingClient || r.client === filters.billingClient;
      const matchOrigin = !filters.originBranch || r.origin === filters.originBranch;
      return matchClient && matchOrigin;
    });

    if (this.reports.length === 0) {
      alert('No records found for given filters');
    }
  }

  // ✅ Export Report (CSV)
  exportReport(): void {
    if (this.reports.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(this.reports[0]);
    const rows = this.reports.map(r => headers.map(h => r[h]));
    const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'sales-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // ✅ Print Report
  printReport(): void {
    if (this.reports.length === 0) {
      alert('No data to print');
      return;
    }

    let html = `<h3>Sales Report</h3><table border="1" cellspacing="0" cellpadding="6"><tr>`;
    Object.keys(this.reports[0]).forEach(h => { html += `<th>${h}</th>`; });
    html += `</tr>`;
    this.reports.forEach(r => {
      html += `<tr>` + Object.values(r).map(v => `<td>${v}</td>`).join('') + `</tr>`;
    });
    html += `</table>`;

    const printWin = window.open('', '', 'width=1000,height=700');
    if (printWin) {
      printWin.document.write(html);
      printWin.document.close();
      printWin.print();
    }
  }

  // ✅ Clear Form
  clearForm(): void {
    this.reportForm.reset();
  }

  // ✅ Refresh (reloads page)
  refresh(): void {
    window.location.reload();
  }
}
