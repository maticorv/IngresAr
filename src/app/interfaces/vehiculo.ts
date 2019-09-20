import { Imarca } from './marca';
import { Icolor } from './color';

export interface Vehiculo {
    id: number;
    dominio: string;
    planillaIngresoEgreso?: any;
    detalleEvento?: any;
    vehiculomarca: Imarca;
    vehiculocolor: Icolor;
}
