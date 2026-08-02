import type { AggregateResult } from "../../domain/entities/AggregateResult";
import type { MedicStatus } from "../../domain/entities/MedicStatus";
import type { MedicStatusMedia } from "../../domain/entities/MedicStatusMedia";
import type {
  AggregateResponseDto,
  MedicStatusDto,
  MedicStatusMediaDto,
} from "../dto/MedicStatusDtos";

export function mapMedicStatusDto(dto: MedicStatusDto): MedicStatus {
  return {
    id: dto.id,
    userId: dto.userId,
    bpm: dto.bpm,
    spo2: dto.spo2,
    temperature: dto.temperature,
    created: dto.created,
    idEstadoBpm: dto.idEstadoBpm,
    estadoBpm: dto.estadoBpm,
    idEstadoSpo2: dto.idEstadoSpo2,
    estadoSpo2: dto.estadoSpo2,
    idEstadoTemperature: dto.idEstadoTemperature,
    estadoTemperature: dto.estadoTemperature,
  };
}

export function mapMedicStatusMediaDto(dto: MedicStatusMediaDto): MedicStatusMedia {
  return {
    id: dto.id,
    userId: dto.userId,
    nombre: dto.nombre,
    bpm: dto.bpm,
    spo2: dto.spo2,
    temperature: dto.temperature,
    created: dto.created,
    idEstadoBpm: dto.idEstadoBpm,
    estadoBpm: dto.estadoBpm,
    idEstadoSpo2: dto.idEstadoSpo2,
    estadoSpo2: dto.estadoSpo2,
    idEstadoTemperature: dto.idEstadoTemperature,
    estadoTemperature: dto.estadoTemperature,
  };
}

export function mapAggregateDto(dto: AggregateResponseDto): AggregateResult {
  return {
    usuariosProcesados: dto.usuariosProcesados,
  };
}
