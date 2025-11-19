import { Component } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  activeTab: 'type' | 'name' = 'type';

  setTab(tab: 'type' | 'name') {
    this.activeTab = tab;
  }
}
