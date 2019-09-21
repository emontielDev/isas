import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

// Models
import { CrearAlumno, Usuario } from '../../models/usuario.model';
import { RespuestaApi } from 'src/app/models/respuestamodel';


@Injectable({
    providedIn: 'root'
})
export class AlumnoService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    actualizarAvatar(id: number, avatar: string): Observable<Usuario> {
        return this.httpClient.put<Usuario>(`/api/alumno/${id}/avatar`, { avatar });
    }

    crear(model: CrearAlumno): Observable<RespuestaApi> {
        return this.httpClient.post<RespuestaApi>('/api/alumno', model);
    }

    obtener(criterio: string): Observable<Usuario[]> {
        return this.httpClient.get<Usuario[]>('/api/alumno', {
            params: new HttpParams()
                .set('q', criterio)
        });
    }
}
