export interface MedicStatusDto {
  id: string;
  userId: string;
  rpm: number;
  tmp: number;
  created: string;
}

export interface MedicStatusMediaDto {
  id: string;
  userId: string;
  nombre: string;
  rpm: number;
  tmp: number;
  created: string;
}

export interface AggregateResponseDto {
  usuariosProcesados: number;
  registrosEliminados: number;
}
