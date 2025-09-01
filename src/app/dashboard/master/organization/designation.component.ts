import { Component, OnInit } from '@angular/core';

interface Designation {
  id: number;
  title: string;
  level: string;
}

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {
  designations: Designation[] = [];
  newDesignation: Designation = { id: 0, title: '', level: '' };
  editing: boolean = false;

  ngOnInit(): void {
    // Example data
    this.designations = [
      { id: 1, title: 'Manager', level: 'Senior' },
      { id: 2, title: 'Team Lead', level: 'Mid' },
      { id: 3, title: 'Developer', level: 'Junior' }
    ];
  }

  saveDesignation() {
    if (this.editing) {
      let index = this.designations.findIndex(d => d.id === this.newDesignation.id);
      this.designations[index] = { ...this.newDesignation };
    } else {
      this.newDesignation.id = this.designations.length + 1;
      this.designations.push({ ...this.newDesignation });
    }
    this.cancel();
  }

  editDesignation(des: Designation) {
    this.newDesignation = { ...des };
    this.editing = true;
  }

  deleteDesignation(id: number) {
    this.designations = this.designations.filter(d => d.id !== id);
  }

  cancel() {
    this.newDesignation = { id: 0, title: '', level: '' };
    this.editing = false;
  }
}
