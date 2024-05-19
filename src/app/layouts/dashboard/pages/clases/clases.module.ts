import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasesRoutingModule } from './clases-routing.module';
import { ClasesComponent } from './clases.component';

import { AbmClasesComponent } from './components/abm-clases/abm-clases.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AbmClasesAlumnosComponent } from './components/abm-clases-alumnos/abm-clases-alumnos.component';
import { EffectsModule } from '@ngrx/effects';
import { ClaseEffects } from './store/clase.effects';
import { StoreModule } from '@ngrx/store';
import { claseFeature } from './store/clase.reducer';

@NgModule({
  declarations: [
    ClasesComponent,
    AbmClasesComponent,
    AbmClasesAlumnosComponent
  ],
  imports: [
    CommonModule,
    ClasesRoutingModule,
    SharedModule,
    StoreModule.forFeature(claseFeature),
    EffectsModule.forFeature([ClaseEffects])
  ],
  exports: [ClasesComponent]
})
export class ClasesModule { }
