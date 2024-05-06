import { Component, OnInit } from '@angular/core';
import { IUsuario } from './models';
import { MatDialog } from '@angular/material/dialog';
import { AbmUsuariosComponent } from './componets/abm-usuarios/abm-usuarios.component';
import { UsuariosService } from './services/usuarios.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

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

  userData: Subscription = new Subscription();
  usuarios: IUsuario[] = [];
  usuario: IUsuario | undefined;
  isAdmin: boolean = false;

  constructor(
    private usuariosService: UsuariosService,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.getUserData().subscribe((userData) => {
      if (userData.rol === 'ADMIN') {
        this.isAdmin = true;
      }
    });

    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
    });
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
              this.usuariosService.updateUsuario(editingUser.id, result).subscribe({
                next: (data) => {
                  this.usuarios = this.usuarios.map(usuario => usuario.id === editingUser.id ? data : usuario);
                },
              });
            } else {
              this.usuariosService.createUsuario(result).subscribe({
                next: (data) => {
                  this.usuarios.push(data);
                  this.getUsuarios();
                },
                
              });
            }
          }
        },
      });
  }

  onDeleteUsuario(id: string): void {
    this.usuariosService.getUsuarioPorId(id).subscribe((data) => {
      this.usuario = data;
      if (this.usuario) {
        if (this.usuario.rol === 'ADMIN') {
          Swal.fire({
            title: 'Usuario administrador',
            text: 'No se permite el borrado del usuario Administrador',
            icon: 'error',
          });
        } else {
          Swal.fire({
            title: '¿Está seguro de eliminar el usuario?',
            icon: 'warning',
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              this.usuariosService.deleteUsuario(id).subscribe(() => {
                Swal.fire({
                  title: 'Usuario eliminado',
                  icon: 'success',
                });
                this.usuariosService.getUsuarios().subscribe((usuarios) => {
                  this.usuarios = usuarios;
                });
              });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire({
                title: 'Petición Cancelada',
                icon: 'error',
              });
            }
          });
        }
      } else {
        Swal.fire({
          title: 'Usuario no encontrado',
          icon: 'error',
        });
      }
    });
}


  ngOnDestroy(): void {
    this.userData.unsubscribe();
  }
}
