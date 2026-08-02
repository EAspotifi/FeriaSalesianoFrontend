export interface UserProfile {
  readonly id: string;
  readonly username: string;
  readonly nombre: string;
  readonly correo: string;
  readonly birth: string | null;
}
