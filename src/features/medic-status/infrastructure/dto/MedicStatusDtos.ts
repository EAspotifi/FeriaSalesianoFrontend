export interface MedicStatusDto {
  id: string;
  userId: string;
  bpm: number;
  spo2: number;
  temperature: number;
  created: string;
  idEstadoBpm: number;
  estadoBpm: string;
  idEstadoSpo2: number;
  estadoSpo2: string;
  idEstadoTemperature: number;
  estadoTemperature: string;
}

export interface MedicStatusMediaDto {
  id: string;
  userId: string;
  nombre: string;
  bpm: number;
  spo2: number;
  temperature: number;
  created: string;
  idEstadoBpm: number;
  estadoBpm: string;
  idEstadoSpo2: number;
  estadoSpo2: string;
  idEstadoTemperature: number;
  estadoTemperature: string;
}

export interface AggregateResponseDto {
  usuariosProcesados: number;
}

export interface PagedDto<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
