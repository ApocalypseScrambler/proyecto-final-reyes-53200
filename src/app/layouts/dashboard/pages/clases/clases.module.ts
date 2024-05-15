import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasesRoutingModule } from './clases-routing.module';
import { ClasesComponent } from './clases.component';

import { AbmClasesComponent } from './components/abm-clases/abm-clases.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AbmClasesAlumnosComponent } from './components/abm-clases-alumnos/abm-clases-alumnos.component';

@NgModule({
  declarations: [
    ClasesComponent,
    AbmClasesComponent,
    AbmClasesAlumnosComponent
  ],
  imports: [
    CommonModule,
    ClasesRoutingModule,
    SharedModule
  ],
  exports: [ClasesComponent]
})
export class ClasesModule { }
