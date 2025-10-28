export class UsuarioValidadoModel {
  access_token?: string;
  user?: {
    id: number;
    nombre: string;
    correo: string;
    rol: string;
  };
}
