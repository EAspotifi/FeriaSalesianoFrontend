import type { Familiar } from "../entities/Familiar";

export interface FamiliarRepository {
  getAll(): Promise<Familiar[]>;
  add(emailFamiliar: string): Promise<Familiar>;
  remove(idFamiliar: string): Promise<void>;
}
