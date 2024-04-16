import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasesRoutingModule } from './clases-routing.module';
import { ClasesComponent } from './clases.component';

import { AbmClasesComponent } from './components/abm-clases/abm-clases.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [
    ClasesComponent,
    AbmClasesComponent
  ],
  imports: [
    CommonModule,
    ClasesRoutingModule,
    SharedModule
  ],
  exports: [ClasesComponent]
})
export class ClasesModule { }
