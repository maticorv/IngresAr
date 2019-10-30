import { Persona } from './persona';
export interface IDomicilio {
        casaDomicilio: string;
        deptoDomicilio: number;
        domiciliopersonas: Persona[];
        id: number;
        manzanaDomicilio: string;
        pisoDomicilio: number;
}
