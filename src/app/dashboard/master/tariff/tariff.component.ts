import { Component } from '@angular/core';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.css']
})
export class TariffComponent {
  activeTab: 'rate' | 'zone' | 'shipper' = 'rate';

  setTab(tab: 'rate' | 'zone' | 'shipper') {
    this.activeTab = tab;
  }
}
