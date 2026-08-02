import type { PageQuery, PagedResult } from "../../../shared/types/PagedResult";
import type { MedicStatusMedia } from "../domain/entities/MedicStatusMedia";
import type { MedicStatusRepository } from "../domain/ports/MedicStatusRepository";

export class GetMyMedicStatusMediaUseCase {
  constructor(private readonly repository: MedicStatusRepository) {}

  execute(query?: PageQuery): Promise<PagedResult<MedicStatusMedia>> {
    return this.repository.getMyMedia(query);
  }
}
