import type { AggregateResult } from "../domain/entities/AggregateResult";
import type { MedicStatusRepository } from "../domain/ports/MedicStatusRepository";

export class AggregateMedicStatusUseCase {
  constructor(private readonly repository: MedicStatusRepository) {}

  execute(): Promise<AggregateResult> {
    return this.repository.aggregate();
  }
}
