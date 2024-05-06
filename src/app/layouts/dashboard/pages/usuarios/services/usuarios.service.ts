import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUsuario, ICreateUsuarioPayload } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
   
  constructor(private httpClient: HttpClient) {}

  getUsuarios(): Observable<IUsuario[]> {
    return this.httpClient.get<IUsuario[]>(environment.baseAPIURL + '/users');
  }

  getUsuarioPorId(id: string): Observable<IUsuario | undefined> {
    return this.httpClient.get<IUsuario>(environment.baseAPIURL + '/users/' + id);
  }

  createUsuario(payload: ICreateUsuarioPayload) {
    payload.fecha_creacion = new Date();
    payload.fecha_modificacion = new Date();
    return this.httpClient.post<IUsuario>(environment.baseAPIURL + '/users', payload);
  }

  deleteUsuario(id: string) {
    return this.httpClient.delete<IUsuario>(environment.baseAPIURL + '/users/' + id);
  }

  updateUsuario(id: string, payload: ICreateUsuarioPayload) {
    payload.fecha_modificacion = new Date();
    return this.httpClient.put<IUsuario>(environment.baseAPIURL + '/users/' + id, payload);
  }
}
