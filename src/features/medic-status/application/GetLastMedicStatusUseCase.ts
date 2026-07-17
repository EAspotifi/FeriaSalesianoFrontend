import type { MedicStatus } from "../domain/entities/MedicStatus";
import type { MedicStatusRepository } from "../domain/ports/MedicStatusRepository";

export class GetLastMedicStatusUseCase {
  constructor(private readonly repository: MedicStatusRepository) {}

  execute(): Promise<MedicStatus | null> {
    return this.repository.getLast();
  }
}
