# Skill Audit: Export Administrative FEA (SEP / DGB)

## Skill ID
export_administrative_fea

## Versión
1.0.0

## Tipo de archivo
Audit & Traceability Specification (Read-Only)

---

## Propósito del archivo

Este archivo define las **reglas de auditoría, trazabilidad e integridad normativa** del Skill `export_administrative_fea`.

Su función es garantizar que **cada intento de exportación administrativa FEA** quede registrado de forma verificable, **sin alterar datos académicos ni administrativos**.

Este archivo:
- NO ejecuta lógica
- NO genera salidas administrativas
- NO modifica estados
- NO interviene en decisiones académicas

Su rol es **registrar y proteger**.

---

## Principios de auditoría obligatorios

1. **Trazabilidad total**
   - Cada invocación del Skill debe dejar rastro auditable.
   - No existen ejecuciones “silenciosas”.

2. **Inmutabilidad**
   - Ningún registro de auditoría puede ser editado o eliminado.
   - Los registros son append-only.

3. **Separación normativa**
   - La auditoría administrativa NO puede incluir información pedagógica.
   - Está prohibido registrar:
     - PFs
     - evidencias
     - MVA
     - RACN
     - discurso didáctico

4. **Verificabilidad externa**
   - Los registros deben permitir auditoría institucional (SEP / DGB).

---

## Eventos auditables obligatorios

Cada uno de los siguientes eventos **DEBE generar un registro**:

### 1. Invocación del Skill
Evento:
`FEA_SKILL_INVOKED`

Datos mínimos registrados:
- skill_id
- timestamp
- origen_invocacion (sistema / usuario / proceso)
- identificador_solicitud

---

### 2. Validación de datos
Evento:
`FEA_DATA_VALIDATION`

Datos mínimos registrados:
- identificador_solicitud
- eco_calificacion_presente (true / false)
- campos_obligatorios_completos (true / false)
- resultado_validacion (VALID / INVALID)

---

### 3. Aplicación de lógica administrativa
Evento:
`FEA_ADMIN_LOGIC_APPLIED`

Datos mínimos registrados:
- porcentaje_pf_acreditados
- estatus_administrativo_resultante
- confirmacion_logica_blindada (true)

Nota:
- La calificación numérica **NO se evalúa**, solo se registra como presente.

---

### 4. Generación de formatos
Evento:
`FEA_FORMATS_GENERATED`

Datos mínimos registrados:
- formatos_generados (JSON / CSV / XLSX)
- paridad_confirmada (true / false)
- identificador_exportacion

---

### 5. Exportación exitosa
Evento:
`FEA_EXPORT_SUCCESS`

Datos mínimos registrados:
- identificador_exportacion
- timestamp
- hash_integridad
- estado_final (exported)

---

### 6. Bloqueo normativo
Evento:
`FEA_EXPORT_BLOCKED`

Causas auditables:
- eco_calificacion inexistente
- campos obligatorios faltantes
- intento de inferir acreditación
- acceso indebido a datos pedagógicos

Datos mínimos registrados:
- identificador_solicitud
- causa_bloqueo
- timestamp
- estado_final (blocked)

---

## Hash de integridad

Cada exportación exitosa debe generar un:

- `hash_integridad`
- Algoritmo recomendado: SHA-256
- El hash debe calcularse sobre:
  - JSON Administrativo canónico
  - Metadatos de exportación

El hash **NO se recalcula posteriormente**.

---

## Relación con otros archivos

- **SKILL.md**
  - Define el contrato funcional del Skill.
- **SKILL_STATE.md**
  - Define los estados y transiciones.
- **SKILL_AUDIT.md (este archivo)**
  - Registra lo ocurrido, no decide nada.

---

## Prohibiciones absolutas

El sistema de auditoría NO PUEDE:

- Modificar `eco_calificacion`
- Alterar estatus administrativos
- Recalcular porcentajes
- Generar explicaciones pedagógicas
- Autorizar avance de nivel
- Emitir juicios académicos

---

## Uso institucional

- Auditoría SEP / DGB
- Verificación de integridad administrativa
- Soporte para revisiones externas
- Evidencia de separación pedagógico–administrativa

---

## Estado del archivo
Activo — Normativo — Inmutable
