import { Component } from '@angular/core';

interface AuditRecord {
  awbNo: string;
  status: string;
  remarks: string;
  date: string;
}

@Component({
  selector: 'app-awb-auditing',
  templateUrl: './awb-auditing.component.html',
  styleUrls: ['./awb-auditing.component.css']
})
export class AwbAuditingComponent {
  auditList: AuditRecord[] = [];
  model: AuditRecord = { awbNo: '', status: '', remarks: '', date: '' };

  addAudit() {
    if (this.model.awbNo && this.model.status) {
      this.auditList.push({ ...this.model });
      this.model = { awbNo: '', status: '', remarks: '', date: '' };
    }
  }

  deleteAudit(index: number) {
    this.auditList.splice(index, 1);
  }
}
