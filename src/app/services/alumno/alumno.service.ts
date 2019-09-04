import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

// Models
import { CrearAlumno } from '../../models/alumno.model';
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
}
