import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{
  loginForm: FormGroup;
  loginError: string = '';
  isLoggedIn: boolean = false;
  private subscription: Subscription;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.subscription = this.authService.login(username, password)
        .then(() => {
          this.isLoggedIn = true;
          this.loginError = '';
        })
        .catch((error) => {
          this.isLoggedIn = false;
          this.loginError = error;
        });
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
