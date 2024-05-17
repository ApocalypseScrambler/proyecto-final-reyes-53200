import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { authIsLogin, authUserLogin, authRolLogin } from '../../store/auth/auth.selectors'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showFiller = false;
  titulo: string = '';
  userData: Subscription = new Subscription();
  loadComplete: boolean = false; 
  isLogin$: Observable<boolean>;
  userLogin$: Observable<string | null>;
  rolLogin$: Observable<string | null>;
  
  isMobile(): boolean {
    return window.innerWidth <= 280;
  }

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private authService: AuthService,
    private store: Store,
  ) {
    this.isLogin$ = this.store.select(authIsLogin);
    this.userLogin$ = this.store.select(authUserLogin);
    this.rolLogin$ = this.store.select(authRolLogin);
    };
  
  ngOnInit(): void {
    this.isLoad();
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

  isLoad(): void {
    const user = localStorage.getItem('user');
    const rol = localStorage.getItem('rol');
    if (user && rol) {
      this.loadComplete = true
    } else {
      this.loadComplete = false
    }
    
  }

  logout(): void {
    this.loadComplete = false
    this.authService.logout();
  }
  
}
