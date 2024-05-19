import { Component, OnInit } from '@angular/core';
import { IUsuario } from './models';
import { MatDialog } from '@angular/material/dialog';
import { AbmUsuariosComponent } from './componets/abm-usuarios/abm-usuarios.component';
import { Observable, map, switchMap, filter, take } from 'rxjs';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { selectUsuario, selectUsuarios, selectUsuariosLoading } from './store/usuario.selectors';
import { authRolLogin } from '../../../../store/auth/auth.selectors';
import { selectCursosError } from '../cursos/store/curso.selectors';
import { UsuarioActions } from './store/usuario.actions';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'usuario',
    'password',
    'email',
    'rol',
    'fecha_creacion',
    'fecha_modificacion',
    'actions',
  ];

  usuarios$: Observable<IUsuario[]>;
  usuario$: Observable<IUsuario | null>;
  loading$: Observable<boolean>;
  rolLogin$: Observable<string | null>;
  error$: Observable<Error>;

  constructor(
    private matDialog: MatDialog,
    private store: Store,
  ) {
    this.rolLogin$ = this.store.select(authRolLogin);
    this.usuarios$ = this.store.select(selectUsuarios);
    this.usuario$ = this.store.select(selectUsuario);
    this.loading$ = this.store.select(selectUsuariosLoading);
    this.error$ = this.store
      .select(selectCursosError)
      .pipe(map((err) => err as Error));
  }

  ngOnInit(): void {
    this.store.dispatch(UsuarioActions.loadUsuarios());
  }

  openDialog(editingUser?: IUsuario): void {
    this.matDialog
      .open(AbmUsuariosComponent, {
        data: editingUser,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingUser) {
              this.store.dispatch(
                UsuarioActions.updateUsuario({
                  id: editingUser.id,
                  payload: result,
                })
              );
            } else {
              this.store.dispatch(
                UsuarioActions.createUsuario({ payload: result })
              );
            }
          }
        },
      });
  } 

  onDeleteUsuario(id: string): void {
    this.store.dispatch(UsuarioActions.loadUsuarioPorId({ id }));

    this.loading$.pipe(
      filter(loading => !loading),
      take(1),
      switchMap(() => this.usuario$.pipe(take(1)))
    ).subscribe(usuario => {
      debugger
      if (usuario && usuario.rol === 'ADMIN') {
        Swal.fire({
          title: 'No se puede eliminar el usuario',
          text: 'Los usuarios de tipo Administrador no se pueden eliminar',
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: '¿Está seguro de eliminar el usuario?',
          icon: 'warning',
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            this.store.dispatch(UsuarioActions.deleteUsuario({ id }));
            Swal.fire({
              title: 'Usuario eliminado',
              icon: 'success',
            });
          }
        });
      }
    });
  }

}
