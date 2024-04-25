import { Component, OnInit } from '@angular/core';
import { ICurso } from './models'
import { IClase } from '../clases/models';
import { MatDialog } from '@angular/material/dialog';
import { AbmCursosComponent } from './components/abm-cursos/abm-cursos.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CursosService } from './services/cursos.service';
import { ClasesService } from '../clases/services/clases.service';

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

  userData: Subscription =  new Subscription();
  cursos: ICurso[] = [];
  clases: IClase[] = [];
  isAdmin: boolean = false;

  constructor(
    private cursosService: CursosService,
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

    this.getCursos();
  }

  getCursos(): void {
    this.cursosService.getCursos().subscribe({
      next: (data) => {
        this.cursos = data;
      },
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
              this.cursosService.updateCurso(editingUser.id, result).subscribe({
                next: (data) => {
                  this.cursos = data;
                },
                complete() {},
              });
            } else {
              this.cursosService.createUsuario(result).subscribe({
                next: (data) => {
                  this.cursos = data;
                },
                complete() {},
              });
            }
          }
        }
      })
  };    

  onDeleteCurso(id: number, nombre: string): void {
    this.clasesService.getClasesPorCurso(nombre).subscribe((clases) => {
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
            this.cursosService.deleteCurso(id).subscribe((data) => {
              Swal.fire({
                title: 'Curso eliminado',
                icon: 'success',
              });
              this.cursos = data;
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title: 'Petición Cancelada',
              icon: 'error',
            });
          }
        });
      }
    });
  }

    ngOnDestroy(): void {
    this.userData.unsubscribe();
  }
}