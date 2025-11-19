import { Component } from '@angular/core';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent {
  flight: any = {
    airline: '',
    flightNo: '',
    airportShipment: '',
    airportArrival: '',
    departureTime: '',
    arrivalTime: ''
  };

  flights: any[] = [];

  airlines: string[] = ['Air India', 'IndiGo', 'SpiceJet', 'Vistara'];
  airports: string[] = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Hyderabad'];

  save() {
    if (this.flight.airline && this.flight.airportShipment && this.flight.airportArrival) {
      this.flights.push({ ...this.flight });
      this.refresh();
    } else {
      alert('Please fill required fields!');
    }
  }

  update() {
    // implement update logic
    alert('Update logic not implemented');
  }

  delete(index?: number) {
    if (index !== undefined) {
      this.flights.splice(index, 1);
    }
  }

  refresh() {
    this.flight = {
      airline: '',
      flightNo: '',
      airportShipment: '',
      airportArrival: '',
      departureTime: '',
      arrivalTime: ''
    };
  }

  edit(index: number) {
    this.flight = { ...this.flights[index] };
  }
}
