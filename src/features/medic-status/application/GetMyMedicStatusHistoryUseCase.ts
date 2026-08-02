import type { PageQuery, PagedResult } from "../../../shared/types/PagedResult";
import type { MedicStatus } from "../domain/entities/MedicStatus";
import type { MedicStatusRepository } from "../domain/ports/MedicStatusRepository";

export class GetMyMedicStatusHistoryUseCase {
  constructor(private readonly repository: MedicStatusRepository) {}

  execute(query?: PageQuery): Promise<PagedResult<MedicStatus>> {
    return this.repository.getMyHistory(query);
  }
}
