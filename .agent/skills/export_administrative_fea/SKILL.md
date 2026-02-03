# Skill: Export Administrative FEA (SEP / DGB)

## Skill ID
export_administrative_fea

## Versión
1.0.0

## Tipo
Administrative Export Skill (Normative / Read-Only)

## Descripción
Este Skill genera el **Formato de Exportación Administrativa (FEA)** oficial para SEP/DGB a partir de información ya consolidada en el objeto `eco_calificacion`.

Su función es **exclusivamente administrativa**: convertir el estado académico previamente determinado por el backend normativo (MVA, RACN, ECOC) en salidas formales para reporte institucional.

Este Skill **NO evalúa**, **NO acredita**, **NO decide avance**, **NO interactúa con Propósitos Formativos**, **NO modifica estados académicos**.

---

## Marco normativo
- SEP
- DGB (Bachillerato General)
- EMS
- MCCEMS 2025 (uso indirecto vía eco_calificacion)

---

## Dominio funcional
Administrativo — Exportación y Reporte

Separación lógica obligatoria:
- Pedagógico → MVA / RACN / ESGR / RDE (fuera de este Skill)
- Administrativo → FEA (este Skill)

---

## Fuente única de verdad (OBLIGATORIA)
Este Skill **SOLO PUEDE LEER** el objeto:

```json
eco_calificacion
Está estrictamente prohibido acceder directa o indirectamente a:

acreditacion

evaluacion_evidencia

portafolio

Propósitos Formativos

PFs individuales

rutas de recuperación

discurso pedagógico

Entradas esperadas
eco_calificacion (objeto completo y persistido)

metadatos administrativos:

cct

ciclo_escolar

semestre

asignatura

estudiante_id

Si alguno de estos campos no existe, el Skill NO DEBE EJECUTARSE.

Lógica administrativa blindada (NO MODIFICABLE)
Regla de estatus
ACREDITADO     ⇨ porcentaje_pf_acreditados == "100%"
NO_ACREDITADO  ⇨ cualquier otro valor
No existen excepciones.

Regla de calificación
La calificación numérica se toma sin ajuste desde eco_calificacion.calificacion_numerica.

El Skill NO recalcula calificaciones.

El Skill NO infiere acreditaciones.

Estructura FEA canónica
Campos obligatorios (todos los formatos)
cct

ciclo_escolar

semestre

asignatura

estudiante_id

calificacion_final

estatus_administrativo

observacion

fecha_cierre

Formatos de salida habilitados
Este Skill debe poder generar paridad absoluta entre los siguientes formatos:

JSON Administrativo (canónico)

CSV SEP/DGB

XLSX (vista administrativa tabular)

Ningún formato puede contener información adicional o distinta a los demás.

Observaciones normativas (inmutables)
ACREDITADO
"Asignatura acreditada conforme a criterios administrativos SEP/DGB."

NO_ACREDITADO
"Calificación administrativa registrada. Acreditación académica en proceso conforme a normativa vigente."

Estas observaciones NO se personalizan, NO se explican, NO se amplían.

Auditoría e integridad
Cada exportación debe generar:

identificador_exportacion único

fecha_hora de emisión

hash_integridad

confirmación de paridad entre formatos

Salida obligatoria
Archivo JSON Administrativo FEA

Archivo CSV SEP/DGB

Representación tabular XLSX

Acuse técnico de exportación con:

estatus

validación de lógica administrativa

confirmación de separación normativa

Prohibiciones absolutas
El Skill NO PUEDE:

Modificar eco_calificacion

Generar decisiones académicas

Calcular porcentajes

Acceder a PFs

Incluir lenguaje pedagógico

Referenciar MVA, RACN, ESGR o RDE en las salidas

Emitir juicios académicos

Autorizar avance de nivel

Uso principal
Reporte administrativo SEP/DGB

Generación de kardex

Auditoría institucional

Cierre administrativo independiente del cierre formativo

