import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICurso, ICreateCursoPayload } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
      
  constructor(private httpClient: HttpClient) {}

  getCursos(): Observable<ICurso[]> {
    return this.httpClient.get<ICurso[]>(environment.baseAPIURL + '/courses');
  }

  createCurso(payload: ICreateCursoPayload) {
    return this.httpClient.post<ICurso>(environment.baseAPIURL + '/courses', payload);
  }

  deleteCurso(id: string) {
    return this.httpClient.delete<ICurso>(environment.baseAPIURL + '/courses/' + id);
  }

  updateCurso(id: string, payload: ICreateCursoPayload) {
    return this.httpClient.put<ICurso>(environment.baseAPIURL + '/courses/' + id, payload)
  }
}