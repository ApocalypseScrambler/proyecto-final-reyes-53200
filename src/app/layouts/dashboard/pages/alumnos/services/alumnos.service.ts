import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAlumno } from '../models';


@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
    private alumnos: IAlumno[] = [
        
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