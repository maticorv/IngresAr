import { Persona } from './persona';
export interface IQr {
    id: number;
    codigoQR: string;
    fechaFinQR: Date;
    fotoQR: string;
    fotoQRContentType: string;
    tipoVisira: string;
    qrAutorizador: Persona;
    qrAutorizado: Persona;
    qrDomicilio: any;
}
