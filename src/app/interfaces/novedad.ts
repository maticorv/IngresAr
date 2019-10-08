import { Persona } from 'src/app/interfaces/persona';
export interface Inovedad {
    id: number;
    fecha: Date;
    descripcion: string;
    creada?: Persona;
}
