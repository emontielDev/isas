import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

// Modelos
import { Grado } from '../../models/grado.model';

@Injectable({
  providedIn: 'root'
})
export class GradoService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  actualizar(grado: Grado): Observable<Grado> {
    const id = grado.id;
    delete grado.id;
    return this.httpClient.put<Grado>(`/api/grado/${id}`, grado);
  }

  guardar(grado: Grado): Observable<Grado> {
    return this.httpClient.post<Grado>('/api/grado', grado);
  }
}
