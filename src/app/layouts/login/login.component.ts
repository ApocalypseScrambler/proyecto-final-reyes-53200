import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService
      .login(this.username, this.password)
      .subscribe((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.loginError = true;
        } else {
          this.router.navigate(['/home']);
        }
      });
  }
}
