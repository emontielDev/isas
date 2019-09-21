import { Nivel } from './nivel.model';

export class Grado {
    constructor(
        public id: number,
        public nivel: Nivel,
        public nombre: string
    ) { }
}
