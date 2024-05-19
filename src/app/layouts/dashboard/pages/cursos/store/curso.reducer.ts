import { createFeature, createReducer, on } from '@ngrx/store';
import { CursoActions } from './curso.actions';
import { ICurso } from '../models';

export const cursoFeatureKey = 'curso';

export interface State {
  cursos: ICurso[];
  error: unknown;
  loading: boolean;
}

export const initialState: State = {
  cursos: [],
  error: null,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  
  // Load Cursos
  on(CursoActions.loadCursos, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(CursoActions.loadCursosSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      cursos: action.data,
    };
  }),
  on(CursoActions.loadCursosFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  // Create Curso
  on(CursoActions.createCurso, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(CursoActions.createCursoSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      cursos: [...state.cursos, action.data],
    };
  }),
  on(CursoActions.createCursoFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  // Delete Curso
  on(CursoActions.deleteCurso, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(CursoActions.deleteCursoSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      cursos: state.cursos.filter((el) => el.id !== action.data.id),
    };
  }),
  on(CursoActions.deleteCursoFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  // Update Curso
  on(CursoActions.updateCurso, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(CursoActions.updateCursoSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      cursos: state.cursos.map((el) =>
        el.id === action.data.id ? action.data : el
      ),
    };
  }),
  on(CursoActions.updateCursoFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);

export const cursoFeature = createFeature({
  name: cursoFeatureKey,
  reducer,
});

