import { Component } from '@angular/core';
import { IUsuario } from './models'
import { MatDialog } from '@angular/material/dialog';
import { AbmUsuariosComponent } from './componets/abm-usuarios/abm-usuarios.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
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

  usuarios: IUsuario[] = [
    {
      id: 1,
      usuario: 'User1',
      password: 'contraseña123',
      email: 'correo@mail.com',
      rol: 'ADMIN',
      fecha_creacion: new Date('09/08/2021'),
      fecha_modificacion: new Date('09/08/2021'),
    },  
    {
      id: 2,
      usuario: 'User2',
      password: 'contraseña456',
      email: 'correo@mail.com',
      rol: 'USER',
      fecha_creacion: new Date('09/08/2021'),
      fecha_modificacion: new Date('09/08/2021'),
    },      
  ];

  constructor(private matDialog: MatDialog) {}

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

  onDeleteCurso(id: number): void {
    if (confirm('Esta seguro?')) {
      this.usuarios = this.usuarios.filter((u) => u.id != id);
    }
  }
}
