/** DTOs tal como los expone la API de Python. No son entidades del dominio. */

export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  refreshToken: string;
  userId: string;
  username: string;
  nombre: string;
}

export interface SignInRequestDto {
  username: string;
  nombre: string;
  correo: string;
  password: string;
  birth?: string | null;
}

export interface SignInResponseDto {
  userId: string;
  username: string;
  nombre: string;
  correo: string;
  token: string;
  refreshToken: string;
  birth?: string | null;
}

export interface RefreshTokenRequestDto {
  refreshToken: string;
}

export interface RefreshTokenResponseDto {
  token: string;
  refreshToken: string;
  userId: string;
  username: string;
  nombre: string;
}

export interface ProfileResponseDto {
  id: string;
  username: string;
  nombre: string;
  correo: string;
  birth?: string | null;
}
