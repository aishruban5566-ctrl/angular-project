import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Very simple demo login check; replace with real auth later
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') return true;
    this.router.navigate(['/login']);
    return false;
  }
}
