import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAlumno, ICreateAlumnoPayload } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  constructor(private httpClient: HttpClient) {}

  getAlumnos(): Observable<IAlumno[]> {
    return this.httpClient.get<IAlumno[]>(environment.baseAPIURL + '/students');
  }

  createAlumno(payload: ICreateAlumnoPayload) {
    const payloadWithClases = { ...payload, clases: [] };
    return this.httpClient.post<IAlumno>(
      environment.baseAPIURL + '/students',
      payloadWithClases
    );
  }

  deleteAlumno(id: string) {
    return this.httpClient.delete<IAlumno>(
      environment.baseAPIURL + '/students/' + id
    );
  }

  updateAlumno(id: string, payload: ICreateAlumnoPayload) {
    return this.httpClient.put<IAlumno>(
      environment.baseAPIURL + '/students/' + id,
      payload
    );
  }
}
