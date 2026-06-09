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

## Revisión de Pull Requests

- Todo PR debe referenciar al menos un Issue con `Cierra #número`.
- El título del PR debe seguir el mismo formato que los commits.
- Antes de aprobar un PR verifica:
    - [ ] El código compila sin errores.
    - [ ] Los criterios de aceptación del Issue están cumplidos.
    - [ ] No hay credenciales ni archivos sensibles incluidos.
    - [ ] El código sigue los estándares del proyecto.