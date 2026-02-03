# Skill: Curriculum Audit and Evidence Tracking

## Skill ID
curriculum_audit_evidence

## Versión
1.0.0

## Tipo
Audit & Evidence Skill

## Descripción
Este Skill registra, estructura y valida la evidencia pedagógica generada durante cada sesión del agente educativo, asegurando trazabilidad, coherencia curricular y posibilidad de auditoría institucional.

No evalúa calificaciones.
No modifica estados.
No genera contenidos.

## Alcance institucional
- SEP
- DGB (Bachillerato General)
- EMS

## Momento de ejecución
Post-sesión (después de generar el flujo y el status_update)

## Entradas esperadas
- Flujo didáctico generado
- Objeto `status_update`
- Evidencia solicitada en la sesión

## Reglas obligatorias de auditoría

1. Evidencia explícita
Cada sesión debe contener:
- Tipo de evidencia (diagnóstica, formativa, integradora)
- Producto solicitado (cuadro, mapa, esquema, reflexión, informe, etc.)

2. Coherencia evidencia–fase
- Fase diagnóstica → evidencia exploratoria
- Fase desarrollo → evidencia formativa
- Fase cierre_proposito → evidencia integradora

3. Trazabilidad curricular
La evidencia debe poder asociarse claramente a:
- Unidad de Aprendizaje Curricular (CNEYT I–VI, PM I–VI, etc.)
- Propósito Formativo
- Día y fase
- Contenido formativo oficial

4. Registro mínimo auditable
Para cada sesión debe poder reconstruirse:
- Qué se pidió
- Para qué propósito
- En qué fase
- Bajo qué marco curricular

5. Neutralidad evaluativa
Este Skill:
- No califica
- No emite juicios de logro
- Solo registra estructura y coherencia

## Salida del Skill
- Registro de evidencia válido
- O alerta de auditoría si falta:
  - evidencia explícita
  - coherencia fase–producto
  - alineación curricular

## Usos clave
- Auditoría SEP / DGB / EMS
- Seguimiento longitudinal del estudiante
- Sustento pedagógico ante revisión externa
- Prevención de vacíos instruccionales

## Beneficios estratégicos
- Evidencia educativa estructurada
- Transparencia pedagógica
- Confianza institucional
- Escalabilidad del sistema

## Estado
Activo
