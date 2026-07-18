export interface Device {
  readonly idDevice: string;
  readonly nombre: string;
}

/** Dispositivo con su asignación actual (null si está libre). */
export interface ManagedDevice {
  readonly idDevice: string;
  readonly nombre: string;
  readonly assignedTo: {
    readonly id: string;
    readonly username: string;
    readonly nombre: string;
  } | null;
}
