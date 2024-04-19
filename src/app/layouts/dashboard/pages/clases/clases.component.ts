import { Component } from '@angular/core';
import { IClase } from './models';
import { MatDialog } from '@angular/material/dialog';
import { AbmClasesComponent } from './components/abm-clases/abm-clases.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

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

  userData: Subscription =  new Subscription();
  isAdmin: boolean = false;

  clases: IClase[] = [
    {
      id: 1,
      nombre: 'Desarrollo Web',
      fechaInicio: new Date('2024-04-01'),
      fechaFin: new Date('2024-06-30'),
      horarioInicio: '08:00',
      horarioFin: '10:00',
    },
    {
      id: 2,
      nombre: 'Desarrollo Web',
      fechaInicio: new Date('2024-03-05'),
      fechaFin: new Date('2024-06-22'),
      horarioInicio: '20:00',
      horarioFin: '22:00',
    },
    {
      id: 3,
      nombre: 'Data Science',
      fechaInicio: new Date('2024-04-20'),
      fechaFin: new Date('2024-08-15'),
      horarioInicio: '19:00',
      horarioFin: '21:00',
    },
    {
      id: 4,
      nombre: 'Data Analytics',
      fechaInicio: new Date('2024-03-08'),
      fechaFin: new Date('2024-05-26'),
      horarioInicio: '20:30',
      horarioFin: '22:30',
    },
    {
      id: 5,
      nombre: 'Data Science',
      fechaInicio: new Date('2024-04-12'),
      fechaFin: new Date('2024-07-05'),
      horarioInicio: '20:30',
      horarioFin: '22:30',
    },
    {
      id: 6,
      nombre: 'JavaScript',
      fechaInicio: new Date('2024-05-20'),
      fechaFin: new Date('2024-08-14'),
      horarioInicio: '08:00',
      horarioFin: '10:00',
    },
    {
      id: 7,
      nombre: 'Machine Learning',
      fechaInicio: new Date('2024-04-01'),
      fechaFin: new Date('2024-06-30'),
      horarioInicio: '15:00',
      horarioFin: '17:00',
    },
  ];

  constructor(private matDialog: MatDialog, private authService: AuthService) {
    this.userData = this.authService.getUserData().subscribe(userData => {
      if (userData.rol === 'ADMIN') {
        this.isAdmin = true;
      }
    });
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
              // ACTUALIZAR EL USUARIO EN EL ARRAY
              this.clases = this.clases.map((u) =>
                u.id === editingUser.id ? { ...u, ...result } : u
              );
            } else {
              // Generamos  un ID único para el nuevo usuario y lo añadimos al array
              const maxId = Math.max(...this.clases.map(clase => clase.id));
              result.id = maxId + 1;
              this.clases = [...this.clases, result];
            }
          }
        },
      });
  }

  onDeleteUser(id: number): void {
    Swal.fire({
      title: "Esta seguro de eliminar la clase?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.clases = this.clases.filter((u) => u.id != id);
        Swal.fire({
          title: "Clase eliminada",
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
