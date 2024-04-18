import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "../dashboard/pages/home/home.component";
import { AlumnosComponent } from "../dashboard/pages/alumnos/alumnos.component";
import { CursosComponent } from "../dashboard/pages/cursos/cursos.component";
import { ClasesComponent } from './pages/clases/clases.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: "home", component: HomeComponent, 
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    data: { titulo: ""}
  },
  { 
    path: "alumnos", 
    component: AlumnosComponent, 
    loadChildren: () => import('./pages/alumnos/alumnos.module').then((m) => m.AlumnosModule),
    data: { titulo: "- Alumnos"}
  },
  { 
    path: "cursos", 
    component: CursosComponent, 
    loadChildren: () => import('./pages/cursos/cursos.module').then((m) => m.CursosModule),
    data: { titulo: " - Cursos"}
  },
  { 
    path: "clases", 
    component: ClasesComponent, 
    loadChildren: () => import('./pages/clases/clases.module').then((m) => m.ClasesModule),
    data: { titulo: " - Clases"}
  },
  { 
    path: "usuarios", 
    component: UsuariosComponent, 
    loadChildren: () => import('./pages/usuarios/usuarios.module').then((m) => m.UsuariosModule),
    data: { titulo: " - Usuarios"}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
