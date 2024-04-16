import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAlumno } from '../../models';

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrl: './abm-alumnos.component.scss'
})
export class AbmAlumnosComponent {
  alumnoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AbmAlumnosComponent>,
    @Inject(MAT_DIALOG_DATA) private editingUser?: IAlumno
  ) {
    this.alumnoForm = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required, Validators.pattern('[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$'), Validators.minLength(4)],
      ],
      apellido: [
        '',
        [Validators.required, Validators.pattern('[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$'), Validators.minLength(4)],
      ],
      edad: [
        '',
        [Validators.required, Validators.pattern('^(1[89]|[2-9][0-9])$')],
      ],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
        ],
      ],
    });

    if (editingUser) {
      this.alumnoForm.patchValue(editingUser);
    }
  }

  get nombreControl() {
    return this.alumnoForm.get('nombre');
  }

  get apellidoControl() {
    return this.alumnoForm.get('apellido');
  }

  get edadControl() {
    return this.alumnoForm.get('edad');
  }

  get correoControl() {
    return this.alumnoForm.get('correo');
  }

  onSave(): void {
    if (this.alumnoForm.invalid) {
      this.alumnoForm.markAllAsTouched();
    } else {
      // SI EL FORM SI ES VALIDO...
      this.matDialogRef.close(this.alumnoForm.value);
    }
  }
}
