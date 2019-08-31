export class Domicilio {
    constructor(
        public calle: string,
        public codigoPostal: string,
        public numeroInterior?: string,
        public numeroExterior?: string,
        public delegacion?: string,
        public estado?: string,
    ) { }
}
