import { Component } from '@angular/core';

interface Airline {
  id: number;
  transitType: string;
  companyName: string;
  mawbCode: string;
  website: string;
  airlineCode: string;
  phone: string;
}

@Component({
  selector: 'app-airlines-details',
  templateUrl: './airlines-details.component.html',
  styleUrls: ['./airlines-details.component.css']
})
export class AirlinesDetailsComponent {
  airlines: Airline[] = [];
  newAirline: Airline = {
    id: 0,
    transitType: '',
    companyName: '',
    mawbCode: '',
    website: '',
    airlineCode: '',
    phone: ''
  };

  saveAirline() {
    if (!this.newAirline.companyName || !this.newAirline.airlineCode) return;
    this.newAirline.id = this.airlines.length + 1;
    this.airlines.push({ ...this.newAirline });
    this.resetForm();
  }

  updateAirline() {
    const index = this.airlines.findIndex(a => a.id === this.newAirline.id);
    if (index !== -1) {
      this.airlines[index] = { ...this.newAirline };
      this.resetForm();
    }
  }

  deleteAirline(id: number) {
    this.airlines = this.airlines.filter(a => a.id !== id);
  }

  editAirline(airline: Airline) {
    this.newAirline = { ...airline };
  }

  resetForm() {
    this.newAirline = {
      id: 0,
      transitType: '',
      companyName: '',
      mawbCode: '',
      website: '',
      airlineCode: '',
      phone: ''
    };
  }
}
