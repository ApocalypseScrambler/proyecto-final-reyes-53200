import { createFeature, createReducer, on } from '@ngrx/store';
import { UsuarioActions } from './usuario.actions';
import { IUsuario } from '../models';

export const usuarioFeatureKey = 'usuario';

export interface State {
  usuarios: IUsuario[];
  usuario: IUsuario | null;
  error: unknown;
  loading: boolean;
}

export const initialState: State = {
  usuarios: [],
  usuario: null,
  error: null,
  loading: false,
}; 

export const reducer = createReducer(
  initialState,
  
  // Load Usuarios
  on(UsuarioActions.loadUsuarios, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(UsuarioActions.loadUsuariosSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      usuarios: action.data,
    };
  }),
  on(UsuarioActions.loadUsuariosFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  // Create Usuario
  on(UsuarioActions.createUsuario, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(UsuarioActions.createUsuarioSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      usuarios: [...state.usuarios, action.data],
    };
  }),
  on(UsuarioActions.createUsuarioFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  // Delete Usuario
  on(UsuarioActions.deleteUsuario, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(UsuarioActions.deleteUsuarioSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      usuarios: state.usuarios.filter((el) => el.id !== action.data.id),
    };
  }),
  on(UsuarioActions.deleteUsuarioFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  // Update Usuario
  on(UsuarioActions.updateUsuario, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(UsuarioActions.updateUsuarioSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      usuarios: state.usuarios.map((el) =>
        el.id === action.data.id ? action.data : el
      ),
    };
  }),
  on(UsuarioActions.updateUsuarioFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),


// Load Usuario por Id
on(UsuarioActions.loadUsuarioPorId, (state) => {
  return {
    ...state,
    loading: true,
  }
}),
on(UsuarioActions.loadUsuarioPorIdSuccess, (state, action) => {
  return {
    ...state,
    loading: false,
    clase: action.data,
  };
}),
on(UsuarioActions.loadUsuarioPorIdFailure, (state, action) => {
  return {
    ...state,
    loading: false,
    clases: action.error,
  };
})

);
export const usuarioFeature = createFeature({
  name: usuarioFeatureKey,
  reducer,
});

