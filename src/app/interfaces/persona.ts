import { IVehiculo } from './vehiculo';

export interface Persona {
    id: number;
    nombrePersona: string;
    apellidoPersona: string;
    dniPersona: number;
    telefonoPersona: number;
    personaUser: any;
    personabarrio: any;
    vehiculos: IVehiculo[];
    personadomicilios?: any;
}
