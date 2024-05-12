import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClase, ICreateClasePayload } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ClasesService {
  constructor(private httpClient: HttpClient) {}

  getClases(): Observable<IClase[]> {
    return this.httpClient.get<IClase[]>(environment.baseAPIURL + '/class');
  }

  getClasesPorCurso(nombre: string): Observable<IClase[]> {
    return this.httpClient.get<IClase[]>(
      environment.baseAPIURL + '/class?nombre=' + nombre
    );
  }

  getClasesPorId(id: string): Observable<string> {
    return this.httpClient
      .get<IClase>(environment.baseAPIURL + '/class/' + id)
      .pipe(
        map((clase: IClase) => {
          const fechaInicioFormatted = this.formatDate(clase.fechaInicio);
          const fechaFinFormatted = this.formatDate(clase.fechaFin);
          return `ID: ${clase.id} Clase: ${clase.nombre} Fecha: ${fechaInicioFormatted} - ${fechaFinFormatted} Horario: ${clase.horarioInicio} - ${clase.horarioFin}`;
        })
      );
  }

  private formatDate(date: any): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }
  
    if (date instanceof Date && !isNaN(date.getTime())) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      return `${day}/${month}/${year}`;
    } else {
      return '';
    }
  }
  
  createClase(payload: ICreateClasePayload) {
    return this.httpClient.post<IClase>(
      environment.baseAPIURL + '/class',
      payload
    );
  }

  deleteClase(id: string) {
    return this.httpClient.delete<IClase>(
      environment.baseAPIURL + '/class/' + id
    );
  }

  updateClase(id: string, payload: ICreateClasePayload) {
    return this.httpClient.put<IClase>(
      environment.baseAPIURL + '/class/' + id,
      payload
    );
  }
}
