import type { MedicStatus } from "../domain/entities/MedicStatus";
import type { MedicStatusRepository } from "../domain/ports/MedicStatusRepository";

export class GetMyMedicStatusHistoryUseCase {
  constructor(private readonly repository: MedicStatusRepository) {}

  execute(): Promise<MedicStatus[]> {
    return this.repository.getMyHistory();
  }
}
