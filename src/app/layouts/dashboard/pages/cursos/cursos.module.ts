import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';

import { AbmCursosComponent } from './components/abm-cursos/abm-cursos.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { CursoEffects } from './store/curso.effects';
import { StoreModule } from '@ngrx/store';
import { cursoFeature } from './store/curso.reducer';
@NgModule({
  declarations: [
    CursosComponent,
    AbmCursosComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedModule,
    StoreModule.forFeature(cursoFeature),
    EffectsModule.forFeature([CursoEffects])
  ],
  exports: [CursosComponent]
})
export class CursosModule { }
