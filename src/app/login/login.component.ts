import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // Simple check — replace with real auth API call later
    if (this.username === 'admin' && this.password === 'admin') {
      localStorage.setItem('loggedIn', 'true');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid credentials. Try admin / admin');
    }
  }
}
