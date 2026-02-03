# Skill: Execute Curriculum Test (CNEYT / PM)

## Skill ID
execute_curriculum_test

## Versión
1.0.0

## Tipo
Core Validation Skill

## Descripción
Este Skill ejecuta pruebas curriculares controladas para asignaturas del Marco Curricular Común de la Educación Media Superior (MCCEMS), garantizando la congruencia entre el flujo pedagógico presentado al estudiante y el estado estructurado final (JSON).

Está diseñado para validar:
- Propósitos Formativos
- Fases didácticas
- Condición PAEC activa o inactiva
- Coherencia entre discurso pedagógico y estructura curricular oficial

## Alcance institucional
- SEP
- DGB (Bachillerato General)
- EMS

## Modo de operación
Modo Estudiante (simulado)

## Entradas esperadas
- nivel_activo (ej. PM I, CNEYT I, CNEYT II)
- proposito_formativo (número y texto oficial)
- fase_didactica (diagnóstica, desarrollo, cierre)
- configuracion_paec:
  - activo (true / false)
  - problema_contextual (string | null)
  - asignaturas_integradas (si aplica)
  - proposito_paec_actual (si aplica)

## Reglas de ejecución obligatorias
1. El texto del Propósito Formativo y Contenidos debe coincidir literalmente con el documento oficial MCCEMS correspondiente.
2. La fase didáctica debe reflejarse explícitamente tanto en el discurso como en el JSON.
3. Si PAEC está inactivo:
   - No debe existir contextualización comunitaria.
   - problema_contextual debe ser null.
4. Si PAEC está activo:
   - El Propósito Formativo NO se modifica.
   - La contextualización aparece solo en ejemplos, preguntas o situaciones.
5. Todo flujo debe concluir con un objeto `status_update` en formato JSON válido.

## Salida obligatoria
1. Flujo pedagógico visible (mensaje al estudiante).
2. JSON final con:
   - nivel_activo
   - meta_educativa
   - proposito_formativo_actual
   - progreso
   - paec
   - evaluacion_evidencia
   - portafolio_id

## Uso principal
- Validación de pruebas tipo sandbox (Pruebas 1.x, 2.x, 3.x)
- Simulación de ejecución curricular por nivel y semestre
- Auditoría de coherencia pedagógica–curricular

## Beneficios clave
- Previene desviaciones curriculares
- Asegura trazabilidad pedagógica
- Facilita futuras auditorías SEP / DGB / EMS
- Permite escalamiento progresivo (CNEYT I → VI)

## Estado
Activo
