import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

// Models
import { CicloEscolar, NuevoCicloEscolar } from '../models/cicloescolar.model';

@Injectable({
  providedIn: 'root'
})
export class CicloescolarService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  crear(entidad: NuevoCicloEscolar): Observable<CicloEscolar> {
    return this.httpClient.post<CicloEscolar>('/api/ciclo-escolar', entidad);
  }

  obtenerPorId(id: number): Observable<CicloEscolar> {
    return this.httpClient.get(`/api/ciclo-escolar/${id}`);
  }

  obtenerUltimo(): Observable<CicloEscolar> {
    return this.httpClient.get(`/api/ciclo-escolar/vigente`);
  }
}
