export interface UserDevice {
  readonly idDevice: string;
  readonly nombre: string;
  readonly usuario: {
    readonly id: string;
    readonly username: string;
    readonly nombre: string;
  };
}
