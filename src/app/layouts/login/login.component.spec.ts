import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; 
import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../core/services/auth.service';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientModule, 
        BrowserAnimationsModule, 
        SharedModule, 
        FormsModule,
        StoreModule.forRoot({}) 
      ],
      providers: [
        AuthService,
        provideMockStore(), 
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería desactivar el botón de inicio de sesión si el nombre de usuario o la contraseña están vacíos', () => {
    component.username = '';
    component.password = '';
    fixture.detectChanges();
    const loginButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(loginButton.disabled).toBeTruthy();
  });

  it('Debería habilitar el botón de inicio de sesión si se proporcionan tanto el nombre de usuario como la contraseña', () => {
    component.username = 'user';
    component.password = 'pass';
    fixture.detectChanges();
    const loginButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(loginButton.disabled).toBeFalsy();
  });

  it('Debería llamar al método de inicio de sesión de AuthService con las credenciales correctas', () => {
    const SpyOnAuthService = spyOn(authService, 'login').and.returnValue(of(true));
    // simulamos un usuario y contraseña válidos
    component.username = 'user';
    component.password = 'pass';
    component.login();
    expect(SpyOnAuthService).toHaveBeenCalledWith('user', 'pass');
  });

  it('Debería mostrar un mensaje de error si falla el inicio de sesión', fakeAsync(() => {
    spyOn(authService, 'login').and.returnValue(of(false));
    // simulamos un usuario y contraseña inválidos
    component.username = 'invalid_user';
    component.password = 'invalid_pass';
    component.login();
    tick(); 
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
  }));
});
