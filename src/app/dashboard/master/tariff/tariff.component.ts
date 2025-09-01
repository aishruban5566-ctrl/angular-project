import { Component } from '@angular/core';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.css']
})
export class TariffComponent {
  activeTab: string = 'carrier';

  setTab(tab: string): void {
    this.activeTab = tab;
  }
}
