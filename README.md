# Proyecto Feria Salesiano — Frontend

Frontend del sistema de monitoreo médico, construido con **React + Vite + TypeScript**, aplicando **Arquitectura Hexagonal (Ports & Adapters)**, **Vertical Slice Architecture** y principios de **Clean Architecture**.

Permite autenticarse y registrarse, consultar signos vitales (BPM, SpO₂ y temperatura), revisar el historial y sus promedios, consultar el perfil y administrar dispositivos. Consume la API FastAPI de `ProyectoFeriaSalesianoPy` y utiliza un tema visual azul y blanco.

---

## Stack

| Herramienta | Uso |
|-------------|-----|
| React 19 + TypeScript | UI |
| Vite 8 | Bundler y servidor de desarrollo |
| React Router 7 | Enrutamiento y rutas protegidas |
| Fetch API | Adaptador HTTP propio con renovación automática del token |
| oxlint | Análisis estático |

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
│   ├── layout/                 #   AppShell
│   └── main.tsx                #   Punto de entrada
│
├── shared/                     # Reutilizable entre features
│   ├── config/env.ts           #   Configuración de entorno
│   ├── ui/                     #   Componentes UI (Button, TextField)
│   └── utils/                  #   Cliente HTTP, formatos y utilidades
│
└── features/
    ├── auth/                   # Login, registro, sesión y refresh token
    ├── dashboard/              # Últimos signos vitales con polling
    ├── medic-status/           # Historial, promedios y agregación
    ├── profile/                # Perfil del usuario autenticado
    └── devices/                # Mis dispositivos y administración
```

Cada feature puede contener:

| Capa | Responsabilidad |
|------|-----------------|
| `domain/` | Entidades y puertos puros, sin React ni HTTP |
| `application/` | Casos de uso que dependen únicamente del dominio |
| `infrastructure/` | Adaptadores HTTP/storage y mapeo DTO ↔ dominio |
| `ui/` | Páginas, componentes y hooks de React |
| `di.ts` | Composición e inyección manual de dependencias |

### Reglas aplicadas

- **Domain**: sólo interfaces y tipos puros. Sin React, HTTP ni storage.
- **Application**: orquesta el dominio; depende de *ports*, nunca de implementaciones.
- **Infrastructure**: implementa los *ports*, mapea DTOs ↔ dominio. Sin lógica de negocio.
- **UI**: renderiza y consume casos de uso vía hooks. Sin `fetch` directo.
- **Dependency Injection**: cada feature compone e inyecta sus adaptadores desde `di.ts`.

---

## Funcionalidades y rutas

| Ruta | Acceso | Funcionalidad |
|------|--------|---------------|
| `/login` | Pública | Inicio de sesión |
| `/register` | Pública | Registro de usuario |
| `/` | Protegida | Dashboard con último BPM, SpO₂ y temperatura |
| `/history` | Protegida | Historial, promedios y agregación manual |
| `/profile` | Protegida | Perfil del usuario |
| `/devices` | Protegida | Dispositivos asignados al usuario |
| `/devices/manage` | Protegida | Crear, asignar, reasignar y eliminar dispositivos libres |

El dashboard consulta el último registro al iniciar y luego aplica polling. El intervalo se configura con `VITE_POLLING_INTERVAL_MS`.

En **Administrar dispositivos**:

- Se crean dispositivos indicando su nombre.
- Se busca al usuario destino por nombre o correo.
- Una asignación existente se reemplaza al seleccionar otro usuario.
- El botón de eliminación solo está habilitado para dispositivos sin asignación.
- El backend también valida la restricción y devuelve `409` si se intenta eliminar uno asignado.

---

## Autenticación y sesión

1. `LoginForm` (UI) usa el hook `useLogin`, que invoca `LoginUseCase`.
2. `LoginUseCase` usa el port `AuthRepository` → implementado por `HttpAuthRepository`.
3. `HttpAuthRepository` hace `POST /auth/login` y mapea el DTO de la API a la entidad `AuthSession`.
4. La sesión se persiste vía el port `SessionStorage` (`LocalStorageSessionStorage`).
5. `ProtectedRoute` protege las rutas privadas según el estado de autenticación.
6. Si una petición responde `401`, el cliente intenta renovar la sesión mediante `/auth/refresh`, actualiza ambos tokens y reintenta la petición una vez.

Endpoints consumidos de la API:

| Método | Ruta | Uso |
|--------|------|-----|
| `POST` | `/auth/login` | Autenticación (`username`, `password`) |
| `POST` | `/auth/signin` | Registro de usuario |
| `POST` | `/auth/refresh` | Renovación de access y refresh token |
| `GET` | `/users/profile` | Perfil del usuario (Bearer token) |
| `GET` | `/users?search=` | Usuarios y búsqueda por nombre o correo |
| `GET` | `/medic-status/last` | Última medición del usuario |
| `GET` | `/medic-status/me` | Historial del usuario |
| `GET` | `/medic-status/media/me` | Promedios del usuario |
| `POST` | `/medic-status/aggregate` | Crear promedios y limpiar historial |
| `GET` | `/user-devices/me` | Dispositivos del usuario |
| `GET` | `/devices` | Catálogo de dispositivos |
| `POST` | `/devices` | Crear dispositivo |
| `POST` | `/devices/assign` | Asignar o reasignar dispositivo |
| `DELETE` | `/devices/{idDevice}` | Eliminar un dispositivo libre |

---

## Instalación y ejecución

**Requisitos:** Node.js 20+ y el backend FastAPI en ejecución.

```bash
# 1. Entrar al proyecto e instalar dependencias
cd ProyectoFeriaSalesianoFront
npm install

# 2. Crear la configuración local
cp .env.example .env

# 3. Levantar el servidor de desarrollo
npm run dev
```

- **Aplicación:** http://localhost:5173

### Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción (`tsc` + `vite build`) |
| `npm run preview` | Previsualiza el build |
| `npm run lint` | Ejecuta oxlint |

---

## Variables de entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | URL base de la API FastAPI | `http://127.0.0.1:8000` |
| `VITE_POLLING_INTERVAL_MS` | Intervalo de actualización del último registro, en milisegundos | `5000` |

---

## Requisito del backend (CORS)

Para que el navegador pueda consumir la API, el backend debe permitir el origen del frontend. Los orígenes se configuran en el `.env` del backend con la variable `CORS_ORIGINS` (separados por comas); por defecto incluye `http://localhost:5173` y `http://127.0.0.1:5173`.

Asegúrate de tener el backend corriendo:

```bash
cd ../ProyectoFeriaSalesianoPy
uvicorn Presentation.main:app --reload --port 8000
```

---

## Verificación

```bash
npm run lint
npm run build
```

El build ejecuta primero la comprobación de TypeScript y después genera los archivos de producción con Vite.
