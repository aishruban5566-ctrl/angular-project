import { Component, OnInit } from '@angular/core';

interface Department {
  id: number;
  name: string;
  head: string;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  newDepartment: Department = { id: 0, name: '', head: '' };
  editing: boolean = false;

  ngOnInit(): void {
    // Example data
    this.departments = [
      { id: 1, name: 'Finance', head: 'Mr. Sharma' },
      { id: 2, name: 'HR', head: 'Ms. Priya' },
      { id: 3, name: 'IT', head: 'Mr. Raj' }
    ];
  }

  saveDepartment() {
    if (this.editing) {
      let index = this.departments.findIndex(d => d.id === this.newDepartment.id);
      this.departments[index] = { ...this.newDepartment };
    } else {
      this.newDepartment.id = this.departments.length + 1;
      this.departments.push({ ...this.newDepartment });
    }
    this.cancel();
  }

  editDepartment(dept: Department) {
    this.newDepartment = { ...dept };
    this.editing = true;
  }

  deleteDepartment(id: number) {
    this.departments = this.departments.filter(d => d.id !== id);
  }

  cancel() {
    this.newDepartment = { id: 0, name: '', head: '' };
    this.editing = false;
  }
}
