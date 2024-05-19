import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CursoActions } from './curso.actions';
import { CursosService } from '../services/cursos.service';

@Injectable()
export class CursoEffects {

  loadCursos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CursoActions.loadCursos),
      concatMap(() =>
        
        this.cursosService.getCursos().pipe(
          map(data => CursoActions.loadCursosSuccess({ data })),
          catchError(error => of(CursoActions.loadCursosFailure({ error }))))
      )
    );
  });

  createCurso$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CursoActions.createCurso),
      concatMap((action) =>
        
        this.cursosService.createCurso(action.payload).pipe(
          map(data => CursoActions.createCursoSuccess({ data })),
          catchError(error => of(CursoActions.createCursoFailure({ error }))))
      )
    );
  });

  deleteCurso$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CursoActions.deleteCurso),
      concatMap((action) =>
        
        this.cursosService.deleteCurso(action.id).pipe(
          map(data => CursoActions.deleteCursoSuccess({ data })),
          catchError(error => of(CursoActions.deleteCursoFailure({ error }))))
      )
    );
  });

  updateCurso$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CursoActions.updateCurso),
      concatMap((action) =>
        
        this.cursosService.updateCurso(action.id, action.payload).pipe(
          map(data => CursoActions.updateCursoSuccess({ data })),
          catchError(error => of(CursoActions.updateCursoFailure({ error }))))
      )
    );
  });


  constructor(
    private actions$: Actions,
    private cursosService: CursosService,) {}
}
