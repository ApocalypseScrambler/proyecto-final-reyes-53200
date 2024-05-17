import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlumno from './alumno.reducer';
import { IAlumno } from '../models';

export const selectAlumnoState = createFeatureSelector<fromAlumno.State>(
  fromAlumno.alumnoFeatureKey
);

export const selectAlumnos = createSelector(
  selectAlumnoState,
  (state) => state.alumnos
);

export const selectAlumnoById = (id: string) =>
  createSelector(selectAlumnos, (alumnos: IAlumno[]) =>
    alumnos.find((alumno) => alumno.id === id)
  );

export const selectAlumnosError = createSelector(
  selectAlumnoState,
  (state) => state.error
);
