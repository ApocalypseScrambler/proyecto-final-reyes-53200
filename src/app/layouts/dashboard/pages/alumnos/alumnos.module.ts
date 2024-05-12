import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';

import { AbmAlumnosComponent } from './components/abm-alumnos/abm-alumnos.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AbmAlumnoClasesComponent } from './components/abm-alumno-clases/abm-alumno-clases.component';

@NgModule({
  declarations: [
    AlumnosComponent,
    AbmAlumnosComponent,
    AbmAlumnoClasesComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    SharedModule
  ],
  exports: [AlumnosComponent]
})
export class AlumnosModule { }
