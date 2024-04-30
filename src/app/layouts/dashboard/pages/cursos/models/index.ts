export interface ICurso {
    id: string;
    nombre: string;
    jornada: string;
  }

  export interface ICreateCursoPayload {
    nombre: string | null;
    jornada: string | null;
  }