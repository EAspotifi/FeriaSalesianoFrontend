import type { AggregateResult } from "../entities/AggregateResult";
import type { MedicStatus } from "../entities/MedicStatus";
import type { MedicStatusMedia } from "../entities/MedicStatusMedia";

export interface MedicStatusRepository {
  getLast(): Promise<MedicStatus | null>;
  getMyHistory(): Promise<MedicStatus[]>;
  getMyMedia(): Promise<MedicStatusMedia[]>;
  aggregate(): Promise<AggregateResult>;
}
