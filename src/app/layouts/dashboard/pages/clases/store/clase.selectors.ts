import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromClase from './clase.reducer';

export const selectClaseState = createFeatureSelector<fromClase.State>(
  fromClase.claseFeatureKey
);

export const selectClases = createSelector(
  selectClaseState,
  (state) => state.clases
);

export const selectClasesLoading = createSelector(
  selectClaseState,
  (state) => state.loading
);

export const selectClasesError = createSelector(
  selectClaseState,
  (state) => state.error
);

export const selectClasesById = (claseId: string) => 
  createSelector(selectClases,
  (clases) => clases.filter(clase => clase?.id === claseId ? clase : null)
);