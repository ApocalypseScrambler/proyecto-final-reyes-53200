import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAlumno, ICreateAlumnoPayload } from '../../../alumnos/models';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { Observable, take } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IClase } from '../../models';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { authRolLogin } from '../../../../../../store/auth/auth.selectors';
import { selectAlumnos, selectAlumnosByClaseId, selectAlumnosLoading } from '../../../alumnos/store/alumno.selectors';
import { AlumnoActions } from '../../../alumnos/store/alumno.actions';

@Component({
  selector: 'app-abm-clases-alumnos',
  templateUrl: './abm-clases-alumnos.component.html',
  styleUrl: './abm-clases-alumnos.component.scss'
})
export class AbmClasesAlumnosComponent implements OnInit {
  alumnosInscritos$: Observable<IAlumno[]>;
  claseAlumnosForm: FormGroup;
  rolLogin$: Observable<string | null>;
  alumnos$: Observable<IAlumno[]>;
  loading$: Observable<boolean>;

  constructor(
    public dialogRef: MatDialogRef<AbmClasesAlumnosComponent>,
    @Inject(MAT_DIALOG_DATA) public clase: IClase,
    private formBuilder: FormBuilder,
    private store: Store,
  ) {
    this.claseAlumnosForm = this.formBuilder.group({
      nombre: ['']
    });
    this.rolLogin$ = this.store.select(authRolLogin);
    this.alumnos$ = this.store.select(selectAlumnos);
    this.alumnosInscritos$ = this.store.select(selectAlumnosByClaseId(this.clase.id));
    this.loading$ = this.store.select(selectAlumnosLoading);
   }

  ngOnInit(): void {
    this.store.dispatch(AlumnoActions.loadAlumnos());
  }

  onDeleteAlumno(alumno: IAlumno): void {
    const claseId = this.clase.id;
    const updatedClases = alumno.clases.filter(id => id !== claseId);
    const payload: ICreateAlumnoPayload = {
      ...alumno, 
      clases: updatedClases
    };
    this.store.dispatch(AlumnoActions.updateAlumno({ id: alumno.id, payload }));
  }

  onAgregarAlumno(): void {
    const alumnoIdSeleccionado = this.claseAlumnosForm.value.nombre;
    const alumnos$ = this.store.select(selectAlumnos);
  
    alumnos$.pipe(take(1)).subscribe(alumnos => {
      const alumnoSeleccionado = alumnos.find(alumno => alumno.id === alumnoIdSeleccionado);
  
      if (alumnoSeleccionado) {
        const claseId = this.clase.id;
        if (!alumnoSeleccionado.clases.includes(claseId)) {
          const updatedClases = [...alumnoSeleccionado.clases, claseId];
  
          const payload: ICreateAlumnoPayload = {
            ...alumnoSeleccionado, 
            clases: updatedClases 
          };
  
          this.store.dispatch(AlumnoActions.updateAlumno({ id: alumnoSeleccionado.id, payload }));
        } else {
          Swal.fire({
            title: 'El alumno ya está inscrito en esta clase.',
            icon: 'warning',
          });
        }
      } else {
        Swal.fire({
          title: 'No se encontró ningún alumno con el nombre seleccionado.',
          icon: 'error',
        });
      }
    });
  }
}