# JAC Manager

Plataforma web para la gestión de Juntas de Acción Comunal (JAC) en Colombia.
Permite digitalizar y centralizar la administración de miembros, anuncios,
actas, tesorería e inventario de una junta comunal.

Proyecto académico — SENA Ficha 3466384

---

## Tecnologías

### Backend
- Java 25
- Spring Boot 4.0.6
- Arquitectura MVC Modular
- Spring Security + JWT
- Spring Data JPA + Flyway
- PostgreSQL

### Frontend
- React + TypeScript (Vite)
- Axios

### Infraestructura
- Docker + Docker Compose

---

## Requisitos previos

### Con Docker (recomendado)
- Docker Desktop instalado y corriendo
- Docker Compose v2+

### Local
- Java 25
- Maven 3.9+
- Node.js 20+ y pnpm
- PostgreSQL 16+ corriendo localmente

---

## Instalación y ejecución

### Opción 1 — Docker Compose (recomendado)

Clona el repositorio:

```bash
git clone https://github.com/[organización]/jac-manager.git
cd jac-manager
```

Copia los archivos de variables de entorno:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Levanta todos los servicios:

```bash
docker-compose up --build
```

Los servicios quedan disponibles en:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- Base de datos: localhost:5432

Para detener los servicios:

```bash
docker-compose down
```

---

### Opción 2 — Ejecución local

#### Base de datos

Crea una base de datos PostgreSQL llamada `jac_manager` y un usuario con
permisos sobre ella. Configura las credenciales en `backend/.env`.

#### Backend

```bash
cd backend
cp .env.example .env
# Edita .env con tus credenciales locales
./mvnw spring-boot:run
```

La API queda disponible en http://localhost:8080

#### Frontend

```bash
cd frontend
cp .env.example .env
# Edita .env con la URL de la API: VITE_API_URL=http://localhost:8080
pnpm install
pnpm dev
```

El frontend queda disponible en http://localhost:5173

---

## Variables de entorno

### `backend/.env.example`

```env
DB_URL=jdbc:postgresql://localhost:5432/jac_manager
DB_USER=postgres
DB_PASSWORD=tu_contraseña
JWT_SECRET=tu_clave_secreta
JWT_EXPIRATION_MS=86400000
```

### `frontend/.env.example`

```env
VITE_API_URL=http://localhost:8080
```

---

## Estructura del proyecto

```
jac-manager/
├── backend/          # API REST — Spring Boot
├── frontend/         # Cliente web — React + TypeScript
├── .github/          # Plantillas de Issues y flujos CI/CD
├── docker-compose.yml
├── README.md
└── CONTRIBUTING.md
```

---

## Equipo

| Nombre                       | Rol            |
|------------------------------|----------------|
| Vanessa Vergara Varela       | Desarrolladora |
| Daniel Felipe Martínez Fagua | Desarrollador  |
| Sebastian Orjuela Giraldo    | Desarrollador  |
| Styven Martínez Erazo        | Desarrollador  |
