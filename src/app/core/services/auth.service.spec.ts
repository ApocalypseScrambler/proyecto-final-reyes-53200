import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { UsuariosService } from '../../layouts/dashboard/pages/usuarios/services/usuarios.service';
import { IUsuario } from '../../layouts/dashboard/pages/usuarios/models';
import { HttpClientModule } from '@angular/common/http'; 

describe('AuthService', () => {
  let service: AuthService;
  let usuariosService: UsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [AuthService, UsuariosService],
    });
    service = TestBed.inject(AuthService);
    usuariosService = TestBed.inject(UsuariosService);
  });

  it('Debe crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Debería devolver verdadero si el token está presente', () => {
    localStorage.setItem('user', 'test');
    const result = service.verifyToken();
    expect(result).toBeTrue();
  });

  it('Debería devolver falso si el token no está presente', () => {
    localStorage.removeItem('user');
    const result = service.verifyToken();
    expect(result).toBeFalse();
  });

  it('Debe iniciar sesión correctamente con las credenciales correctas y establecer la propiedad isAdmin', (done: DoneFn) => {
    const mockUsuarios: IUsuario[] = [
        {
            "id": "1",
            "usuario": "admin",
            "password": "pass",
            "email": "correo1@mail.com",
            "rol": "ADMIN",
            "fecha_creacion": new Date(),
            "fecha_modificacion": new Date()
          },
    ];
    spyOn(usuariosService, 'getUsuarios').and.returnValue(of(mockUsuarios));

    service.login('admin', 'pass').subscribe(() => {
      expect((service as any).isAdmin).toBeTrue(); 
      done();
    });
  });

  it('Debería cerrar sesión correctamente y llamar al método router.navigate', () => {
    localStorage.setItem('user', 'test');
    localStorage.setItem('rol', 'ADMIN');
    const isLoggedInSubjectNextSpy = spyOn((service as any).isLoggedInSubject, 'next'); 
    const SpyOnrouterNavigate = spyOn((service as any).router, 'navigate'); 
    service.logout();
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('rol')).toBeNull();
    expect(isLoggedInSubjectNextSpy).toHaveBeenCalledWith(false);
    expect(SpyOnrouterNavigate).toHaveBeenCalledWith(['']);
  });

  it('Debería obtener datos de usuario de localStorage y configurar userDataSubject', (done: DoneFn) => {
    localStorage.setItem('user', 'test');
    localStorage.setItem('rol', 'ADMIN');
    service.getUserData().subscribe(() => {
      expect((service as any).userDataSubject.getValue()).toEqual({ usuario: 'test', rol: 'ADMIN' }); // Acceder a propiedad privada
      done();
    });
  });
});
