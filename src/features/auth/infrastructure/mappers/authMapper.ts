import type { AuthSession } from "../../domain/entities/AuthSession";
import type { User } from "../../domain/entities/User";
import type {
  LoginResponseDto,
  ProfileResponseDto,
  RefreshTokenResponseDto,
  SignInResponseDto,
} from "../dto/AuthDtos";

/** Mapea los DTOs de la API hacia entidades del dominio. */
export function mapLoginResponseToSession(dto: LoginResponseDto): AuthSession {
  return {
    token: dto.token,
    refreshToken: dto.refreshToken,
    user: {
      id: dto.userId,
      username: dto.username,
      nombre: dto.nombre,
    },
  };
}

export function mapSignInResponseToSession(dto: SignInResponseDto): AuthSession {
  return {
    token: dto.token,
    refreshToken: dto.refreshToken,
    user: {
      id: dto.userId,
      username: dto.username,
      nombre: dto.nombre,
      correo: dto.correo,
    },
  };
}

export function mapRefreshResponseToSession(dto: RefreshTokenResponseDto): AuthSession {
  return {
    token: dto.token,
    refreshToken: dto.refreshToken,
    user: {
      id: dto.userId,
      username: dto.username,
      nombre: dto.nombre,
    },
  };
}

export function mapProfileToUser(dto: ProfileResponseDto): User {
  return {
    id: dto.id,
    username: dto.username,
    nombre: dto.nombre,
    correo: dto.correo,
  };
}
