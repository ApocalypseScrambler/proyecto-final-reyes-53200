export interface IAlumno {
    id: string;
    nombre: string;
    apellido: string;
    edad: number;
    correo: string;
    clases: string[];
  }

  export interface ICreateAlumnoPayload {
    nombre: string | null;
    apellido: string | null;
    edad: number | null;
    correo: string | null;
    clases: string[] | null;
  }