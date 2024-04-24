import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUsuario } from '../../models';

@Component({
  selector: 'app-abm-usuarios',
  templateUrl: './abm-usuarios.component.html',
  styleUrl: './abm-usuarios.component.scss'
})
export class AbmUsuariosComponent {
  usuarioForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AbmUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) private editingUser?: IUsuario
  ) {
    this.usuarioForm = this.formBuilder.group({
      usuario: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      password: [
        '',
        [
          Validators.required, 
          this.validatePassword,
          //Validators.pattern('^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]'),
          //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$'),
          Validators.minLength(8),
          Validators.maxLength(15),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
        ],
      ],
      rol: ['USER', [Validators.required]],      
    });

    if (editingUser) {
      this.usuarioForm.patchValue(editingUser);
    }
  }

  get usuarioControl() {
    return this.usuarioForm.get('usuario');
  }

  get passwordControl() {
    return this.usuarioForm.get('password');
  }

  get emailControl() {
    return this.usuarioForm.get('email');
  }

  onSave(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
    } else {
      // SI EL FORM SI ES VALIDO...
      this.matDialogRef.close(this.usuarioForm.value);
    }
  }

  validatePassword(control: FormControl): { [key: string]: any } | null {
    const password: string = control.value;
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);

    if (!(hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar)) {
      return { invalidPassword: true };
    }

    return null;
  }
}