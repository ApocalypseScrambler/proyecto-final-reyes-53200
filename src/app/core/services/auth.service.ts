import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  switchMap,
  of,
  combineLatest,
  map
} from 'rxjs';
import { Router } from '@angular/router';
import { UsuariosService } from '../../layouts/dashboard/pages/usuarios/services/usuarios.service';
import { IUsuario } from '../../layouts/dashboard/pages/usuarios/models';
import { Store } from '@ngrx/store';
import {
  authIsLogin,
  authUserLogin,
  authRolLogin,
} from '../../store/auth/auth.selectors';
import { authActions } from '../../store/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private usuarios: IUsuario[] = [];
  isLogin$: Observable<boolean>;
  userLogin$: Observable<string | null>;
  rolLogin$: Observable<string | null>;

  constructor(
    private router: Router,
    private usuariosService: UsuariosService,
    private store: Store
  ) {
    this.isLogin$ = this.store.select(authIsLogin);
    this.userLogin$ = this.store.select(authUserLogin);
    this.rolLogin$ = this.store.select(authRolLogin);
  }

  obtenerUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
    });
  }

  verifyToken(): boolean {
    const user = localStorage.getItem('user');
    const rol = localStorage.getItem('rol');
    
    let userLogin: string | null = null;
    let rolLogin: string | null = null;
    
    this.userLogin$.subscribe(value => userLogin = value);
    this.rolLogin$.subscribe(value => rolLogin = value);

    if (user && rol) {
      if (userLogin === null && rolLogin === null) {
        this.store.dispatch(authActions.login({ username: user, rol: rol }));
      }
      return true;
    } else {
      return false;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this.usuariosService.getUsuarios().pipe(
      switchMap((usuarios) => {
        const isAuthenticated = usuarios.some(
          (usuario) =>
            usuario.usuario === username && usuario.password === password
        );

        if (isAuthenticated) {
          const adminUser = usuarios.find(
            (usuario) => usuario.usuario === username && usuario.rol === 'ADMIN'
          );
          const rol = adminUser ? 'ADMIN' : 'USER';
          const userData = {
            usuario: username,
            rol: rol,
          };
          this.userDataSubject.next(userData);

          localStorage.setItem('user', userData.usuario);
          localStorage.setItem('rol', userData.rol);

          this.store.dispatch(authActions.login({ username, rol }));
          return of(true);
        } else {
          return of(false);
        }
      })
    );
  }

  getUserData(): Observable<{ usuario: string | null; rol: string | null }> {
    return combineLatest([this.userLogin$, this.rolLogin$]).pipe(
      map(([usuario, rol]) => ({ usuario, rol }))
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    this.store.dispatch(authActions.logout());
    this.router.navigate(['']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin$;
  }

}
