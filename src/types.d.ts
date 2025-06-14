declare interface AuthUser {
  sub: string;
  nickname: string;
  email: string;
  name?: string;
  [key: string]: any;
}

declare interface Suscripcion {
  id: number;
  tipoSuscripcion: string;
  precio: number;
};