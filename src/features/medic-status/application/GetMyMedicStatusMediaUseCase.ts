import type { MedicStatusMedia } from "../domain/entities/MedicStatusMedia";
import type { MedicStatusRepository } from "../domain/ports/MedicStatusRepository";

export class GetMyMedicStatusMediaUseCase {
  constructor(private readonly repository: MedicStatusRepository) {}

  execute(): Promise<MedicStatusMedia[]> {
    return this.repository.getMyMedia();
  }
}
