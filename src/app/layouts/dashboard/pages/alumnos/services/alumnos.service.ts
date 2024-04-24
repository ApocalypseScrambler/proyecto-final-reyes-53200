import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAlumno } from '../models';


@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
    private alumnos: IAlumno[] = [
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
    
  
  constructor() {}

  getAlumnos(): Observable<IAlumno[]> {
    return of(this.alumnos);
  }

  createAlumno(data: IAlumno) {
    const maxId = Math.max(...this.alumnos.map((alumno) => alumno.id));
    const newAlumno: IAlumno = {
        id: maxId + 1,
        nombre: data.nombre,
        apellido: data.apellido,
        edad: data.edad,
        correo: data.correo,
    };
    this.alumnos = [...this.alumnos, newAlumno];
    return of(this.alumnos);
  }

  deleteAlumno(id: number) {
    this.alumnos = this.alumnos.filter((alumno) => alumno.id != id);
    return of(this.alumnos);
  }

  updateAlumno(id: number, data: IAlumno) {
    this.alumnos = this.alumnos.map((alumno) => alumno.id === id ? { ...alumno, ...data } : alumno);
    return of(this.alumnos);
  }
}