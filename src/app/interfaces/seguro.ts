import { IAseguradora } from './aseguradora';
import { IVehiculo } from './vehiculo';
export interface Iseguro {
    fechaVencimientoSeguro: Date;
    id: number;
    seguroAseguradora: IAseguradora;
    seguroVehiculo: IVehiculo;
}
