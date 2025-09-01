import { Component } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent {
  selectedComponent: string | null = null;

  // Open modal with a component name
  openModal(component: string) {
    this.selectedComponent = component;
  }

  // Close modal
  closeModal() {
    this.selectedComponent = null;
  }
}
