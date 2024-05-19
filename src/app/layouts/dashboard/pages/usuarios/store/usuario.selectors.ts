import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsuario from './usuario.reducer';

export const selectUsuarioState = createFeatureSelector<fromUsuario.State>(
  fromUsuario.usuarioFeatureKey
);

export const selectUsuarios = createSelector(
  selectUsuarioState,
  (state) => state.usuarios
);

export const selectUsuariosLoading = createSelector (
  selectUsuarioState,
  (state) => state.loading
);

export const selectUsuariosError = createSelector(
  selectUsuarioState,
  (state) => state.error
);

export const selectUsuario = createSelector(
  selectUsuarioState,
  (state) => state.usuario
);