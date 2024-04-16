import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';

import { AbmCursosComponent } from './components/abm-cursos/abm-cursos.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [
    CursosComponent,
    AbmCursosComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedModule
  ],
  exports: [CursosComponent]
})
export class CursosModule { }
