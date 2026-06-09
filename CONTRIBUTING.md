# Guía de contribución — JAC Manager

Gracias por contribuir al proyecto. Lee esta guía antes de empezar
a trabajar para mantener la consistencia en todo el repositorio.

---

## Flujo de trabajo con ramas

Trabajamos con la siguiente estrategia de ramas:

| Rama          | Propósito                                                             |
|---------------|-----------------------------------------------------------------------|
| `main`        | Código estable listo para producción. Solo recibe merges desde `dev`. |
| `dev`         | Rama de integración. Aquí se consolidan las funcionalidades.          |
| `feat/nombre` | Nueva funcionalidad. Se crea desde `dev`.                             |
| `fix/nombre`  | Corrección de error. Se crea desde `dev`.                             |
| `docs/nombre` | Cambios de documentación. Se crea desde `dev`.                        |

### Pasos para trabajar en una nueva tarea

1. Asegúrate de estar actualizado:
```bash
git checkout dev
git pull origin dev
```

2. Crea tu rama desde `dev`:
```bash
git checkout -b feat/nombre-funcionalidad
```

3. Desarrolla, haz commits y sube tu rama:
```bash
git push origin feat/nombre-funcionalidad
```

4. Abre un Pull Request hacia `dev` desde GitHub.
5. Espera la revisión de al menos un compañero antes de hacer merge.

---

## Convenciones de commits

Los commits se escriben **en español** para facilitar la comunicación
del equipo. Seguimos el estándar Conventional Commits adaptado:

### Formato

```
tipo(módulo): descripción breve en imperativo

Descripción adicional si es necesario.

Cierra #número-de-issue
```

### Tipos de commit

| Tipo       | Cuándo usarlo                              |
|------------|--------------------------------------------|
| `feat`     | Nueva funcionalidad                        |
| `fix`      | Corrección de un error                     |
| `docs`     | Cambios en documentación                   |
| `test`     | Agregar o modificar pruebas                |
| `refactor` | Mejora de código sin cambios funcionales   |
| `chore`    | Mantenimiento, dependencias, configuración |
| `style`    | Cambios de formato o estilo (sin lógica)   |

### Módulos disponibles

`autenticacion` · `juntas` · `afiliaciones` · `anuncios` ·
`actas` · `tesoreria` · `inventario` · `eventos` · `config` · `docs`

### Ejemplos

```bash
feat(tesoreria): agregar endpoint para registrar movimientos

Se implementó el endpoint POST /api/tesoreria/movimientos con
validación de monto y tipo de movimiento (ingreso/egreso).

resolve #9
```

```bash
fix(autenticacion): corregir validacion de token expirado

El sistema no retornaba 401 correctamente cuando el token JWT
habia expirado. Se ajustó el filtro de seguridad.

resolve #9
```

```bash
docs(config): actualizar instrucciones de instalacion en README
```

### Reglas importantes

- La descripción va en **minúsculas** y en **modo imperativo**
  ("agregar", "corregir", "actualizar", no "agregué" ni "agregando").
- Máximo 72 caracteres en la primera línea.
- Si el commit cierra un Issue, incluir `Cierra #número` al final.
- **No subir archivos `.env`** con credenciales reales bajo ninguna
  circunstancia.

---

## Cómo abrir un Issue

1. Ve a la pestaña **Issues** del repositorio.
2. Haz clic en **New Issue**.
3. Selecciona la plantilla correspondiente:
    - `Requisito Funcional` — para RFs del SRS
    - `Historia de Usuario` — para HUs
    - `Bug Report` — para errores
4. Completa todos los campos de la plantilla.
5. Asigna las etiquetas de tipo, módulo y prioridad correspondientes.
6. Asigna el Milestone al que pertenece.
7. Asígnate a ti mismo si vas a trabajar en él.

---

## Checklist antes de abrir un Pull Request (backend)

Antes de abrir un PR en el módulo `backend/`, asegúrate de ejecutar
los siguientes comandos en orden y de que todos pasen sin errores:

### 1. Aplicar formato de código

```bash
./mvnw spotless:apply
```

Corrige automáticamente el formato del código fuente según las reglas
configuradas. Ejecuta este comando **antes** de los siguientes para
evitar falsos errores de estilo.

### 2. Verificar estilo de código

```bash
./mvnw checkstyle:check
```

Valida que el código cumple con las reglas de estilo del proyecto.
Si reporta errores, corrígelos antes de continuar.

### 3. Verificar reglas PMD

```bash
./mvnw pmd:check
```

Analiza el código en busca de malas prácticas, código duplicado y
posibles errores lógicos. Corrige los hallazgos antes de continuar.

### 4. Ejecutar pruebas

Solo pruebas, omitiendo verificaciones de estilo:

```bash
./mvnw -B clean verify "-Dspotless.check.skip=true" "-Dcheckstyle.skip=true" "-Dpmd.skip=true"
```

Pruebas completas incluyendo verificación de estilos (equivalente al
pipeline de CI):

```bash
./mvnw -B clean verify
```

