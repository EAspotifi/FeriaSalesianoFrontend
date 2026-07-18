export interface MedicStatusDto {
  id: string;
  userId: string;
  bpm: number;
  spo2: number;
  temperature: number;
  created: string;
}

export interface MedicStatusMediaDto {
  id: string;
  userId: string;
  nombre: string;
  bpm: number;
  spo2: number;
  temperature: number;
  created: string;
}

export interface AggregateResponseDto {
  usuariosProcesados: number;
  registrosEliminados: number;
}
