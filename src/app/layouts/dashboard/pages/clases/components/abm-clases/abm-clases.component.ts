import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IClase } from '../../models';
import { ICurso } from '../../../cursos/models';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Observable, map } from 'rxjs';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { selectCursos, selectCursosError } from '../../../cursos/store/curso.selectors';
import { Store } from '@ngrx/store';
import { CursoActions } from '../../../cursos/store/curso.actions';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', 
  },
  display: {
    dateInput: 'DD/MM/YYYY', 
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-abm-clases',
  templateUrl: './abm-clases.component.html',
  styleUrl: './abm-clases.component.scss',
  providers: [
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ],
})
export class AbmClasesComponent implements OnInit{
  claseForm: FormGroup;
  cursos$: Observable<ICurso[]>;
  error$: Observable<Error>;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AbmClasesComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private editingUser?: IClase
  ) {
    this.cursos$ = this.store.select(selectCursos);
    this.error$ = this.store
      .select(selectCursosError)
      .pipe(map((err) => err as Error));

      this.claseForm = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required],
      ],
      fechaInicio: [
        '',
        [Validators.required],
      ],
      fechaFin: [
        '',
        [Validators.required],
      ],                                          
      horarioInicio: [
        '',
        [Validators.required, Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$')],
      ],
      horarioFin: [
        '',
        [Validators.required, Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$')],
      ],
    });

    if (editingUser) {
      this.claseForm.patchValue(editingUser);
    }
  }

  ngOnInit(): void {
    this.store.dispatch(CursoActions.loadCursos());
  }

  get nombreControl() {
    return this.claseForm.get('nombre');
  }

  get fechaInicioControl() {
    return this.claseForm.get('fechaInicio');
  }

  get fechaFinControl() {
    return this.claseForm.get('fechaFin');
  }

  get horarioInicioControl() {
    return this.claseForm.get('horarioInicio');
  }

  get horarioFinControl() {
    return this.claseForm.get('horarioFin');
  }

  onSave(): void {
    if (this.claseForm.invalid) {
      this.claseForm.markAllAsTouched();
    } else {
      // SI EL FORM SI ES VALIDO...
      this.matDialogRef.close(this.claseForm.value);
    }
  }
}
