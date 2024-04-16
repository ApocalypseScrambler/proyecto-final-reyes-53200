import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeModule } from './pages/home/home.module';
import { CursosModule } from './pages/cursos/cursos.module';
import { ClasesModule } from './pages/clases/clases.module';
import { UsuariosModule } from './pages/usuarios/usuarios.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    SharedModule,
    AlumnosModule,
    HomeModule,
    CursosModule,
    ClasesModule,
    UsuariosModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
