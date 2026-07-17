# Proyecto Feria Salesiano — Frontend

Frontend del sistema de monitoreo médico, construido con **React + Vite + TypeScript**, aplicando **Arquitectura Hexagonal (Ports & Adapters)** + **Vertical Slice Architecture** + principios de **Clean Architecture**.

Incluye una pantalla de **Login** que consume la API de Python (FastAPI) del proyecto `ProyectoFeriaSalesianoPy`. Tema visual: **azul y blanco**.

---

## Stack

| Herramienta | Uso |
|-------------|-----|
| React 19 + TypeScript | UI |
| Vite | Bundler / dev server |
| React Router | Enrutamiento y rutas protegidas |
| Fetch API | Cliente HTTP (adaptador propio) |

---

## Arquitectura

La regla de dependencias apunta siempre hacia el dominio. La UI nunca conoce HTTP ni la estructura de la API.

```
UI  →  Application (Use Cases)  →  Domain (Entidades + Ports)
                                        ▲
Infrastructure (Adapters HTTP/Storage) ─┘  implementa los Ports
```

### Estructura

```
src/
├── app/                        # Composición de la aplicación
│   ├── providers/              #   AppProviders (AuthProvider)
│   ├── router/                 #   AppRouter + ProtectedRoute
│   └── main.tsx                #   Punto de entrada
│
├── shared/                     # Reutilizable entre features
│   ├── config/env.ts           #   Configuración (VITE_API_BASE_URL)
│   ├── ui/                     #   Componentes UI (Button, TextField)
│   └── utils/httpClient.ts     #   Cliente HTTP genérico (adaptador técnico)
│
└── features/
    ├── auth/                   # Vertical slice de autenticación
    │   ├── domain/             #   Entidades (User, AuthSession) + Ports
    │   ├── application/        #   Casos de uso (Login, Logout, GetCurrentSession)
    │   ├── infrastructure/     #   HttpAuthRepository, LocalStorageSessionStorage, DTOs, mappers
    │   ├── ui/                 #   LoginPage, LoginForm, context, hooks
    │   └── di.ts               #   Inyección de dependencias (composición)
    └── dashboard/
        └── ui/DashboardPage.tsx
```

### Reglas aplicadas

- **Domain**: sólo interfaces y tipos puros. Sin React, HTTP ni storage.
- **Application**: orquesta el dominio; depende de *ports*, nunca de implementaciones.
- **Infrastructure**: implementa los *ports*, mapea DTOs ↔ dominio. Sin lógica de negocio.
- **UI**: renderiza y consume casos de uso vía hooks. Sin `fetch` directo.
- **Dependency Injection**: los adaptadores se instancian en `features/auth/di.ts` y se inyectan.

---

## Cómo funciona el login

1. `LoginForm` (UI) usa el hook `useLogin`, que invoca `LoginUseCase`.
2. `LoginUseCase` usa el port `AuthRepository` → implementado por `HttpAuthRepository`.
3. `HttpAuthRepository` hace `POST /auth/login` y mapea el DTO de la API a la entidad `AuthSession`.
4. La sesión se persiste vía el port `SessionStorage` (`LocalStorageSessionStorage`).
5. `ProtectedRoute` protege las rutas privadas según el estado de autenticación.

Endpoints consumidos de la API:

| Método | Ruta | Uso |
|--------|------|-----|
| `POST` | `/auth/login` | Autenticación (`username`, `password`) |
| `GET` | `/users/profile` | Perfil del usuario (Bearer token) |

---

## Instalación y ejecución

**Requisitos:** Node.js 20+.

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar la URL de la API (opcional; por defecto http://127.0.0.1:8000)
cp .env.example .env

# 3. Levantar el servidor de desarrollo
npm run dev
```

- App: http://localhost:5173

### Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción (`tsc` + `vite build`) |
| `npm run preview` | Previsualiza el build |
| `npm run lint` | Linter |

---

## Variables de entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | URL base de la API FastAPI | `http://127.0.0.1:8000` |

---

## Requisito del backend (CORS)

Para que el navegador pueda consumir la API, el backend debe permitir el origen del frontend.
Ya se añadió el middleware CORS en `ProyectoFeriaSalesianoPy/Presentation/main.py` habilitando
`http://localhost:5173` y `http://127.0.0.1:5173`.

Asegúrate de tener el backend corriendo:

```bash
cd ../ProyectoFeriaSalesianoPy
uvicorn Presentation.main:app --reload --port 8000
```
