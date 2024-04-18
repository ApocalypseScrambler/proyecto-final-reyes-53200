import { Component, OnInit } from '@angular/core';
import { IUsuario } from './models'
import { MatDialog } from '@angular/material/dialog';
import { AbmUsuariosComponent } from './componets/abm-usuarios/abm-usuarios.component';
import { UsuariosService } from '../../../../core/services/usuarios.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'usuario',
    'password',
    'email',
    'rol',
    'fecha_creacion',
    'fecha_modificacion',
    'actions'
  ];

  userData: Subscription =  new Subscription();
  usuarios: IUsuario[] = [];
  isAdmin: boolean = false;

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  constructor(private usuariosService: UsuariosService, private matDialog: MatDialog, private authService: AuthService) {
    this.userData = this.authService.getUserData().subscribe(userData => {
      if (userData.rol === 'ADMIN') {
        this.isAdmin = true;
      }
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
              // Actualizamos el alumno existente en la lista
              result.fecha_modificacion = new Date();
              this.usuarios = this.usuarios.map((u) =>
                u.id === editingUser.id ? { ...u, ...result } : u
              );
            } else {
              // Generamos  un ID único para el nuevo usuario y lo añadimos al array
              const maxId = Math.max(...this.usuarios.map(curso => curso.id));
              result.id = maxId + 1;
              result.fecha_creacion = new Date();
              result.fecha_modificacion = new Date();
              this.usuarios = [...this.usuarios, result];
            }
          }
        },
      });
  }

  onDeleteUsuario(id: number): void {
    if (confirm('Esta seguro?')) {
      this.usuarios = this.usuarios.filter((u) => u.id != id);
    }
  }
}
