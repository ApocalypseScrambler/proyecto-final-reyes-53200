import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';

import { AbmUsuariosComponent } from './componets/abm-usuarios/abm-usuarios.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [
    UsuariosComponent,
    AbmUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule
  ],
  exports: [UsuariosComponent]
})
export class UsuariosModule { }
