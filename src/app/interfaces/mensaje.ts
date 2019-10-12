import { Iaccount } from './account';
export interface IMensaje {
    descripcionMensaje: string;
    estadoMensaje: string;
    fechaHoraMensaje: Date;
    id: number;
    userDestino: Iaccount;
    userOrigen: Iaccount;
}
