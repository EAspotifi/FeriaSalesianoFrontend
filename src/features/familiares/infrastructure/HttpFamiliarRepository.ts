import type { HttpClient } from "../../../shared/utils/httpClient";
import type { Familiar } from "../domain/entities/Familiar";
import type { FamiliarRepository } from "../domain/ports/FamiliarRepository";
import type { AddFamiliarRequestDto, FamiliarResponseDto } from "./dto/FamiliarDtos";

function mapFamiliar(dto: FamiliarResponseDto): Familiar {
  return {
    idFamiliar: dto.idFamiliar,
    emailFamiliar: dto.emailFamiliar,
  };
}

export class HttpFamiliarRepository implements FamiliarRepository {
  constructor(private readonly http: HttpClient) {}

  async getAll(): Promise<Familiar[]> {
    const dtos = await this.http.get<FamiliarResponseDto[]>("/users/familiares");
    return dtos.map(mapFamiliar);
  }

  async add(emailFamiliar: string): Promise<Familiar> {
    const body: AddFamiliarRequestDto = { emailFamiliar };
    const dto = await this.http.post<FamiliarResponseDto>("/users/familiares", body);
    return mapFamiliar(dto);
  }

  async remove(idFamiliar: string): Promise<void> {
    await this.http.delete(`/users/familiares/${idFamiliar}`);
  }
}
