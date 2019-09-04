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

  guardar(materia: Materia): Observable<Materia> {
    return this.httpClient.post<Materia>('/api/materia/crear', materia);
  }
}
