import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  showFiller = false;
  titulo: string = '';

  isMobile(): boolean {
    return window.innerWidth <= 280;
  }
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

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
      map(route => route.snapshot.data as { titulo: string }) // Aquí especificamos el tipo de data
    ).subscribe(data => {
      this.titulo = data.titulo;
    });
  }

}