import { createFeature, createReducer, on } from '@ngrx/store';
import { AlumnoActions } from './alumno.actions';
import { IAlumno } from '../models';

export const alumnoFeatureKey = 'alumno';

export interface State {
  alumnos: IAlumno[];
  error: unknown;
  loading: boolean;
}

export const initialState: State = {
  alumnos: [],
  error: null,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  // Load Alumnos
  on(AlumnoActions.loadAlumnos, state => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(AlumnoActions.loadAlumnosSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      alumnos: action.data,
    }
  }),
  on(AlumnoActions.loadAlumnosFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    }
  }),

  // Create Alumno
  on(AlumnoActions.createAlumno, state => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(AlumnoActions.createAlumnoSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      alumnos: [...state.alumnos, action.data]
  }
}),
  on(AlumnoActions.createAlumnoFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    }
  }),

  // Delete Alumno
  on(AlumnoActions.deleteAlumno, state => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(AlumnoActions.deleteAlumnoSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      alumnos: state.alumnos.filter((el) => el.id !== action.data.id),
    }
  }),
  on(AlumnoActions.deleteAlumnoFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    }
  }),

  // Update Alumno
  on(AlumnoActions.updateAlumno, state => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(AlumnoActions.updateAlumnoSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      alumnos: state.alumnos.map(el => el.id === action.data.id ? action.data : el),
    }
  }),
  on(AlumnoActions.updateAlumnoFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    }
  }),

);

export const alumnoFeature = createFeature({
  name: alumnoFeatureKey,
  reducer,
});

