import { Component } from '@angular/core';
import { IClase } from './models';
import { MatDialog } from '@angular/material/dialog';
import { AbmClasesComponent } from './components/abm-clases/abm-clases.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ClasesService } from './services/clases.service';

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

  userData: Subscription = new Subscription();
  clases: IClase[] = [];
  isAdmin: boolean = false;

  constructor(
    private clasesService: ClasesService,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.getUserData().subscribe((userData) => {
      if (userData.rol === 'ADMIN') {
        this.isAdmin = true;
      }
    });

    this.getClases();
  }

  
  getClases(): void {
    this.clasesService.getClases().subscribe({
      next: (data) => {
        this.clases = data;
      },
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
              this.clasesService.updateClase(editingUser.id, result).subscribe({
                next: (data) => {
                  this.clases = this.clases.map(clase => clase.id === editingUser.id ? data : clase);
                },
              });
            } else {
              this.clasesService.createClase(result).subscribe({
                next: (data) => {
                  this.clases.push(data);
                  this.getClases();
                },
              });
            }
          }
        }
      })
  };    

  onDeleteClase(id: string): void {
    Swal.fire({
      title: '¿Está seguro de eliminar la clase?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.clasesService.deleteClase(id).subscribe((data) => {
          Swal.fire({
            title: 'Clase eliminada',
            icon: 'success',
          });
          this.clases = this.clases.filter(clase => clase.id !== id);
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