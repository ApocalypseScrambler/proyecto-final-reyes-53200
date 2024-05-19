import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUsuario, ICreateUsuarioPayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const UsuarioActions = createActionGroup({
  source: 'Usuario',
  events: {
    'Load Usuarios': emptyProps(),
    'Load Usuarios Success': props<{ data: IUsuario[] }>(),
    'Load Usuarios Failure': props<{ error: unknown }>(),
  
    'Create Usuario': props<{ payload: ICreateUsuarioPayload }>(),
    'Create Usuario Success': props<{ data: IUsuario }>(),
    'Create Usuario Failure': props<{ error: unknown }>(),

    'Delete Usuario': props<{ id: string }>(),
    'Delete Usuario Success': props<{ data: IUsuario }>(),
    'Delete Usuario Failure': props<{ error: HttpErrorResponse }>(),

    'Update Usuario': props<{ id: string; payload: ICreateUsuarioPayload }>(),
    'Update Usuario Success': props<{ data: IUsuario }>(),
    'Update Usuario Failure': props<{ error: HttpErrorResponse }>(),

    'Load Usuario por Id':props<{ id: string }>(),
    'Load Usuario Por Id Success': props<{ data: IUsuario | null }>(),
    'Load Usuario Por Id Failure': props<{ error: any }>(),
  }
});
