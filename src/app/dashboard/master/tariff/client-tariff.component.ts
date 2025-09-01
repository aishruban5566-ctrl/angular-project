import { Component, OnInit } from '@angular/core';

interface ClientTariff {
  id: number;
  clientName: string;
  tariffRate: number;
  effectiveDate: string;
}

@Component({
  selector: 'app-client-tariff',
  templateUrl: './client-tariff.component.html',
  styleUrls: ['./client-tariff.component.css']
})
export class ClientTariffComponent implements OnInit {

  // ✅ This fixes the error
  clientTariffs: ClientTariff[] = [];

  constructor() {}

  ngOnInit(): void {
    // Dummy data for now (replace with API call later)
    this.clientTariffs = [
      { id: 1, clientName: 'ABC Logistics', tariffRate: 500, effectiveDate: '2025-01-01' },
      { id: 2, clientName: 'XYZ Transport', tariffRate: 750, effectiveDate: '2025-02-15' }
    ];
  }

  deleteClientTariff(id: number): void {
    this.clientTariffs = this.clientTariffs.filter(t => t.id !== id);
  }

}
