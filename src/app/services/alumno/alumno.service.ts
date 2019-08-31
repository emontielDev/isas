import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Models
import { CrearAlumno } from '../../models/alumno.model';

@Injectable({
    providedIn: 'root'
})
export class AlumnoService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    crear(model: CrearAlumno): boolean {
        return true;
    }
}
