import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './layouts/dashboard/pages/alumnos/alumnos.component';
import { HomeComponent } from './layouts/dashboard/pages/home/home.component';
import { CursosComponent } from './layouts/dashboard/pages/cursos/cursos.component';
import { ClasesComponent } from './layouts/dashboard/pages/clases/clases.component';
import { UsuariosComponent } from './layouts/dashboard/pages/usuarios/usuarios.component';

const routes: Routes = [
  { path: "", component: HomeComponent, data: { titulo: ""}},
  { path: "alumnos", component: AlumnosComponent, data: { titulo: "- Alumnos"}},
  { path: "cursos", component: CursosComponent, data: { titulo: " - Cursos"}},
  { path: "clases", component: ClasesComponent, data: { titulo: " - Clases"}},
  { path: "usuarios", component: UsuariosComponent, data: { titulo: " - Usuarios"}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
