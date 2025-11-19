import { Component } from '@angular/core';

@Component({
  selector: 'app-awb-delete',
  templateUrl: './awb-delete.component.html',
  styleUrls: ['./awb-delete.component.css']
})
export class AwbDeleteComponent {
  hawb = {
    hawbNo: '',
    originName: '',
    destinationName: '',
    consignorName: '',
    consigneeName: '',
    clientName: '',
    totalPcs: '',
    totalWgt: '',
    serviceType: ''
  };

  onDelete() {
    if (confirm('Are you sure you want to delete this HAWB?')) {
      console.log('Deleting HAWB:', this.hawb);
      alert('HAWB deleted successfully!');
      this.onClear();
    }
  }

  onClear() {
    this.hawb = {
      hawbNo: '',
      originName: '',
      destinationName: '',
      consignorName: '',
      consigneeName: '',
      clientName: '',
      totalPcs: '',
      totalWgt: '',
      serviceType: ''
    };
  }
}
