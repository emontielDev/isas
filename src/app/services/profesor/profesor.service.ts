import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models
import { NuevoProfesor, Usuario, ActualizarProfesor } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(
    private httpClient: HttpClient
  ) { }

  actualizar(profesor: ActualizarProfesor): Observable<Usuario> {
    const id = profesor.id;
    delete profesor.id;
    return this.httpClient.put<Usuario>(`/api/profesor/${id}`, profesor);
  }

  actualizarAvatar(id: number, avatar: string): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`/api/profesor/${id}/avatar`, { avatar });
  }

  crear(profesor: NuevoProfesor): Observable<Usuario> {
    return this.httpClient.post<Usuario>('/api/profesor', profesor);
  }

  obtener(criterio: string): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>('/api/profesor', {
      params: new HttpParams()
        .set('q', criterio)
    });
  }

}
