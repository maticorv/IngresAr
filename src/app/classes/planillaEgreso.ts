import { Persona } from '../interfaces/persona';
import { IVehiculo } from '../interfaces/vehiculo';
import { Empresa } from '../interfaces/empresa';

export class PlanillaEgreso {
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