Usa el segundo comando para la verificación final antes de abrir el PR.
Si pasa localmente, debe pasar en el pipeline.

---

### Resumen del orden de ejecución

```bash
# Desde el directorio backend/

./mvnw spotless:apply          # 1. Formatear
./mvnw checkstyle:check        # 2. Verificar estilo
./mvnw pmd:check               # 3. Verificar PMD
./mvnw -B clean verify         # 4. Pruebas completas con estilos
```

> **Nota:** No abrir el PR si alguno de estos comandos falla.
> El pipeline de CI ejecuta los mismos pasos y rechazará el PR
> automáticamente.

### Versionamiento

JAC Manager sigue **[Versionamiento Semántico](https://semver.org/)** (`MAYOR.MENOR.PARCHE`).

| Tipo de cambio                        | Incremento | Ejemplo            |
|---------------------------------------|------------|--------------------|
| Corrección de error                   | Parche     | `0.1.0 → 0.1.1`    |
| Nueva funcionalidad (compatible)      | Menor      | `0.1.0 → 0.2.0`    |
| Cambio que rompe compatibilidad       | Mayor      | `0.1.0 → 1.0.0`    |

**Siempre actualiza la versión antes de abrir un PR.** Usa el plugin
Maven Versions para evitar ediciones manuales en el `pom.xml`:

```bash
./mvnw versions:set "-DnewVersion=0.2.0" "-DgenerateBackupPoms=false"
```

Luego haz el cambio de versión en un commit dedicado e independiente:

```bash
git add pom.xml
git commit -m "chore: actualizar version a 0.2.0"
```

---

## Checklist antes de abrir un Pull Request (frontend)

Antes de abrir un PR en el módulo `frontend/`, asegúrate de ejecutar
los siguientes comandos en orden y de que todos pasen sin errores:

### 1. Corregir problemas de estilo automáticamente

```bash
pnpm lint:fix
```

Corrige automáticamente los problemas de ESLint que tengan solución
automática. Ejecuta este comando **antes** de los siguientes para
evitar falsos errores en la verificación.

### 2. Verificar reglas de linting

```bash
pnpm lint
```

Valida que el código cumple con las reglas de ESLint del proyecto.
Si reporta errores que `lint:fix` no resolvió, corrígelos manualmente
antes de continuar.

### 3. Formatear el código

```bash
pnpm format
```

Aplica el formato de Prettier sobre todos los archivos en `src/`.
Ejecuta esto antes de hacer el commit final.

### 4. Ejecutar pruebas con cobertura

```bash
pnpm coverage
```

Ejecuta todas las pruebas y genera el reporte de cobertura. Este es
el comando equivalente al que corre el pipeline de CI, úsalo para
la verificación final antes de abrir el PR.

Si quieres correr las pruebas rápidamente sin el reporte de cobertura:

```bash
pnpm test:run
```

---

### Resumen del orden de ejecución

```bash
# Desde el directorio frontend/

pnpm lint:fix      # 1. Corregir estilo automáticamente
pnpm lint          # 2. Verificar que no quedan errores de linting
pnpm format        # 3. Formatear código con Prettier
pnpm coverage      # 4. Pruebas completas con cobertura (equivalente al CI)
```

> **Nota:** El pipeline de CI ejecuta `pnpm lint` y `pnpm coverage`.
> Si alguno de estos falla localmente, el PR será rechazado
> automáticamente. No abrir el PR hasta que ambos pasen.

### Versionamiento

JAC Manager frontend sigue **[Versionamiento Semántico](https://semver.org/)** (`MAYOR.MENOR.PARCHE`).

| Tipo de cambio                        | Incremento | Ejemplo            |
|---------------------------------------|------------|--------------------|
| Corrección de error                   | Parche     | `0.1.0 → 0.1.1`    |
| Nueva funcionalidad (compatible)      | Menor      | `0.1.0 → 0.2.0`    |
| Cambio que rompe compatibilidad       | Mayor      | `0.1.0 → 1.0.0`    |

**Siempre actualiza la versión antes de abrir un PR.** Usa pnpm para
actualizar la versión en el `package.json` sin crear tags de Git:

```bash
# Parche: 0.1.0 → 0.1.1
pnpm version patch --no-git-tag-version

# Menor: 0.1.0 → 0.2.0
pnpm version minor --no-git-tag-version

# Mayor: 0.1.0 → 1.0.0
pnpm version major --no-git-tag-version
```

Luego haz el cambio de versión en un commit dedicado e independiente:

```bash
git add package.json
git commit -m "chore: actualizar version a 0.2.0"
```
---

## Revisión de Pull Requests

- Todo PR debe referenciar al menos un Issue con `Cierra #número`.
- El título del PR debe seguir el mismo formato que los commits.
- Antes de aprobar un PR verifica:
    - [ ] El código compila sin errores.
    - [ ] Los criterios de aceptación del Issue están cumplidos.
    - [ ] No hay credenciales ni archivos sensibles incluidos.
    - [ ] El código sigue los estándares del proyecto.