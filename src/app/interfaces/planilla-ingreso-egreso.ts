import { Persona } from './persona';
import { IVehiculo } from './vehiculo';
import { Empresa } from './empresa';

export interface IPlanillaIngresoEgreso {
    id: number;
    autorizadoPrevio: boolean;
    acompaniantes: number;
    fechaIngreso: Date;
    fechaEgreso: Date;
    tipovisita: string;
    planillatipo?: any;
    planillaBarrio?: any;
    planillaPersona?: Persona;
    planillaQr?: any;
    planillaDestino?: any;
    planillaVehiculo?: IVehiculo;
    planillaEmpresa?: Empresa;
    planillaAutorizador?: Persona;
    ingresoAPie: boolean;
    planillaAcompaniantes: any;
}
