export interface Registration {
  readonly username: string;
  readonly nombre: string;
  readonly correo: string;
  readonly password: string;
  readonly birth?: string | null;
}
