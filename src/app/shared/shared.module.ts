import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { FormFieldValidationErrorsPipe } from './pipes/form-field-validation-errors.pipe';
import { Tamano20Directive } from './directives/tamano20.directive';
import { NombreCompletoPipe } from './pipes/nombre-completo.pipe';



@NgModule({
  declarations: [
    FormFieldValidationErrorsPipe,
    Tamano20Directive,
    NombreCompletoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    NombreCompletoPipe,
    Tamano20Directive,
    FormFieldValidationErrorsPipe,
  ],
})
export class SharedModule { }
