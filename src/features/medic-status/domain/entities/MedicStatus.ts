export interface MedicStatus {
  readonly id: string;
  readonly userId: string;
  readonly bpm: number;
  readonly spo2: number;
  readonly temperature: number;
  readonly created: string;
}
