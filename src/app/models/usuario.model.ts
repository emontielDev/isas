import { Domicilio } from './common.model';

export class Usuario {
    constructor(
        public id: number,
        public nombre: string,
        public apaterno: string,
        public sexo: boolean,
        public correoElectronico?: string,
        public fechaNacimiento?: Date,
        public avatar?: string,
        public amaterno?: string,
        public curp?: string
    ) { }
}

// export class Profesor {
//     constructor(
//         public id: number,
//         public nombre: string,
//         public apaterno: string,
//         public sexo: boolean,
//         public correoElectronico: string,
//         public fechaNacimiento: Date,
//         public avatar?: string,
//         public amaterno?: string
//     ) { }

// }

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

export class NuevoProfesor {
    constructor(
        public nombre: string,
        public apaterno: string,
        public sexo: boolean,
        public fechaNacimiento: Date,
        public correoElectronico: string,
        public avatar?: string,
        public amaterno?: string
    ) { }
}


export class ActualizarProfesor {
    constructor(
        public id: number,
        public nombre: string,
        public apaterno: string,
        public sexo: boolean,
        public correoElectronico?: string,
        public fechaNacimiento?: Date,
        public avatar?: string,
        public amaterno?: string
    ) { }
}