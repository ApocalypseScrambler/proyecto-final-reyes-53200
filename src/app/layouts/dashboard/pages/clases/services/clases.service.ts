import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IClase, ICreateClasePayload } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClasesService {
    
  constructor(private httpClient: HttpClient) {}

  getClases(): Observable<IClase[]> {
    return this.httpClient.get<IClase[]>(environment.baseAPIURL + '/class');
  }

  getClasesPorCurso(nombre: string): Observable<IClase[]> {
    return this.httpClient.get<IClase[]>(environment.baseAPIURL + '/class?nombre=' + nombre);
}

  createClase(payload: ICreateClasePayload) {
    return this.httpClient.post<IClase>(environment.baseAPIURL + '/class', payload);
  }

  deleteClase(id: string) {
    return this.httpClient.delete<IClase>(environment.baseAPIURL + '/class/' + id);
  }

  updateClase(id: string, payload: ICreateClasePayload) {
    return this.httpClient.put<IClase>(environment.baseAPIURL + '/class/' + id, payload)
  }
}