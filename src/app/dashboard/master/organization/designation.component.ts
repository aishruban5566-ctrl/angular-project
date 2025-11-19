import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Designation {
  id: number;
  name: string;
}

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {
  designationForm!: FormGroup;
  designations: Designation[] = [];
  today: Date = new Date();
  editIndex: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.designationForm = this.fb.group({
      name: ['', Validators.required]
    });

    // Mock data
    this.designations = [
      { id: 1, name: 'ACCOUNTS MANAGER' },
      { id: 2, name: 'BOSS' },
      { id: 3, name: 'BRANCH-IN-CHARGES' },
      { id: 4, name: 'CLEARANCE EXECUTIVE - BLR' },
      { id: 5, name: 'CLEARANCE EXECUTIVE - MAA' },
      { id: 6, name: 'CLEARANCE INCHARGE - BLR' },
      { id: 7, name: 'CLEARANCE INCHARGE - MAA' },
      { id: 8, name: 'CS MANAGER' },
      { id: 9, name: 'CUSTOMER SERVICE' }
    ];
  }

  save(): void {
    if (this.designationForm.valid) {
      const newDesignation: Designation = {
        id: this.designations.length + 1,
        name: this.designationForm.value.name
      };
      this.designations.push(newDesignation);
      this.designationForm.reset();
    }
  }

  update(): void {
    if (this.editIndex !== null && this.designationForm.valid) {
      this.designations[this.editIndex].name = this.designationForm.value.name;
      this.editIndex = null;
      this.designationForm.reset();
    }
  }

  delete(index: number): void {
    this.designations.splice(index, 1);
  }

  refresh(): void {
    this.designationForm.reset();
    this.editIndex = null;
  }

  editDesignation(index: number): void {
    this.editIndex = index;
    this.designationForm.patchValue({
      name: this.designations[index].name
    });
  }
}
