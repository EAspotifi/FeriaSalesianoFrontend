import type { PageQuery, PagedResult } from "../../../../shared/types/PagedResult";
import type { AggregateResult } from "../entities/AggregateResult";
import type { MedicStatus } from "../entities/MedicStatus";
import type { MedicStatusMedia } from "../entities/MedicStatusMedia";

export interface MedicStatusRepository {
  getLast(): Promise<MedicStatus | null>;
  getMyHistory(query?: PageQuery): Promise<PagedResult<MedicStatus>>;
  getMyMedia(query?: PageQuery): Promise<PagedResult<MedicStatusMedia>>;
  aggregate(): Promise<AggregateResult>;
}
