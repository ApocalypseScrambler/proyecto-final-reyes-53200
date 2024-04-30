export interface IClase {
    id: string;
    nombre: string;
    fechaInicio: Date;
    fechaFin: Date;
    horarioInicio:  string;
    horarioFin: string;
}

export interface ICreateClasePayload {
    nombre: string | null;
    fechaInicio: Date | null;
    fechaFin: Date | null;
    horarioInicio:  string | null;
    horarioFin: string | null;
}