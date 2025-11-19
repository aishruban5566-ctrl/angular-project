import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ClearanceOrg {
  id: number;
  clearanceLocation: string;
  organizationName: string;
  organizationCode: string;
  yearEstablished: string;
  logo: string;
  address: string;
  phone: string;
  website: string;
  mailId: string;
  tin: string;
  pan: string;
}

@Component({
  selector: 'app-clearance-part',
  templateUrl: './clearance-part.component.html',
  styleUrls: ['./clearance-part.component.css']
})
export class ClearancePartComponent implements OnInit {
  today: Date = new Date();
  clearanceForm!: FormGroup;
  organizations: ClearanceOrg[] = [];
  selectedIndex: number | null = null;

  locations = ['Chennai', 'Mumbai', 'Delhi'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clearanceForm = this.fb.group({
      clearanceLocation: ['', Validators.required],
      organizationName: ['', Validators.required],
      organizationCode: ['', Validators.required],
      yearEstablished: ['', Validators.required],
      logo: [''],
      address: [''],
      phone: [''],
      website: [''],
      mailId: [''],
      tin: [''],
      pan: ['']
    });
  }

  saveOrg() {
    if (this.clearanceForm.valid) {
      const newOrg: ClearanceOrg = {
        id: this.organizations.length + 1,
        ...this.clearanceForm.value
      };
      this.organizations.push(newOrg);
      this.clearanceForm.reset();
    }
  }

  updateOrg() {
    if (this.selectedIndex !== null && this.clearanceForm.valid) {
      this.organizations[this.selectedIndex] = {
        ...this.organizations[this.selectedIndex],
        ...this.clearanceForm.value
      };
      this.selectedIndex = null;
      this.clearanceForm.reset();
    }
  }

  editOrg(index: number) {
    this.selectedIndex = index;
    const org = this.organizations[index];
    this.clearanceForm.patchValue(org);
  }

  deleteOrg(index: number) {
    this.organizations.splice(index, 1);
    this.selectedIndex = null;
    this.clearanceForm.reset();
  }

  refreshForm() {
    this.clearanceForm.reset();
    this.selectedIndex = null;
  }
}

