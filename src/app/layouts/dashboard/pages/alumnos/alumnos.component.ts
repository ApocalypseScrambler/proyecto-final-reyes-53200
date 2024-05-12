import { Component } from '@angular/core';
import { IAlumno } from './models';
import { MatDialog } from '@angular/material/dialog';
import { AbmAlumnosComponent } from './components/abm-alumnos/abm-alumnos.component';
import { AbmAlumnoClasesComponent } from './components/abm-alumno-clases/abm-alumno-clases.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { AlumnosService } from './services/alumnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss',
})
export class AlumnosComponent {
  displayedColumns: string[] = [
    'id',
    'nombrecompleto',
    'edad',
    'correo',
    'actions',
  ];

  userData: Subscription = new Subscription();
  alumnos: IAlumno[] = [];
  isAdmin: boolean = false;

  

  constructor(
    private matDialog: MatDialog, 
    private authService: AuthService,
    private alumnosService: AlumnosService) {}

    ngOnInit(): void {
      this.userData = this.authService.getUserData().subscribe((userData) => {
        if (userData.rol === 'ADMIN') {
          this.isAdmin = true;
        }
      });
  
      this.getAlumnos();
    }
  
    
    getAlumnos(): void {
      this.alumnosService.getAlumnos().subscribe({
        next: (data) => {
          this.alumnos = data;
        },
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
                this.alumnosService.updateAlumno(editingUser.id, result).subscribe({
                  next: (data) => {
                    this.alumnos = this.alumnos.map(alumno => alumno.id === editingUser.id ? data : alumno);
                  },
                });
              } else {
                this.alumnosService.createAlumno(result).subscribe({
                  next: (data) => {
                    data.clases = []
                    this.alumnos.push(data);
                    this.getAlumnos();
                  },
                  
                });
              }
            }
          }
        })
    };   
    
    openDetail(alumno: IAlumno): void {
      this.matDialog.open(AbmAlumnoClasesComponent, {
        data: alumno
      });
    }

    onDeleteAlumno(id: string): void {
      Swal.fire({
        title: '¿Está seguro de eliminar el alumno?',
        icon: 'warning',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.alumnosService.deleteAlumno(id).subscribe((data) => {
            Swal.fire({
              title: 'Alumno eliminado',
              icon: 'success',
            });
            this.getAlumnos();
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'Petición Cancelada',
            icon: 'error',
          });
        }
      });
    }
  
    
  
    ngOnDestroy(): void {
      this.userData.unsubscribe();
    }
  }