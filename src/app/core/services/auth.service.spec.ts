import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { UsuariosService } from '../../layouts/dashboard/pages/usuarios/services/usuarios.service';
import { IUsuario } from '../../layouts/dashboard/pages/usuarios/models';
import { HttpClientModule } from '@angular/common/http'; 
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { authActions } from '../../store/auth/auth.actions';
import { authIsLogin, authUserLogin, authRolLogin } from '../../store/auth/auth.selectors';

describe('AuthService', () => {
  let service: AuthService;
  let usuariosService: UsuariosService;
  let store: MockStore;
  const initialState = {
    auth: {
      isLogin: false,
      userLogin: null,
      rolLogin: null,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, StoreModule.forRoot({})],
      providers: [
        AuthService,
        UsuariosService,
        provideMockStore({ initialState }),
      ],
    });
    service = TestBed.inject(AuthService);
    usuariosService = TestBed.inject(UsuariosService);
    store = TestBed.inject(Store) as MockStore;
  });

  it('Debe crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Debería devolver verdadero si el token está presente', () => {
    localStorage.setItem('user', 'test');
    localStorage.setItem('rol', 'ADMIN');
    store.overrideSelector(authUserLogin, null);
    store.overrideSelector(authRolLogin, null);
    const result = service.verifyToken();
    expect(result).toBeTrue();
  });

  it('Debería devolver falso si el token no está presente', () => {
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    const result = service.verifyToken();
    expect(result).toBeFalse();
  });

  it('Debe iniciar sesión correctamente con las credenciales correctas y establecer la propiedad isAdmin', (done: DoneFn) => {
    const mockUsuarios: IUsuario[] = [
      {
        id: '1',
        usuario: 'admin',
        password: 'pass',
        email: 'correo1@mail.com',
        rol: 'ADMIN',
        fecha_creacion: new Date(),
        fecha_modificacion: new Date(),
      },
    ];
    spyOn(usuariosService, 'getUsuarios').and.returnValue(of(mockUsuarios));
    const storeDispatchSpy = spyOn(store, 'dispatch');

    service.login('admin', 'pass').subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBeTrue();
      expect(storeDispatchSpy).toHaveBeenCalledWith(
        authActions.login({ username: 'admin', rol: 'ADMIN' })
      );
      done();
    });
  });

  it('Debería cerrar sesión correctamente y llamar al método router.navigate', () => {
    localStorage.setItem('user', 'test');
    localStorage.setItem('rol', 'ADMIN');
    const storeDispatchSpy = spyOn(store, 'dispatch');
    const SpyOnrouterNavigate = spyOn((service as any).router, 'navigate');

    service.logout();
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('rol')).toBeNull();
    expect(storeDispatchSpy).toHaveBeenCalledWith(authActions.logout());
    expect(SpyOnrouterNavigate).toHaveBeenCalledWith(['']);
  });

  it('Debería obtener datos de usuario del store y configurarlos correctamente', (done: DoneFn) => {
    store.overrideSelector(authUserLogin, 'test');
    store.overrideSelector(authRolLogin, 'ADMIN');

    service.getUserData().subscribe((userData) => {
      expect(userData).toEqual({ usuario: 'test', rol: 'ADMIN' });
      done();
    });
  });
});

