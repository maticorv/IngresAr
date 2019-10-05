import { Marca } from './marca';

export class Vehiculo {
    id: number;
    dominio: string;
    vehiculoModelo?: any;
    vehiculoMarca?: Marca;
    vehiculoColor?: any;
}
