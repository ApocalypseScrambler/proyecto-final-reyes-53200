import { createFeature, createReducer, on } from '@ngrx/store';
import { ClaseActions } from './clase.actions';
import { IClase } from '../models';

export const claseFeatureKey = 'clase';

export interface State {
  clases: IClase[];
  clase: string | null;
  error: unknown;
  loading: boolean;
}

export const initialState: State = {
  clases: [],
  clase: null,
  error: null,
  loading: false,
};

export const reducer = createReducer(
  initialState,

  // Load Clases
  on(ClaseActions.loadClases, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(ClaseActions.loadClasesSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      clases: action.data,
    };
  }),
  on(ClaseActions.loadClasesFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  // Create Clase
  on(ClaseActions.createClase, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(ClaseActions.createClaseSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      clases: [...state.clases, action.data],
    };
  }),
  on(ClaseActions.createClaseFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  // Delete Clase
  on(ClaseActions.deleteClase, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(ClaseActions.deleteClaseSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      clases: state.clases.filter((el) => el.id !== action.data.id),
    };
  }),
  on(ClaseActions.deleteClaseFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  // Update Clase
  on(ClaseActions.updateClase, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(ClaseActions.updateClaseSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      clases: state.clases.map((el) =>
        el.id === action.data.id ? action.data : el
      ),
    };
  }),
  on(ClaseActions.updateClaseFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  // Load Clases por Curso
  on(ClaseActions.loadClasesPorCursoSuccess, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(ClaseActions.loadClasesPorCursoSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      clases: action.data,
    };
  }),
  on(ClaseActions.loadClasesPorCursoFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  // Load Clases por Id
  on(ClaseActions.loadClasePorId, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(ClaseActions.loadClasePorIdSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      clase: action.data,
    };
  }),
  on(ClaseActions.loadClasePorIdFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      clases: action.error,
    };
  })
);

export const claseFeature = createFeature({
  name: claseFeatureKey,
  reducer,
});
