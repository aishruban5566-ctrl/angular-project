import { Component } from '@angular/core';

@Component({
  selector: 'app-awb-delete',
  templateUrl: './awb-delete.component.html',
  styleUrls: ['./awb-delete.component.css']
})
export class AwbDeleteComponent {
  awbNumber: string = '';
  deletedList: string[] = [];

  deleteAwb() {
    if (this.awbNumber.trim()) {
      this.deletedList.push(this.awbNumber);
      this.awbNumber = '';
    }
  }
}
