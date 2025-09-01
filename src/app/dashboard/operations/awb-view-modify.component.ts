import { Component } from '@angular/core';

interface AwbRecord {
  awbNo: string;
  consignee: string;
  origin: string;
  destination: string;
}

@Component({
  selector: 'app-awb-view-modify',
  templateUrl: './awb-view-modify.component.html',
  styleUrls: ['./awb-view-modify.component.css']
})
export class AwbViewModifyComponent {
  awbList: AwbRecord[] = [];
  model: AwbRecord = { awbNo: '', consignee: '', origin: '', destination: '' };
  editingIndex: number | null = null;

  addOrUpdate() {
    if (this.editingIndex !== null) {
      this.awbList[this.editingIndex] = { ...this.model };
      this.editingIndex = null;
    } else {
      this.awbList.push({ ...this.model });
    }
    this.model = { awbNo: '', consignee: '', origin: '', destination: '' };
  }

  edit(index: number) {
    this.model = { ...this.awbList[index] };
    this.editingIndex = index;
  }

  delete(index: number) {
    this.awbList.splice(index, 1);
  }
}
