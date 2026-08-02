import type { PageQuery, PagedResult } from "../../../shared/types/PagedResult";
import { buildQuery } from "../../../shared/types/PagedResult";
import type { HttpClient } from "../../../shared/utils/httpClient";
import type { AggregateResult } from "../domain/entities/AggregateResult";
import type { MedicStatus } from "../domain/entities/MedicStatus";
import type { MedicStatusMedia } from "../domain/entities/MedicStatusMedia";
import type { MedicStatusRepository } from "../domain/ports/MedicStatusRepository";
import type {
  AggregateResponseDto,
  MedicStatusDto,
  MedicStatusMediaDto,
  PagedDto,
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

  async getMyHistory(query?: PageQuery): Promise<PagedResult<MedicStatus>> {
    const dto = await this.http.get<PagedDto<MedicStatusDto>>(
      `/medic-status/me${buildQuery(query ?? { page: 1, pageSize: 10 })}`,
    );
    return {
      items: dto.items.map(mapMedicStatusDto),
      page: dto.page,
      pageSize: dto.pageSize,
      total: dto.total,
      totalPages: dto.totalPages,
    };
  }

  async getMyMedia(query?: PageQuery): Promise<PagedResult<MedicStatusMedia>> {
    const dto = await this.http.get<PagedDto<MedicStatusMediaDto>>(
      `/medic-status/media/me${buildQuery(query ?? { page: 1, pageSize: 10 })}`,
    );
    return {
      items: dto.items.map(mapMedicStatusMediaDto),
      page: dto.page,
      pageSize: dto.pageSize,
      total: dto.total,
      totalPages: dto.totalPages,
    };
  }

  async aggregate(): Promise<AggregateResult> {
    const dto = await this.http.post<AggregateResponseDto>("/medic-status/aggregate");
    return mapAggregateDto(dto);
  }
}
