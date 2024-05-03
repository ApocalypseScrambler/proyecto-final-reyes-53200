import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUsuario } from '../models';


@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private usuarios: IUsuario[] = [
    
  ];
  
  constructor() {}

  getUsuarios(): Observable<IUsuario[]> {
    return of(this.usuarios);
  }

  getUsuarioPorId(id: number): Observable<IUsuario | undefined> {
    const usuario = this.usuarios.find(u => u.id === id);
    return of(usuario);
  }

  createUsuario(data: IUsuario) {
    const maxId = Math.max(...this.usuarios.map((usuario) => usuario.id));
    const newUsuario: IUsuario = {
      id: maxId + 1,
      usuario: data.usuario,
      password: data.password,
      email: data.email,
      rol: data.rol,
      fecha_creacion: new Date(),
      fecha_modificacion: new Date(),
    };
    this.usuarios = [...this.usuarios, newUsuario];
    return of(this.usuarios);
  }

  deleteUsuario(id: number) {
    this.usuarios = this.usuarios.filter((usuario) => usuario.id != id);
    return of(this.usuarios);
  }

  updateUsuario(id: number, data: IUsuario) {
    data.fecha_modificacion = new Date();
    this.usuarios = this.usuarios.map((usuario) => usuario.id === id ? { ...usuario, ...data } : usuario);
    return of(this.usuarios);
  }
}
