import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ParentClient {
  id: number;
  country: string;
  name: string;
  code: string;
  address: string;
  contact: string;
  email: string;
}

@Component({
  selector: 'app-parent-client',
  templateUrl: './parent-client.component.html',
  styleUrls: ['./parent-client.component.css']
})
export class ParentClientComponent implements OnInit {
  clientForm!: FormGroup;
  clients: ParentClient[] = [];
  editIndex: number | null = null;

  countries: string[] = ['India', 'USA', 'UK', 'Germany', 'UAE'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      country: ['', Validators.required],
      name: ['', Validators.required],
      code: ['', Validators.required],
      address: [''],
      contact: [''],
      email: ['', [Validators.email]]
    });
  }

  onSave(): void {
    if (this.clientForm.valid) {
      const newClient: ParentClient = {
        id: this.clients.length + 1,
        ...this.clientForm.value
      };
      this.clients.push(newClient);
      this.clientForm.reset();
    }
  }

  onUpdate(): void {
    if (this.editIndex !== null && this.clientForm.valid) {
      this.clients[this.editIndex] = {
        ...this.clients[this.editIndex],
        ...this.clientForm.value
      };
      this.editIndex = null;
      this.clientForm.reset();
    }
  }

  onEdit(index: number): void {
    this.editIndex = index;
    this.clientForm.patchValue(this.clients[index]);
  }

  onDelete(index: number): void {
    this.clients.splice(index, 1);
  }

  onRefresh(): void {
    this.clientForm.reset();
    this.editIndex = null;
  }
}
