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
    rpm: dto.rpm,
    tmp: dto.tmp,
    created: dto.created,
  };
}

export function mapMedicStatusMediaDto(dto: MedicStatusMediaDto): MedicStatusMedia {
  return {
    id: dto.id,
    userId: dto.userId,
    nombre: dto.nombre,
    rpm: dto.rpm,
    tmp: dto.tmp,
    created: dto.created,
  };
}

export function mapAggregateDto(dto: AggregateResponseDto): AggregateResult {
  return {
    usuariosProcesados: dto.usuariosProcesados,
    registrosEliminados: dto.registrosEliminados,
  };
}
