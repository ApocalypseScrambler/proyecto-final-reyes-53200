import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAlumno } from '../../models';
import { ClasesService } from '../../../clases/services/clases.service';
import { forkJoin, Subscription } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';
import { AlumnosService } from '../../services/alumnos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IClase } from '../../../clases/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-alumno-clases',
  templateUrl: './abm-alumno-clases.component.html',
  styleUrl: './abm-alumno-clases.component.scss',
})
export class AbmAlumnoClasesComponent implements OnInit {
  clasesFormatted: string[] = [];
  isAdmin: boolean = false;
  userData: Subscription = new Subscription();
  clases: IClase[] = [];
  alumnoClasesForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public alumno: IAlumno,
    public clasesService: ClasesService,
    private authService: AuthService,
    private alumnosService: AlumnosService,
    private formBuilder: FormBuilder
  ) {
    this.alumnoClasesForm = this.formBuilder.group({
      nombre: [''],
    });
  }

  ngOnInit(): void {
    this.userData = this.authService.getUserData().subscribe((userData) => {
      if (userData.rol === 'ADMIN') {
        this.isAdmin = true;
      }
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
    this.alumno.clases = this.alumno.clases.filter((claseId) => claseId !== id);
    this.alumnosService.updateAlumno(this.alumno.id, this.alumno).subscribe({
      next: (data) => {
        this.alumno = data;
      },
    });
    this.cargarClasesFormatted();
  }

  onAgregarClase(): void {
    const claseIdSeleccionada = this.alumnoClasesForm.value.nombre;

    if (!this.alumno.clases.includes(claseIdSeleccionada)) {
      const claseSeleccionada = this.clases.find(
        (clase) => clase.id === claseIdSeleccionada
      );
      if (claseSeleccionada) {
        this.alumno.clases.push(claseIdSeleccionada);
        this.alumnosService
          .updateAlumno(this.alumno.id, this.alumno)
          .subscribe({
            next: (data) => {
              this.alumno = data;
              this.cargarClasesFormatted();
            },
            error: (error) => {
              Swal.fire({
                title: 'Error al agregar la clase al alumno: ' + error,
                icon: 'error',
              });
            },
          });
      }
    } else {
      Swal.fire({
        title: 'La clase seleccionada ya está agregada al alumno.',
        icon: 'warning',
      });
    }
  }
}
