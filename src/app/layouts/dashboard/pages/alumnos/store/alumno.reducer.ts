import { createFeature, createReducer, on } from '@ngrx/store';
import { AlumnoActions } from './alumno.actions';
import { IAlumno } from '../models';

export const alumnoFeatureKey = 'alumno';

export interface State {
  alumnos: IAlumno[];
  error: unknown;
}

export const initialState: State = {
  alumnos: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  // Load Alumnos
  on(AlumnoActions.loadAlumnos, state => state),
  on(AlumnoActions.loadAlumnosSuccess, (state, action) => {
    return {
      ...state,
      alumnos: action.data,
    }
  }),
  on(AlumnoActions.loadAlumnosFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    }
  }),

  // Create Alumno
  on(AlumnoActions.createAlumno, state => state),
  on(AlumnoActions.createAlumnoSuccess, (state, action) => {
    return {
      ...state,
      alumnos: [...state.alumnos, action.data]
  }
}),
  on(AlumnoActions.createAlumnoFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    }
  }),

  // Delete Alumno
  on(AlumnoActions.deleteAlumno, state => state),
  on(AlumnoActions.deleteAlumnoSuccess, (state, action) => {
    return {
      ...state,
      alumnos: state.alumnos.filter((el) => el.id !== action.data.id),
    }
  }),
  on(AlumnoActions.deleteAlumnoFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    }
  }),

  // Update Alumno
  on(AlumnoActions.updateAlumno, state => state),
  on(AlumnoActions.updateAlumnoSuccess, (state, action) => {
    return {
      ...state,
      alumnos: state.alumnos.map(el => el.id === action.data.id ? action.data : el),
    }
  }),
  on(AlumnoActions.updateAlumnoFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    }
  }),

);

export const alumnoFeature = createFeature({
  name: alumnoFeatureKey,
  reducer,
});

