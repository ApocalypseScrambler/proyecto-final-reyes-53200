import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAdmin: boolean = false;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private router: Router) { }

  login(username: string, password: string): Observable<boolean> {
    const isAuthenticated = (username === 'user' && password === 'pass') || (username === 'admin' && password === 'pass');
    if (username === "admin") {
      this.isAdmin = true
    }
    this.isLoggedInSubject.next(isAuthenticated);
    const userData = { usuario: username, rol: this.isAdmin ? 'ADMIN' : 'USER' };
    this.userDataSubject.next(userData);

    return this.isLoggedInSubject.asObservable();
  }

  getUserData(): Observable<any> {
    return this.userDataSubject.asObservable();
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.router.navigate(['']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}