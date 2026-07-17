import type { HttpClient } from "../../../shared/utils/httpClient";
import type { AggregateResult } from "../domain/entities/AggregateResult";
import type { MedicStatus } from "../domain/entities/MedicStatus";
import type { MedicStatusMedia } from "../domain/entities/MedicStatusMedia";
import type { MedicStatusRepository } from "../domain/ports/MedicStatusRepository";
import type {
  AggregateResponseDto,
  MedicStatusDto,
  MedicStatusMediaDto,
} from "./dto/MedicStatusDtos";
import {
  mapAggregateDto,
  mapMedicStatusDto,
  mapMedicStatusMediaDto,
} from "./mappers/medicStatusMapper";

export class HttpMedicStatusRepository implements MedicStatusRepository {
  constructor(private readonly http: HttpClient) {}

  async getLast(): Promise<MedicStatus | null> {
    const dto = await this.http.get<MedicStatusDto | null>("/medic-status/last");
    return dto ? mapMedicStatusDto(dto) : null;
  }

  async getMyHistory(): Promise<MedicStatus[]> {
    const dtos = await this.http.get<MedicStatusDto[]>("/medic-status/me");
    return dtos.map(mapMedicStatusDto);
  }

  async getMyMedia(): Promise<MedicStatusMedia[]> {
    const dtos = await this.http.get<MedicStatusMediaDto[]>("/medic-status/media/me");
    return dtos.map(mapMedicStatusMediaDto);
  }

  async aggregate(): Promise<AggregateResult> {
    const dto = await this.http.post<AggregateResponseDto>("/medic-status/aggregate");
    return mapAggregateDto(dto);
  }
}
