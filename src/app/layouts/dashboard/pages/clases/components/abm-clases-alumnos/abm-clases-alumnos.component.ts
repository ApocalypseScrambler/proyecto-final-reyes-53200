import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAlumno } from '../../../alumnos/models';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IClase } from '../../models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-clases-alumnos',
  templateUrl: './abm-clases-alumnos.component.html',
  styleUrl: './abm-clases-alumnos.component.scss'
})
export class AbmClasesAlumnosComponent implements OnInit {
  alumnosInscritos: IAlumno[] = [];
  isAdmin: boolean = false;
  userData: Subscription = new Subscription();
  alumnos: IAlumno[] = []
  claseAlumnosForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AbmClasesAlumnosComponent>,
    @Inject(MAT_DIALOG_DATA) public clase: IClase,
    private alumnosService: AlumnosService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.claseAlumnosForm = this.formBuilder.group({
      nombre: ['']
    });
   }

  ngOnInit(): void {
    this.userData = this.authService.getUserData().subscribe((userData) => {
      if (userData.rol === 'ADMIN') {
        this.isAdmin = true;
      }
    });
    this.cargarAlumnos();
    this.obtenerAlumnosInscritos();
  }

  cargarAlumnos(): void {
    this.alumnosService.getAlumnos().subscribe((alumnos) => {
      this.alumnos = alumnos;
    });
  }

  
  obtenerAlumnosInscritos(): void {
    const claseId = this.clase.id; 
    this.alumnosService.getAlumnos().subscribe(alumnos => {
      this.alumnosInscritos = alumnos.filter(alumno => alumno.clases.includes(claseId));
    });
  }

  onDeleteAlumno(alumno: IAlumno): void {
    const claseId = this.clase.id; 
    alumno.clases = alumno.clases.filter(id => id !== claseId);
    this.alumnosService.updateAlumno(alumno.id, alumno).subscribe(updatedAlumno => {
      this.obtenerAlumnosInscritos();
    });
  }

  onAgregarAlumno(): void {
    debugger
    const alumnoIdSeleccionado = this.claseAlumnosForm.value.nombre;
    const alumnoSeleccionado = this.alumnos.find(alumno => alumno.id === alumnoIdSeleccionado);
  
    if (alumnoSeleccionado) { 
      const claseId = this.clase.id;
      if (!alumnoSeleccionado.clases.includes(claseId)) {
        alumnoSeleccionado.clases.push(claseId);
        this.alumnosService
          .updateAlumno(alumnoSeleccionado.id, alumnoSeleccionado)
          .subscribe(updatedAlumno => {
          this.obtenerAlumnosInscritos();
        });
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
  }
}