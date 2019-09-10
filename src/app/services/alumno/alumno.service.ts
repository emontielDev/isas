import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

// Models
import { CrearAlumno, Alumno } from '../../models/alumno.model';
import { RespuestaApi } from 'src/app/models/respuestamodel';


@Injectable({
    providedIn: 'root'
})
export class AlumnoService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    crear(model: CrearAlumno): Observable<RespuestaApi> {
        return this.httpClient.post<RespuestaApi>('/api/alumno', model);
    }

    obtener(criterio: string): Observable<Alumno[]> {
        return this.httpClient.get<Alumno[]>('/api/alumno', {
            params: new HttpParams()
                .set('q', criterio)
        });
    }
}
