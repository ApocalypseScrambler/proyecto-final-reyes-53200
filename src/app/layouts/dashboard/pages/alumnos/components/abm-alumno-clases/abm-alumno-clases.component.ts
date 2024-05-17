import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAlumno } from '../../models';
import { ClasesService } from '../../../clases/services/clases.service';
import { forkJoin, Subscription, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IClase } from '../../../clases/models';
import { Store } from '@ngrx/store';
import { authRolLogin } from '../../../../../../store/auth/auth.selectors';
import { AlumnoActions } from '../../store/alumno.actions';
import { selectAlumnoById } from '../../store/alumno.selectors'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-alumno-clases',
  templateUrl: './abm-alumno-clases.component.html',
  styleUrl: './abm-alumno-clases.component.scss',
})
export class AbmAlumnoClasesComponent implements OnInit {
  alumno: IAlumno | undefined;
  clasesFormatted: string[] = [];
  userData: Subscription = new Subscription();
  clases: IClase[] = [];
  alumnoClasesForm: FormGroup;
  rolLogin$: Observable<string | null>;
  alumno$: Observable<IAlumno | undefined>;
  alumnoSubscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public alumnoData: IAlumno,
    public clasesService: ClasesService,
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.rolLogin$ = this.store.select(authRolLogin);
    this.alumno$ = this.store.select(selectAlumnoById(this.alumnoData.id));
    this.alumnoClasesForm = this.formBuilder.group({
      nombre: [''],
    });
  }

  ngOnInit(): void {
    // Usar el ID del alumnoData en lugar del this.alumno.id
    this.alumno$ = this.store.select(selectAlumnoById(this.alumnoData.id));

    // Suscribirse al observable alumno$
    this.alumnoSubscription = this.alumno$.subscribe((alumno) => {
      this.alumno = alumno; // Actualizar this.alumno con los datos más recientes
    });

    this.cargarClases();
    this.cargarClasesFormatted();
  }

  cargarClases(): void {
    this.clasesService.getClases().subscribe((clases) => {
      this.clases = clases;
    });
  }

  cargarClasesFormatted(): void {
    if (this.alumno && this.alumno.clases) {
      const observables = this.alumno.clases.map((claseId) =>
        this.clasesService.getClasesPorId(claseId)
      );
      forkJoin(observables).subscribe((clasesFormatted) => {
        this.clasesFormatted = clasesFormatted;
      });
    }
  }

  onDeleteClase(id: string) {
    const alumnoActualizado = {
      ...this.alumno!,
      clases: this.alumno!.clases.filter((claseId) => claseId !== id),
    };
    this.store.dispatch(
      AlumnoActions.updateAlumno({
        id: this.alumno!.id,
        payload: alumnoActualizado,
      })
    );
  }

  onAgregarClase(): void {
    const claseIdSeleccionada = this.alumnoClasesForm.value.nombre;

    if (!this.alumno!.clases.includes(claseIdSeleccionada)) {
      const claseSeleccionada = this.clases.find(
        (clase) => clase.id === claseIdSeleccionada
      );
      if (claseSeleccionada) {
        const alumnoActualizado = {
          ...this.alumno!,
          clases: [...this.alumno!.clases, claseIdSeleccionada],
        };
        this.store.dispatch(
          AlumnoActions.updateAlumno({
            id: this.alumno!.id,
            payload: alumnoActualizado,
          })
        );
      }
    } else {
      Swal.fire({
        title: 'La clase seleccionada ya está agregada al alumno.',
        icon: 'warning',
      });
    }
  }
}
