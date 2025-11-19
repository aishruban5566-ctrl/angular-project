import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Department {
  id: number;
  companyName: string;
  departmentName: string;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departmentForm!: FormGroup;
  departments: Department[] = [];
  today: Date = new Date();
  selectedIndex: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.departmentForm = this.fb.group({
      companyName: ['', Validators.required],
      departmentName: ['', Validators.required]
    });

    // Sample data
    this.departments = [
      { id: 1, companyName: 'AV LOGISTICS', departmentName: 'ACCOUNTS' },
      { id: 2, companyName: 'AV LOGISTICS', departmentName: 'BOSS' },
      { id: 3, companyName: 'AV LOGISTICS', departmentName: 'CLEARANCE' },
      { id: 4, companyName: 'AV LOGISTICS', departmentName: 'CUSTOMER SERVICE' },
      { id: 5, companyName: 'AV LOGISTICS', departmentName: 'DELIVERY AGENT' },
      { id: 6, companyName: 'AV LOGISTICS', departmentName: 'HEAD OFFICE' },
      { id: 7, companyName: 'AV LOGISTICS', departmentName: 'MANAGEMENT' },
      { id: 8, companyName: 'AV LOGISTICS', departmentName: 'OPERATION' }
    ];
  }

  save(): void {
    if (this.departmentForm.valid) {
      const newDept: Department = {
        id: this.departments.length + 1,
        companyName: this.departmentForm.value.companyName,
        departmentName: this.departmentForm.value.departmentName
      };
      this.departments.push(newDept);
      this.departmentForm.reset();
    }
  }

  update(): void {
    if (this.selectedIndex !== null && this.departmentForm.valid) {
      this.departments[this.selectedIndex].companyName = this.departmentForm.value.companyName;
      this.departments[this.selectedIndex].departmentName = this.departmentForm.value.departmentName;
      this.selectedIndex = null;
      this.departmentForm.reset();
    }
  }

  delete(index: number): void {
    this.departments.splice(index, 1);
  }

  refresh(): void {
    this.departmentForm.reset();
    this.selectedIndex = null;
  }

  editDepartment(index: number): void {
    this.selectedIndex = index;
    this.departmentForm.patchValue({
      companyName: this.departments[index].companyName,
      departmentName: this.departments[index].departmentName
    });
  }
}
