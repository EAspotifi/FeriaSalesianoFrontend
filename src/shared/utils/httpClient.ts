import { env } from "../config/env";

export type ValidationErrors = Record<string, string[]>;

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly validationErrors?: ValidationErrors,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

type TokenProvider = () => string | null;

export interface TokenRefreshResult {
  token: string;
  refreshToken: string;
}

export interface AuthHttpHooks {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  refresh: (refreshToken: string) => Promise<TokenRefreshResult>;
  onSessionRefreshed: (tokens: TokenRefreshResult) => void;
  onSessionExpired: () => void;
}

export interface HttpClient {
  get<T>(path: string): Promise<T>;
  post<T>(path: string, body?: unknown): Promise<T>;
  delete<T>(path: string): Promise<T>;
  postPublic<T>(path: string, body?: unknown): Promise<T>;
}

interface RequestOptions {
  method: string;
  path: string;
  body?: unknown;
  skipAuth?: boolean;
  retried?: boolean;
}

/**
 * Cliente HTTP genérico (adaptador técnico compartido).
 * Soporta Bearer token y renovación automática vía /auth/refresh.
 */
export class FetchHttpClient implements HttpClient {
  constructor(
    private readonly baseUrl: string = env.apiBaseUrl,
    private readonly getToken: TokenProvider = () => null,
    private readonly authHooks: AuthHttpHooks | null = null,
  ) {}

  get<T>(path: string): Promise<T> {
    return this.request<T>({ method: "GET", path });
  }

  post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>({ method: "POST", path, body });
  }

  delete<T>(path: string): Promise<T> {
    return this.request<T>({ method: "DELETE", path });
  }

  /** Petición sin Bearer (login, signin, refresh). */
  postPublic<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>({ method: "POST", path, body, skipAuth: true });
  }

  private async request<T>({
    method,
    path,
    body,
    skipAuth = false,
    retried = false,
  }: RequestOptions): Promise<T> {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (!skipAuth) {
      const token = this.authHooks?.getAccessToken() ?? this.getToken();
      if (token) headers.Authorization = `Bearer ${token}`;
    }

    let response: Response;
    try {
      response = await fetch(`${this.baseUrl}${path}`, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    } catch {
      throw new HttpError(0, "No se pudo conectar con el servidor.");
    }

    if (
      response.status === 401 &&
      !skipAuth &&
      !retried &&
      this.authHooks &&
      path !== "/auth/refresh"
    ) {
      const refreshed = await this.tryRefresh();
      if (refreshed) {
        return this.request<T>({ method, path, body, skipAuth, retried: true });
      }
      this.authHooks.onSessionExpired();
      throw new HttpError(401, "Sesión expirada. Inicia sesión de nuevo.");
    }

    if (!response.ok) {
      throw await this.buildError(response);
    }

    if (response.status === 204) return undefined as T;

    const text = await response.text();
    return (text ? JSON.parse(text) : undefined) as T;
  }

  private async tryRefresh(): Promise<boolean> {
    if (!this.authHooks) return false;
    const refreshToken = this.authHooks.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const tokens = await this.authHooks.refresh(refreshToken);
      this.authHooks.onSessionRefreshed(tokens);
      return true;
    } catch {
      return false;
    }
  }

  private async buildError(response: Response): Promise<HttpError> {
    let detail: unknown;
    try {
      const data = await response.json();
      detail = (data as { detail?: unknown })?.detail ?? data;
    } catch {
      detail = null;
    }

    if (detail && typeof detail === "object" && !Array.isArray(detail)) {
      const validationErrors = detail as ValidationErrors;
      return new HttpError(response.status, "Datos inválidos.", validationErrors);
    }

    const message =
      typeof detail === "string" && detail.length > 0
        ? detail
        : `Error ${response.status}`;
    return new HttpError(response.status, message);
  }
}
