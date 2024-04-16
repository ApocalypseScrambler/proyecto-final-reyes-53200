import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICurso } from '../../models';

interface tipoJornada {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-abm-cursos',
  templateUrl: './abm-cursos.component.html',
  styleUrl: './abm-cursos.component.scss'
})
export class AbmCursosComponent {
  cursoForm: FormGroup;
  
  tipoJornadas: tipoJornada[] = [
    {value: 'Mañana', viewValue: 'Mañana'},
    {value: 'Tarde', viewValue: 'Tarde'},
    {value: 'Noche', viewValue: 'Noche'},
  ];

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AbmCursosComponent>,
    @Inject(MAT_DIALOG_DATA) private editingUser?: ICurso
  ) {
    this.cursoForm = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required, Validators.pattern('[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$'), Validators.minLength(4)],
      ],
      jornada: [
        '',
        [Validators.required],
      ],
    });

    if (editingUser) {
      this.cursoForm.patchValue(editingUser);
    }
  }

  get nombreControl() {
    return this.cursoForm.get('nombre');
  }

  get jornadaControl() {
    return this.cursoForm.get('jornada');
  }

  onSave(): void {
    if (this.cursoForm.invalid) {
      this.cursoForm.markAllAsTouched();
    } else {
      // SI EL FORM SI ES VALIDO...
      this.matDialogRef.close(this.cursoForm.value);
    }
  }
}