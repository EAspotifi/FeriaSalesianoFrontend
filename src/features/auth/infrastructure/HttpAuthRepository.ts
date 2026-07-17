import type { HttpClient } from "../../../shared/utils/httpClient";
import { FetchHttpClient } from "../../../shared/utils/httpClient";
import type { AuthSession } from "../domain/entities/AuthSession";
import type { Credentials } from "../domain/entities/Credentials";
import type { Registration } from "../domain/entities/Registration";
import type { User } from "../domain/entities/User";
import type { AuthRepository } from "../domain/ports/AuthRepository";
import type {
  LoginRequestDto,
  LoginResponseDto,
  ProfileResponseDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  SignInRequestDto,
  SignInResponseDto,
} from "./dto/AuthDtos";
import {
  mapLoginResponseToSession,
  mapProfileToUser,
  mapRefreshResponseToSession,
  mapSignInResponseToSession,
} from "./mappers/authMapper";

/** Adaptador HTTP que implementa el puerto AuthRepository contra la API FastAPI. */
export class HttpAuthRepository implements AuthRepository {
  constructor(private readonly http: HttpClient = new FetchHttpClient()) {}

  async login(credentials: Credentials): Promise<AuthSession> {
    const body: LoginRequestDto = {
      username: credentials.username,
      password: credentials.password,
    };
    const dto = await this.http.postPublic<LoginResponseDto>("/auth/login", body);
    return mapLoginResponseToSession(dto);
  }

  async register(registration: Registration): Promise<AuthSession> {
    const body: SignInRequestDto = {
      username: registration.username,
      nombre: registration.nombre,
      correo: registration.correo,
      password: registration.password,
    };
    const dto = await this.http.postPublic<SignInResponseDto>("/auth/signin", body);
    return mapSignInResponseToSession(dto);
  }

  async refresh(refreshToken: string): Promise<AuthSession> {
    const body: RefreshTokenRequestDto = { refreshToken };
    const dto = await this.http.postPublic<RefreshTokenResponseDto>("/auth/refresh", body);
    return mapRefreshResponseToSession(dto);
  }

  async getProfile(token: string): Promise<User> {
    const http = new FetchHttpClient(undefined, () => token);
    const dto = await http.get<ProfileResponseDto>("/users/profile");
    return mapProfileToUser(dto);
  }
}
