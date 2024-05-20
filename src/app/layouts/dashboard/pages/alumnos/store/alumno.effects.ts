import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlumnoActions } from './alumno.actions';
import { AlumnosService } from '../services/alumnos.service';

@Injectable()
export class AlumnoEffects {

  loadAlumnos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AlumnoActions.loadAlumnos),
      concatMap(() =>
        
        this.alumnosService.getAlumnos().pipe(
          map(data => AlumnoActions.loadAlumnosSuccess({ data })),
          catchError(error => of(AlumnoActions.loadAlumnosFailure({ error }))))
      )
    );
  });

  createAlumno$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AlumnoActions.createAlumno),
      concatMap((action) =>
        
        this.alumnosService.createAlumno(action.payload).pipe(
          map(data => AlumnoActions.createAlumnoSuccess({ data })),
          catchError(error => of(AlumnoActions.createAlumnoFailure({ error }))))
      )
    );
  });

  deleteAlumno$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AlumnoActions.deleteAlumno),
      concatMap((action) =>
        
        this.alumnosService.deleteAlumno(action.id).pipe(
          map(data => AlumnoActions.deleteAlumnoSuccess({ data })),
          catchError(error => of(AlumnoActions.deleteAlumnoFailure({ error }))))
      )
    );
  });

  updateAlumno$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AlumnoActions.updateAlumno),
      concatMap((action) =>
        
        this.alumnosService.updateAlumno(action.id, action.payload).pipe(
          map(data => AlumnoActions.updateAlumnoSuccess({ data })),
          catchError(error => of(AlumnoActions.updateAlumnoFailure({ error }))))
      )
    );
  });

  // loadAlumnosByClase$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(AlumnoActions.loadAlumnosByClase),
  //     concatMap(() =>
        
  //       this.alumnosService.getAlumnos().pipe(
  //         map(data => AlumnoActions.loadAlumnosSuccess({ data })),
  //         catchError(error => of(AlumnoActions.loadAlumnosFailure({ error }))))
  //     )
  //   );
  // });

  constructor(
    private actions$: Actions,
    private alumnosService: AlumnosService,
  ) {}
}
