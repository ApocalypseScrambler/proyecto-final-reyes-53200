import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { Subscription, Observable } from 'rxjs';
import { UsuarioRol } from './pages/usuarios/models';

interface UserData {
  usuario: string;
  rol: UsuarioRol;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  showFiller = false;
  titulo: string = '';
  isAuthenticated: boolean = false;
  authSubscription: Subscription;
  userData$?: Observable<UserData>;

  isMobile(): boolean {
    return window.innerWidth <= 280;
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.authSubscription = this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isAuthenticated = loggedIn;
      if (loggedIn) {
        this.userData$ = this.authService.getUserData();
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnInit(): void {
    // Escucha los cambios de ruta y actualiza el título
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      map(route => route.snapshot.data as { titulo: string }) 
    ).subscribe(data => {
      this.titulo = data.titulo;
    });
  }

  logout(): void {
    this.authService.logout();
  }
  
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
