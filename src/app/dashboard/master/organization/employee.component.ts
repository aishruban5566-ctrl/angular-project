import { Component } from '@angular/core';

interface Employee {
  employeeName: string;
  organization: string;
  designation: string;
  department: string;
  location: string;
  country: string;
  workLocation: string;
  email: string;
  mobile: string;
  address: string;
  gender: string;
  dob: string;
  doj: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  employee: Employee = this.resetEmployee();
  employees: Employee[] = [];
  editingIndex: number | null = null;

  organizations = ['AV LOGISTICS', 'XYZ ORG', 'ABC GROUP'];
  designations = ['OPS EXECUTIVE', 'CLEARANCE EXECUTIVE', 'MANAGER'];
  departments = ['OPERATION', 'CUSTOMER SERVICE'];
  locations = ['Origin Location', 'Destination Location'];
  countries = ['India', 'USA', 'UK'];
  workLocations = ['Agra', 'Ahmedabad', 'Ambala', 'Andhra Pradesh'];

  resetEmployee(): Employee {
    return {
      employeeName: '',
      organization: '',
      designation: '',
      department: '',
      location: '',
      country: '',
      workLocation: '',
      email: '',
      mobile: '',
      address: '',
      gender: '',
      dob: '',
      doj: '',
      username: '',
      password: ''
    };
  }

  save() {
    if (this.editingIndex !== null) {
      this.employees[this.editingIndex] = { ...this.employee };
      this.editingIndex = null;
    } else {
      this.employees.push({ ...this.employee });
    }
    this.refresh();
  }

  update() {
    if (this.editingIndex !== null) {
      this.employees[this.editingIndex] = { ...this.employee };
      this.editingIndex = null;
      this.refresh();
    }
  }

  delete() {
    if (this.editingIndex !== null) {
      this.employees.splice(this.editingIndex, 1);
      this.editingIndex = null;
      this.refresh();
    }
  }

  refresh() {
    this.employee = this.resetEmployee();
  }

  edit(emp: Employee) {
    this.employee = { ...emp };
    this.editingIndex = this.employees.findIndex(e => e.username === emp.username);
  }

  export() {
    let csv = 'Sl No,Employee Name,Organization,Designation,Department,Location,Country,Work Location,Gender,DOB,DOJ,Email,Mobile,Address,Username\n';
    this.employees.forEach((emp, i) => {
      csv += `${i+1},${emp.employeeName},${emp.organization},${emp.designation},${emp.department},${emp.location},${emp.country},${emp.workLocation},${emp.gender},${emp.dob},${emp.doj},${emp.email},${emp.mobile},${emp.address},${emp.username}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'employees.csv';
    a.click();
  }
}
