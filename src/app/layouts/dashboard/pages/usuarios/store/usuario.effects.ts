import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsuarioActions } from './usuario.actions';
import { UsuariosService } from '../services/usuarios.service';


@Injectable()
export class UsuarioEffects {

  loadUsuarios$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsuarioActions.loadUsuarios),
      concatMap(() =>
        
        this.usuariosService.getUsuarios().pipe(
          map(data => UsuarioActions.loadUsuariosSuccess({ data })),
          catchError(error => of(UsuarioActions.loadUsuariosFailure({ error }))))
      )
    );
  });

  createUsuario$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsuarioActions.createUsuario),
      concatMap((action) =>
        
        this.usuariosService.createUsuario(action.payload).pipe(
          map(data => UsuarioActions.createUsuarioSuccess({ data })),
          catchError(error => of(UsuarioActions.createUsuarioFailure({ error }))))
      )
    );
  });

  deleteUsuario$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsuarioActions.deleteUsuario),
      concatMap((action) =>
        
        this.usuariosService.deleteUsuario(action.id).pipe(
          map(data => UsuarioActions.deleteUsuarioSuccess({ data })),
          catchError(error => of(UsuarioActions.deleteUsuarioFailure({ error }))))
      )
    );
  });

  updateUsuario$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsuarioActions.updateUsuario),
      concatMap((action) =>
        
        this.usuariosService.updateUsuario(action.id, action.payload).pipe(
          map(data => UsuarioActions.updateUsuarioSuccess({ data })),
          catchError(error => of(UsuarioActions.updateUsuarioFailure({ error }))))
      )
    );
  });

  loadUsuarioPorId$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsuarioActions.loadUsuarioPorId),
      concatMap(action =>
        this.usuariosService.getUsuarioPorId(action.id).pipe(
          map(data => UsuarioActions.loadUsuarioPorIdSuccess({data: data || null})),
          catchError(error => of(UsuarioActions.loadUsuarioPorIdFailure({ error }))))
        )
      );
    });

  constructor(
    private actions$: Actions,
    private usuariosService: UsuariosService
  ) {}
}
