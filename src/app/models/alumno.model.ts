import { Domicilio } from './common.model';

export class Alumno {
    constructor(
        public id: number,
        public nombre: string,
        public apaterno: string,
        public avatar: string,
        public amaterno?: string,
        public curp?: string
    ) { }
}

export class CrearAlumno {
    constructor(
        public nombre: string,
        public apaterno: string,
        public sexo: boolean,
        public domicilio: Domicilio,
        public fechaNacimiento?: Date,
        public lugarNacimiento?: string,
        public nacionalidad?: string,
        public curp?: string,
        public correoElectronico?: string,
        public estadoCivil?: string,
        public hijos?: boolean,
        public hermanos?: boolean,
        public hHombres?: boolean,
        public hMujeres?: boolean,
        public viveConP?: boolean,
        public viveConM?: boolean,
        public trabaja?: boolean,
        public empresa?: string,
        public puesto?: string,
        public telefonoTrabajo?: string,

    ) { }
}
