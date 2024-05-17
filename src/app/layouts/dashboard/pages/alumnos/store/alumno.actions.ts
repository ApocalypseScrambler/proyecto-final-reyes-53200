import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAlumno, ICreateAlumnoPayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const AlumnoActions = createActionGroup({
  source: 'Alumno',
  events: {
    'Load Alumnos': emptyProps(),
    'Load Alumnos Success': props<{ data: IAlumno[] }>(),
    'Load Alumnos Failure': props<{ error: unknown }>(),

    'Create Alumno': props<{ payload: ICreateAlumnoPayload }>(),
    'Create Alumno Success': props<{ data: IAlumno }>(),
    'Create Alumno Failure': props<{ error: unknown }>(),

    'Delete Alumno': props<{ id: string }>(),
    'Delete Alumno Success': props<{ data: IAlumno }>(),
    'Delete Alumno Failure': props<{ error: HttpErrorResponse }>(),

    'Update Alumno': props<{ id: string; payload: ICreateAlumnoPayload }>(),
    'Update Alumno Success': props<{ data: IAlumno }>(),
    'Update Alumno Failure': props<{ error: HttpErrorResponse }>(),
  },
});
