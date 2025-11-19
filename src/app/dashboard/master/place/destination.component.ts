import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Destination {
  id: number;
  deliveryAreaName: string;
  codeName: string;
}

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  destinationForm!: FormGroup;
  destinations: Destination[] = [];
  selectedIndex: number | null = null;
  today: string = new Date().toISOString().slice(0, 10);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.destinationForm = this.fb.group({
      deliveryAreaName: ['', Validators.required],
      codeName: ['', Validators.required]
    });

    // Example default data
    this.destinations = [
      { id: 1, deliveryAreaName: 'AGARTALA', codeName: 'AGT' },
      { id: 2, deliveryAreaName: 'AGRA', codeName: 'AGRA' },
      { id: 3, deliveryAreaName: 'AHD', codeName: 'A' },
      { id: 4, deliveryAreaName: 'AHMEDABAD', codeName: 'CHAIN SINGH' },
      { id: 5, deliveryAreaName: 'AMBALA', codeName: 'AMBALA' }
    ];
  }

  saveDestination() {
    if (this.destinationForm.valid) {
      const newDest: Destination = {
        id: this.destinations.length + 1,
        ...this.destinationForm.value
      };
      this.destinations.push(newDest);
      this.destinationForm.reset();
    }
  }

  updateDestination() {
    if (this.selectedIndex !== null && this.destinationForm.valid) {
      this.destinations[this.selectedIndex] = {
        ...this.destinations[this.selectedIndex],
        ...this.destinationForm.value
      };
      this.selectedIndex = null;
      this.destinationForm.reset();
    }
  }

  deleteDestination(index: number) {
    this.destinations.splice(index, 1);
    this.selectedIndex = null;
    this.destinationForm.reset();
  }

  editDestination(index: number) {
    this.selectedIndex = index;
    const dest = this.destinations[index];
    this.destinationForm.patchValue({
      deliveryAreaName: dest.deliveryAreaName,
      codeName: dest.codeName
    });
  }

  refreshForm() {
    this.destinationForm.reset();
    this.selectedIndex = null;
  }
}
