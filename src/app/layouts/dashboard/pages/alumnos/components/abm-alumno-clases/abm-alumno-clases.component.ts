import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAlumno } from '../../models';
import { ClasesService } from '../../../clases/services/clases.service';
import { of, map, Observable, take, switchMap, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IClase } from '../../../clases/models';
import { Store } from '@ngrx/store';
import { authRolLogin } from '../../../../../../store/auth/auth.selectors';
import { AlumnoActions } from '../../store/alumno.actions';
import { selectAlumnoById } from '../../store/alumno.selectors'
import Swal from 'sweetalert2';
import { selectClases, selectClasesLoading, selectClasesById } from '../../../clases/store/clase.selectors';
import { ClaseActions } from '../../../clases/store/clase.actions';

@Component({
  selector: 'app-abm-alumno-clases',
  templateUrl: './abm-alumno-clases.component.html',
  styleUrl: './abm-alumno-clases.component.scss',
})
export class AbmAlumnoClasesComponent implements OnInit {
  loading$: Observable<boolean>;
  
  clasesFormatted$: Observable<string[]> = of([]);
  alumnoClasesForm: FormGroup;
  rolLogin$: Observable<string | null>;
  alumno$: Observable<IAlumno | undefined>;
  clases$: Observable<IClase[]>;
  combinedClases$: Observable<{ id: string, formatted: string }[]> = of([]);;

  constructor(
    @Inject(MAT_DIALOG_DATA) public alumno: IAlumno,
    public clasesService: ClasesService,
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.rolLogin$ = this.store.select(authRolLogin);
    this.loading$ = this.store.select(selectClasesLoading)
    this.alumno$ = this.store.select(selectAlumnoById(this.alumno.id));
    this.clases$ = this.store.select(selectClases);
    this.alumnoClasesForm = this.formBuilder.group({
      nombre: [''],
    });
    this.updateCombinedClases();
  }

  ngOnInit(): void {
    this.alumno$ = this.store.select(selectAlumnoById(this.alumno.id));
    this.store.dispatch(ClaseActions.loadClases());
  }

  private updateCombinedClases(): void {
    this.combinedClases$ = this.alumno$.pipe(
      switchMap(alumno => {
        if (alumno && alumno.clases) {
          const observables = alumno.clases.map(claseId =>
            this.clasesService.getClasesPorId(claseId)
          );
          return forkJoin(observables).pipe(
            map(clasesFormatted => {
              return alumno.clases.map((claseId, index) => ({
                id: claseId,
                formatted: clasesFormatted[index]
              }));
            })
          );
        } else {
          return of([]);
        }
      })
    );
  }

  onDeleteClase(id: string): void {
    this.alumno$.pipe(take(1)).subscribe(alumno => {
      if (alumno) {
        const alumnoActualizado = {
          ...alumno,
          clases: alumno.clases.filter(claseId => claseId !== id)
        };
        this.store.dispatch(AlumnoActions.updateAlumno({
          id: alumno.id,
          payload: alumnoActualizado
        }));
        this.updateCombinedClases();
      }
    });
  }

  onAgregarClase(): void {
    const claseIdSeleccionada = this.alumnoClasesForm.value.nombre;
    this.alumno$.pipe(take(1)).subscribe(alumno => {
      if (alumno && !alumno.clases.includes(claseIdSeleccionada)) {
        const alumnoActualizado = {
          ...alumno,
          clases: [...alumno.clases, claseIdSeleccionada]
        };
        this.store.dispatch(AlumnoActions.updateAlumno({
          id: alumno.id,
          payload: alumnoActualizado
        }));
      } else {
        Swal.fire({
          title: 'La clase seleccionada ya está agregada al alumno.',
          icon: 'warning',
        });
      }
    });
  }
}
