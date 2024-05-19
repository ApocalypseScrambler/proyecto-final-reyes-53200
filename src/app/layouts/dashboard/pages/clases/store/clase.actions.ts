import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IClase, ICreateClasePayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const ClaseActions = createActionGroup({
  source: 'Clase',
  events: {
    'Load Clases': emptyProps(),
    'Load Clases Success': props<{ data: IClase[] }>(),
    'Load Clases Failure': props<{ error: unknown }>(),
  
    'Create Clase': props<{ payload: ICreateClasePayload }>(),
    'Create Clase Success': props<{ data: IClase }>(),
    'Create Clase Failure': props<{ error: unknown }>(),

    'Delete Clase': props<{ id: string }>(),
    'Delete Clase Success': props<{ data: IClase }>(),
    'Delete Clase Failure': props<{ error: HttpErrorResponse }>(),

    'Update Clase': props<{ id: string; payload: ICreateClasePayload }>(),
    'Update Clase Success': props<{ data: IClase }>(),
    'Update Clase Failure': props<{ error: HttpErrorResponse }>(),

    'Load Clases por Curso':props<{ nombre: string }>(),
    'Load Clases Por Curso Success': props<{ data: IClase[] }>(),
    'Load Clases Por Curso Failure': props<{ error: any }>(),

    'Load Clase Por Id': props<{ id: string }>(),
    'Load Clase Por Id Success': props<{ data: string }>(),
    'Load Clase Por Id Failure': props<{ error: any }>(),
    
  }
  
});
