import type { MedicReportResult } from "../domain/entities/MedicReportResult";
import type { ProfileRepository } from "../domain/ports/ProfileRepository";

export class SendMedicReportUseCase {
  constructor(private readonly repository: ProfileRepository) {}

  execute(enviarFamiliares: boolean): Promise<MedicReportResult> {
    return this.repository.sendMedicReport(enviarFamiliares);
  }
}
