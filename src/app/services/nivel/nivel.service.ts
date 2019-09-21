import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelos
import { Grado } from '../../models/grado.model';
import { Nivel } from '../../models/nivel.model';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  actualizar(nivel: Nivel): Observable<Nivel> {
    const id = nivel.id;
    delete nivel.id;
    return this.httpClient.put<Nivel>(`/api/nivel/${id}`, nivel);
  }

  guardar(nivel: Nivel): Observable<Nivel> {
    return this.httpClient.post<Nivel>('/api/nivel', nivel);
  }

  obtenerPorId(id: number): Observable<Nivel> {
    return this.httpClient.get<Nivel>(`/api/nivel/${id}`);
  }

  obtener(criterio: string): Observable<Nivel[]> {
    return this.httpClient.get<Nivel[]>('/api/nivel', {
      params: new HttpParams()
        .set('q', criterio)
    });
  }

  obtenerGrados(nivel: Nivel, criterio: string = null): Observable<Grado[]> {
    return this.httpClient.get<Grado[]>(`/api/nivel/${nivel.id}/grados`, {
      params: new HttpParams()
        .set('q', criterio)
    });
  }

}
