import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ClaseActions } from './clase.actions';
import { ClasesService } from '../services/clases.service';

@Injectable()
export class ClaseEffects {

  loadClases$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ClaseActions.loadClases),
      concatMap(() =>
        
        this.clasesService.getClases().pipe(
          map(data => ClaseActions.loadClasesSuccess({ data })),
          catchError(error => of(ClaseActions.loadClasesFailure({ error }))))
      )
    );
  });

  createClase$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ClaseActions.createClase),
      concatMap((action) =>
        
        this.clasesService.createClase(action.payload).pipe(
          map(data => ClaseActions.createClaseSuccess({ data })),
          catchError(error => of(ClaseActions.createClaseFailure({ error }))))
      )
    );
  });

  deleteClase$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ClaseActions.deleteClase),
      concatMap((action) =>
        
        this.clasesService.deleteClase(action.id).pipe(
          map(data => ClaseActions.deleteClaseSuccess({ data })),
          catchError(error => of(ClaseActions.deleteClaseFailure({ error }))))
      )
    );
  });

  updateClase$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ClaseActions.updateClase),
      concatMap((action) =>
        
        this.clasesService.updateClase(action.id, action.payload).pipe(
          map(data => ClaseActions.updateClaseSuccess({ data })),
          catchError(error => of(ClaseActions.updateClaseFailure({ error }))))
      )
    );
  });

  loadClasesPorCurso$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ClaseActions.loadClasesPorCurso),
      concatMap(action =>
        this.clasesService.getClasesPorCurso(action.nombre).pipe(
          map(data => ClaseActions.loadClasesPorCursoSuccess({ data })),
          catchError(error => of(ClaseActions.loadClasesPorCursoFailure({ error }))))
        )
      );
    });

    loadClasePorId$ = createEffect(() => {
      return this.actions$.pipe(

        ofType(ClaseActions.loadClasePorId),
        concatMap(action =>
          this.clasesService.getClasesPorId(action.id).pipe(
            map(data => ClaseActions.loadClasePorIdSuccess({ data })),
            catchError(error => of(ClaseActions.loadClasePorIdFailure({ error }))))
          )
        );
      });

  constructor(
    private actions$: Actions,
    private clasesService: ClasesService) {}
}
