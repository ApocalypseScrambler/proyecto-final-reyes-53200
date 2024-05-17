import { Component, OnInit } from '@angular/core';
import { IAlumno } from './models';
import { MatDialog } from '@angular/material/dialog';
import { AbmAlumnosComponent } from './components/abm-alumnos/abm-alumnos.component';
import { AbmAlumnoClasesComponent } from './components/abm-alumno-clases/abm-alumno-clases.component';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlumnosService } from './services/alumnos.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AlumnoActions } from './store/alumno.actions';
import { selectAlumnos, selectAlumnosError } from './store/alumno.selectors';
import { authRolLogin } from '../../../../store/auth/auth.selectors';
@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss',
})
export class AlumnosComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'nombrecompleto',
    'edad',
    'correo',
    'actions',
  ];

  userData: Subscription = new Subscription();
  alumnos$: Observable<IAlumno[]>;
  rolLogin$: Observable<string | null>;
  error$: Observable<Error>;

  constructor(
    private matDialog: MatDialog,
    private alumnosService: AlumnosService,
    private store: Store
  ) {
    this.rolLogin$ = this.store.select(authRolLogin);
    this.alumnos$ = this.store.select(selectAlumnos);
    this.error$ = this.store
      .select(selectAlumnosError)
      .pipe(map((err) => err as Error));
  }

  ngOnInit(): void {
    this.store.dispatch(AlumnoActions.loadAlumnos());
  }

  openDialog(editingUser?: IAlumno): void {
    this.matDialog
      .open(AbmAlumnosComponent, {
        data: editingUser,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingUser) {
              this.store.dispatch(
                AlumnoActions.updateAlumno({
                  id: editingUser.id,
                  payload: result,
                })
              );
            } else {
              this.store.dispatch(
                AlumnoActions.createAlumno({ payload: result })
              );
            }
          }
        },
      });
  }

  openDetail(alumno: IAlumno): void {
    this.matDialog.open(AbmAlumnoClasesComponent, {
      data: alumno,
    });
  }

  onDeleteAlumno(id: string): void {
    Swal.fire({
      title: '¿Está seguro de eliminar el alumno?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(AlumnoActions.deleteAlumno({ id }));
        Swal.fire({
          title: 'Alumno eliminado',
          icon: 'success',
        });
      }
    });
  }
}
