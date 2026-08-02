export interface MedicStatus {
  readonly id: string;
  readonly userId: string;
  readonly bpm: number;
  readonly spo2: number;
  readonly temperature: number;
  readonly created: string;
  readonly idEstadoBpm: number;
  readonly estadoBpm: string;
  readonly idEstadoSpo2: number;
  readonly estadoSpo2: string;
  readonly idEstadoTemperature: number;
  readonly estadoTemperature: string;
}
