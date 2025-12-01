export class VisitanteModel {
    conductor?: {
        cedula?: string;
        nombre?: string;
        apellido?: string;
        telefono?: string;
        correo?: string;
    };
    placa?: string;
    tipoVehiculo?: string;
    marca?: string;
    modelo?: string;
    color?: string;
    fechaCaducidad?: string;
    parqueaderoId?: number;
    motivoVisita?: string;
}
