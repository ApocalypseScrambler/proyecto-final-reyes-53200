export type UsuarioRol = 'ADMIN' | 'USER';

export interface IUsuario {
  id: number;
  usuario: string;
  password: string;
  email: string;
  rol: UsuarioRol;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}