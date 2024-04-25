import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IClase } from '../models';


@Injectable({
  providedIn: 'root',
})
export class ClasesService {
    private clases: IClase[] = [
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
    
  
  constructor() {}

  getClases(): Observable<IClase[]> {
    return of(this.clases);
  }

  getClasesPorCurso(nombre: string): Observable<IClase[]> {
    const clasesPorCurso = this.clases.filter(clase => clase.nombre === nombre);
    return of(clasesPorCurso);
}

  createClase(data: IClase) {
    const maxId = Math.max(...this.clases.map((clase) => clase.id));
    const newClase: IClase = {
        id: maxId + 1,
        nombre: data.nombre,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        horarioInicio: data.horarioInicio,
        horarioFin: data.horarioFin,
    };
    this.clases = [...this.clases, newClase];
    return of(this.clases);
  }

  deleteClase(id: number) {
    this.clases = this.clases.filter((clase) => clase.id != id);
    return of(this.clases);
  }

  updateClase(id: number, data: IClase) {
    this.clases = this.clases.map((clase) => clase.id === id ? { ...clase, ...data } : clase);
    return of(this.clases);
  }
}