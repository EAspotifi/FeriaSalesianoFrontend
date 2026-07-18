export interface MedicStatusMedia {
  readonly id: string;
  readonly userId: string;
  readonly nombre: string;
  readonly bpm: number;
  readonly spo2: number;
  readonly temperature: number;
  readonly created: string;
}
