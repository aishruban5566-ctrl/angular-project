import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ZoneTariff {
  zoneName: string;
}

@Component({
  selector: 'app-zone-tariff',
  templateUrl: './zone-tariff.component.html',
  styleUrls: ['./zone-tariff.component.css']
})
export class ZoneTariffComponent {
  zoneForm: FormGroup;
  zoneTariffs: ZoneTariff[] = [];

  constructor(private fb: FormBuilder) {
    this.zoneForm = this.fb.group({
      zoneName: ['', Validators.required]
    });
  }

  save() {
    if (this.zoneForm.valid) {
      this.zoneTariffs.push(this.zoneForm.value);
      this.zoneForm.reset();
    }
  }

  update() {
    alert('Update functionality to be implemented');
  }

  delete() {
    if (this.zoneTariffs.length > 0) {
      this.zoneTariffs.pop();
    }
  }

  refresh() {
    this.zoneForm.reset();
  }
}
