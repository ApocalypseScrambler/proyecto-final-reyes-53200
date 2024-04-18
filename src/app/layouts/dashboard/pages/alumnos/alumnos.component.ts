import { Component } from '@angular/core';
import { IAlumno } from './models'
import { MatDialog } from '@angular/material/dialog';
import { AbmAlumnosComponent } from './components/abm-alumnos/abm-alumnos.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {
  displayedColumns: string[] = [
    'id',
    'nombrecompleto',
    'edad',
    'correo',
    'actions'
  ];

  userData: Subscription =  new Subscription();
  isAdmin: boolean = false;

  alumnos: IAlumno[] = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      edad: 28,
      correo: 'juanperez@example.com',
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'Gómez',
      edad: 25,
      correo: 'mariagomez@example.com',
    },
    {
      id: 3,
      nombre: 'Carlos',
      apellido: 'Sánchez',
      edad: 30,
      correo: 'carlossanchez@example.com',
    },
    {
      id: 4,
      nombre: 'Laura',
      apellido: 'Rodríguez',
      edad: 22,
      correo: 'laurarodriguez@example.com',
    },
    {
      id: 5,
      nombre: 'Pedro',
      apellido: 'Martínez',
      edad: 24,
      correo: 'pedromartinez@example.com',
    },
  ];

  constructor(private matDialog: MatDialog, private authService: AuthService) {
    this.userData = this.authService.getUserData().subscribe(userData => {
      if (userData.rol === 'ADMIN') {
        this.isAdmin = true;
      }
    });
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
              // Actualizamos el alumno existente en la lista
              this.alumnos = this.alumnos.map((u) =>
                u.id === editingUser.id ? { ...u, ...result } : u
              );
            } else {
              // Generamos  un ID único para el nuevo usuario y lo añadimos al array
              const maxId = Math.max(...this.alumnos.map(alumno => alumno.id));
              result.id = maxId + 1;
              this.alumnos = [...this.alumnos, result];
            }
          }
        },
      });
  }

  onDeleteAlumno(id: number): void {
    if (confirm('Esta seguro?')) {
      this.alumnos = this.alumnos.filter((u) => u.id != id);
    }
  }
}
