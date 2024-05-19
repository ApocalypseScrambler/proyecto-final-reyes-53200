import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';

import { AbmUsuariosComponent } from './componets/abm-usuarios/abm-usuarios.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { UsuarioEffects } from './store/usuario.effects';
import { StoreModule } from '@ngrx/store';
import { usuarioFeature } from './store/usuario.reducer';
@NgModule({
  declarations: [
    UsuariosComponent,
    AbmUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    StoreModule.forFeature(usuarioFeature),
    EffectsModule.forFeature([UsuarioEffects])
  ],
  exports: [UsuariosComponent]
})
export class UsuariosModule { }
