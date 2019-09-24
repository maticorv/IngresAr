import { Persona } from './persona';
import { Vehiculo } from './vehiculo';
import { Empresa } from './empresa';

export interface PlanillaIngresoEgreso {
    id: number;
    autorizadoPrevio: boolean;
    acompaniantes: number;
    fechaIngreso: Date;
    fechaEgreso: Date;
    fecha: string;
    hora: Date;
    tipovisita: string;
    planillatipo?: any;
    planillabarrio?: any;
    planillapersona?: Persona;
    planillaqr?: any;
    planilladestino?: any;
    planillavehiculo?: Vehiculo;
    planillaempresa?: Empresa;
    planillaautorizador?: Persona;
}
