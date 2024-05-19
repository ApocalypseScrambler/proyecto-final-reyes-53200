import { Component } from '@angular/core';
import { IClase } from './models';
import { MatDialog } from '@angular/material/dialog';
import { AbmClasesComponent } from './components/abm-clases/abm-clases.component';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { authRolLogin } from '../../../../store/auth/auth.selectors';
import { ClaseActions } from './store/clase.actions';
import { AbmClasesAlumnosComponent } from './components/abm-clases-alumnos/abm-clases-alumnos.component';
import { selectClases, selectClasesLoading, selectClasesError } from './store/clase.selectors';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.scss'
})
export class ClasesComponent {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'fechaInicio',
    'fechaFin',
    'horarioInicio',
    'horarioFin',
    'actions',
  ];

  clases$: Observable<IClase[]>;
  loading$: Observable<boolean>;
  rolLogin$: Observable<string | null>;
  error$: Observable<Error>;

  constructor(
    private matDialog: MatDialog,
    private store: Store,
  ) {
    this.rolLogin$ = this.store.select(authRolLogin);
    this.clases$ = this.store.select(selectClases);
    this.loading$ = this.store.select(selectClasesLoading);
    this.error$ = this.store
      .select(selectClasesError)
      .pipe(map((err) => err as Error));
  }

  ngOnInit(): void {
    this.store.dispatch(ClaseActions.loadClases());
  }

  openDialog(editingUser?: IClase): void {
    this.matDialog
      .open(AbmClasesComponent, {
        data: editingUser,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingUser) {
              this.store.dispatch(
                ClaseActions.updateClase({
                  id: editingUser.id,
                  payload: result,
                })
              );
            } else {
              this.store.dispatch(
                ClaseActions.createClase({ payload: result })
              );
            }
          }
        },
      });
  } 

  openDetail(clase: IClase): void {
    this.matDialog.open(AbmClasesAlumnosComponent, {
      data: clase
    });
  }

  onDeleteClase(id: string): void {
    Swal.fire({
      title: '¿Está seguro de eliminar la clase?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(ClaseActions.deleteClase({ id }));
        Swal.fire({
          title: 'Clase eliminada',
          icon: 'success',
        });
      }
    });
  }
}

  

  