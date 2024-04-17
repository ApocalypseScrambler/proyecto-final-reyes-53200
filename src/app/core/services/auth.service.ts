import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  private isAdmin: boolean = false;

  login(usuario: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      
      setTimeout(() => {
        if (usuario === 'usuario' && password === 'contraseña') {
          this.isAuthenticated = true;
          resolve(true); // Inicio de sesión exitoso
        } else {
          this.isAuthenticated = false;
          reject('Credenciales inválidas'); // Inicio de sesión fallido
        }
      }, 1000); // Simulamos una demora de 1 segundo
    });
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
