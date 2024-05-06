export type UsuarioRol = 'ADMIN' | 'USER';

export interface IUsuario {
  id: string;
  usuario: string;
  password: string;
  email: string;
  rol: UsuarioRol;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export interface ICreateUsuarioPayload {
  usuario: string | null;
  password: string | null;
  email: string | null;
  rol: UsuarioRol;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}