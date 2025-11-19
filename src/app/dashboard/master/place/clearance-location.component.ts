import { Component } from '@angular/core';

interface ClearanceLocation {
  transitType: string;
  country: string;
  state: string;
  portName: string;
  portCode: string;
}

@Component({
  selector: 'app-clearance-location',
  templateUrl: './clearance-location.component.html',
  styleUrls: ['./clearance-location.component.css']
})
export class ClearanceLocationComponent {
  clearance: ClearanceLocation = {
    transitType: '',
    country: '',
    state: '',
    portName: '',
    portCode: ''
  };

  clearanceList: ClearanceLocation[] = [];
  selected: ClearanceLocation | null = null;

  transitTypes: string[] = ['Air', 'Sea', 'Land'];
  states: string[] = ['Tamil Nadu', 'Maharashtra', 'Delhi', 'Karnataka'];

  save() {
    this.clearanceList.push({ ...this.clearance });
    this.refresh();
  }

  update() {
    if (this.selected) {
      Object.assign(this.selected, this.clearance);
      this.refresh();
    }
  }

  delete() {
    if (this.selected) {
      this.clearanceList = this.clearanceList.filter(c => c !== this.selected);
      this.refresh();
    }
  }

  refresh() {
    this.clearance = { transitType: '', country: '', state: '', portName: '', portCode: '' };
    this.selected = null;
  }

  selectRow(c: ClearanceLocation) {
    this.selected = c;
    this.clearance = { ...c };
  }

  export() {
    // Export CSV placeholder
    alert('Export functionality coming soon!');
  }
}
