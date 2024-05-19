import { Component, OnInit } from '@angular/core';
import { ICurso } from './models'
import { IClase } from '../clases/models';
import { MatDialog } from '@angular/material/dialog';
import { AbmCursosComponent } from './components/abm-cursos/abm-cursos.component';
import { map, Observable, combineLatest, filter, take } from 'rxjs';
import Swal from 'sweetalert2';
import { authRolLogin } from '../../../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { ClaseActions } from '../clases/store/clase.actions';
import { CursoActions } from './store/curso.actions';
import { selectClases, selectClasesLoading } from '../clases/store/clase.selectors';
import { selectCursos, selectCursosError } from './store/curso.selectors';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'nombre',
    'jornada',
    'actions'
  ];

  cursos$: Observable<ICurso[]>;
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
    this.cursos$ = this.store.select(selectCursos);
    this.error$ = this.store
      .select(selectCursosError)
      .pipe(map((err) => err as Error));
  }

  ngOnInit(): void {
    this.store.dispatch(CursoActions.loadCursos());
  }

  openDialog(editingUser?: ICurso): void {
    this.matDialog
      .open(AbmCursosComponent, {
        data: editingUser,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingUser) {
              this.store.dispatch(
                CursoActions.updateCurso({
                  id: editingUser.id,
                  payload: result,
                })
              );
            } else {
              this.store.dispatch(
                CursoActions.createCurso({ payload: result })
              );
            }
          }
        },
      });
  } 

  onDeleteCurso(id: string, nombre: string): void {
    this.store.dispatch(ClaseActions.loadClasesPorCurso({ nombre }));

    combineLatest([this.clases$, this.loading$])
      .pipe(
        filter(([clases, loading]) => !loading), 
        take(1), 
        map(([clases]) => clases) 
      )
      .subscribe(clases => {
        if (clases.length > 0) {
          Swal.fire({
            title: 'No se puede eliminar el curso',
            text: 'Hay clases asociadas a este curso. Elimina las clases primero.',
            icon: 'error',
          });
        } else {
          Swal.fire({
            title: '¿Está seguro de eliminar el curso?',
            icon: 'warning',
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              this.store.dispatch(CursoActions.deleteCurso({ id }));
              Swal.fire({
                title: 'Curso eliminado',
                icon: 'success',
              });
            }
          });
        }
      });
  }


}