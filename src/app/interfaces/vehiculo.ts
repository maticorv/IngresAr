import { Imarca } from './marca';
import { Icolor } from './color';
import { Imodelo } from './modelo';

export interface IVehiculo {
    id: number;
    dominio: string;
    vehiculoMarca?: any;
    vehiculoColor?: any;
    vehiculoModelo?: any;
}
