import { IPersonaEstado } from '../interfaces/ipersona-estado';

export class Acompaniante {
    nombrePersona: string;
    apellidoPersona: string;
    dniPersona: number;
    telefonoPersona: number;
    id: number;
    personaEstado: IPersonaEstado;
}
