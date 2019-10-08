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
    planillabarrio?: any;
    planillapersona?: Persona;
    planillaqr?: any;
    planilladestino?: any;
    planillavehiculo?: IVehiculo;
    planillaempresa?: Empresa;
    planillaautorizador?: Persona;
}
