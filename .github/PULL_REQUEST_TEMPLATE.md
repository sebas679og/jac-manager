---
name: Pull Request
about: Plantilla estándar para Pull Requests en JAC Manager
---

## Descripción
Descripción clara y concisa de los cambios realizados en este PR.

## Tipo de cambio
- [ ] `feat` — Nueva funcionalidad
- [ ] `fix` — Corrección de error
- [ ] `refactor` — Mejora de código sin cambios funcionales
- [ ] `docs` — Documentación
- [ ] `test` — Pruebas
- [ ] `chore` — Mantenimiento o configuración

## Issues relacionados
Cierra #

## Módulo afectado
- [ ] Backend
- [ ] Frontend
- [ ] Ambos
- [ ] Configuración / infraestructura

## Checklist backend
> Omitir si el PR no toca el módulo `backend/`

- [ ] `./mvnw spotless:apply` ejecutado sin errores
- [ ] `./mvnw checkstyle:check` ejecutado sin errores
- [ ] `./mvnw pmd:check` ejecutado sin errores
- [ ] `./mvnw -B clean verify` ejecutado sin errores

## Checklist frontend
> Omitir si el PR no toca el módulo `frontend/`

- [ ] `pnpm lint:fix` ejecutado
- [ ] `pnpm lint` pasa sin errores
- [ ] `pnpm format` ejecutado
- [ ] `pnpm coverage` pasa sin errores

## Checklist general
- [ ] El código compila sin errores
- [ ] Los criterios de aceptación del Issue relacionado están cumplidos
- [ ] No se suben archivos `.env` ni credenciales reales
- [ ] Los commits siguen la convención establecida en el CONTRIBUTING
- [ ] El PR apunta a la rama `dev`, no a `main`

## Capturas de pantalla
Si aplica, agregar capturas que evidencien el funcionamiento del cambio.

## Notas adicionales
Contexto adicional, decisiones técnicas tomadas o puntos a revisar
con el equipo.