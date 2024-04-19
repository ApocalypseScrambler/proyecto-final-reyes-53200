import { Component } from '@angular/core';
import { ICurso } from './models'
import { MatDialog } from '@angular/material/dialog';
import { AbmCursosComponent } from './components/abm-cursos/abm-cursos.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'jornada',
    'actions'
  ];

  userData: Subscription =  new Subscription();
  isAdmin: boolean = false;

  cursos: ICurso[] = [
    {
      id: 1,
      nombre: 'Desarrollo Web',
      jornada: 'Noche',
    },
    {
      id: 2,
      nombre: 'JavaScript',
      jornada: 'Tarde',
    },
    {
      id: 3,
      nombre: 'Data Science',
      jornada: 'Tarde',
    },
    {
      id: 4,
      nombre: 'Machine Learning',
      jornada: 'Mañana',
    },
    {
      id: 5,
      nombre: 'Data Analytics',
      jornada: 'Noche',
    },
  ];

  constructor(private matDialog: MatDialog, private authService: AuthService) {
    this.userData = this.authService.getUserData().subscribe(userData => {
      if (userData.rol === 'ADMIN') {
        this.isAdmin = true;
      }
    });
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
              // Actualizamos el alumno existente en la lista
              this.cursos = this.cursos.map((u) =>
                u.id === editingUser.id ? { ...u, ...result } : u
              );
            } else {
              // Generamos  un ID único para el nuevo usuario y lo añadimos al array
              const maxId = Math.max(...this.cursos.map(curso => curso.id));
              result.id = maxId + 1;
              this.cursos = [...this.cursos, result];
            }
          }
        },
      });
  }

  onDeleteCurso(id: number): void {
    Swal.fire({
      title: "Esta seguro de eliminar el curso?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursos = this.cursos.filter((u) => u.id != id);
        Swal.fire({
          title: "Curso eliminado",
          icon: "success"
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: "Petición Cancelada",
          icon: "error"
        });
      }
    });
  }
}
