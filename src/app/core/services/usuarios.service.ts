import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUsuario } from '../../layouts/dashboard/pages/usuarios/models'; 

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios: IUsuario[] = [
    {
      id: 1,
      usuario: 'admin',
      password: 'pass',
      email: 'correo1@mail.com',
      rol: 'ADMIN',
      fecha_creacion: new Date('09/08/2021'),
      fecha_modificacion: new Date('09/08/2021'),
    },
    {
      id: 2,
      usuario: 'user',
      password: 'pass',
      email: 'correo2@mail.com',
      rol: 'USER',
      fecha_creacion: new Date('09/08/2021'),
      fecha_modificacion: new Date('09/08/2021'),
    }
  ];

  constructor() { }

  getUsuarios(): Observable<IUsuario[]> {
    return of(this.usuarios);
  }
}
