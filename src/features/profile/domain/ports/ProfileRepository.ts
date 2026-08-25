import type { MedicReportResult } from "../entities/MedicReportResult";
import type { UserProfile } from "../entities/UserProfile";

export interface ProfileRepository {
  getProfile(): Promise<UserProfile>;
  sendMedicReport(enviarFamiliares: boolean): Promise<MedicReportResult>;
}
