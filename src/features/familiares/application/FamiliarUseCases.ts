import type { FamiliarRepository } from "../domain/ports/FamiliarRepository";
import type { Familiar } from "../domain/entities/Familiar";

export class GetFamiliaresUseCase {
  constructor(private readonly repository: FamiliarRepository) {}

  execute(): Promise<Familiar[]> {
    return this.repository.getAll();
  }
}

export class AddFamiliarUseCase {
  constructor(private readonly repository: FamiliarRepository) {}

  execute(emailFamiliar: string): Promise<Familiar> {
    return this.repository.add(emailFamiliar);
  }
}

export class DeleteFamiliarUseCase {
  constructor(private readonly repository: FamiliarRepository) {}

  execute(idFamiliar: string): Promise<void> {
    return this.repository.remove(idFamiliar);
  }
}
