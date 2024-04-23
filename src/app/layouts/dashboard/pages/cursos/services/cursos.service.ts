import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICurso} from '../models';


@Injectable({
  providedIn: 'root',
})
export class CursosService {
    private cursos: ICurso[] = [
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
  
  constructor() {}

  getCursos(): Observable<ICurso[]> {
    return of(this.cursos);
  }

  createUsuario(data: ICurso) {
    const maxId = Math.max(...this.cursos.map((curso) => curso.id));
    const newCurso: ICurso = {
      id: maxId + 1,
      nombre: data.nombre,
      jornada: data.jornada,
    };
    this.cursos = [...this.cursos, newCurso];
    return of(this.cursos);
  }

  deleteCurso(id: number) {
    this.cursos = this.cursos.filter((curso) => curso.id != id);
    return of(this.cursos);
  }

  updateCurso(id: number, data: ICurso) {
    this.cursos = this.cursos.map((curso) => curso.id === id ? { ...curso, ...data } : curso);
    return of(this.cursos);
  }
}