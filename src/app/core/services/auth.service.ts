import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsuariosService } from '../../layouts/dashboard/pages/usuarios/services/usuarios.service';
import { IUsuario } from '../../layouts/dashboard/pages/usuarios/models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAdmin: boolean = false;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private usuarios: IUsuario[] = [];

  constructor(
    private router: Router,
    private usuariosService: UsuariosService
  ) { }
  
  obtenerUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
    });
  }

  verifyToken(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    this.obtenerUsuarios();
    const isAuthenticated = this.usuarios.some((usuario) => usuario.usuario === username && usuario.password === password);
    
    const adminUser = this.usuarios.find((usuario) => usuario.usuario === username && usuario.rol === 'ADMIN');
    this.isAdmin = adminUser !== undefined;

    this.isLoggedInSubject.next(isAuthenticated);
    const userData = { usuario: username, rol: this.isAdmin ? 'ADMIN' : 'USER' };
    this.userDataSubject.next(userData);

    localStorage.setItem('user', userData.usuario);
    localStorage.setItem('rol', userData.rol);

    return this.isLoggedInSubject.asObservable();
  }

  getUserData(): Observable<any> {
    const user = localStorage.getItem('user');
    const rol = localStorage.getItem('rol');
    if (user && rol) {
      this.userDataSubject.next({ usuario: user, rol: rol });
    }
    return this.userDataSubject.asObservable();
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}