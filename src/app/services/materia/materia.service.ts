import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';

// Models
import { Materia } from '../../models/material.model';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  obtener(): Observable<Materia[]> {
    return this.httpClient.get<Materia[]>('/api/materia');
  }

  guardar(materia: Materia): Observable<Materia> {
    return this.httpClient.post<Materia>('/api/materia', materia);
  }
}
