# Skill: Validate Curriculum State Progression

## Skill ID
validate_curriculum_state

## Versión
1.0.0

## Tipo
State Control Skill

## Descripción
Este Skill valida la coherencia, continuidad y progresión del estado curricular entre ejecuciones consecutivas dentro del agente educativo.

Evita saltos indebidos de:
- Fase didáctica
- Día de trabajo
- Propósito Formativo
- Nivel o semestre

Garantiza que cada prueba respete la secuencia oficial del MCCEMS.

## Alcance institucional
- SEP
- DGB (Bachillerato General)
- EMS

## Modo de operación
Post-ejecución (después de cada prueba)

## Entradas esperadas
- status_update_actual
- status_update_anterior (si existe)

## Reglas de validación obligatorias

1. Progresión temporal
- `dia_actual` solo puede:
  - Incrementarse en +1
  - Reiniciarse únicamente al cambiar de Propósito Formativo

2. Fase didáctica
Secuencia válida:
- diagnostica → desarrollo → cierre_proposito

No se permite:
- Saltar fases
- Retroceder fases

3. Propósito Formativo
- No puede cambiar si la fase no es `cierre_proposito`
- Al cambiar, `dia_actual` debe reiniciarse en 1
- `porcentaje_nivel` puede mantenerse o aumentar

4. Nivel activo
- No puede cambiar dentro de una misma prueba
- Solo puede cambiar al cerrar un nivel completo

5. PAEC
- No puede activarse o desactivarse a mitad de un Propósito Formativo
- Si está activo:
  - `problema_contextual` debe mantenerse constante

6. Portafolio
- `portafolio_id` debe persistir hasta cierre de Propósito
- No puede resetearse arbitrariamente

## Salida obligatoria
- Estado validado (OK)
- O mensaje de error estructurado indicando:
  - regla violada
  - campo afectado
  - valor esperado vs recibido

## Uso principal
- Control de sesiones consecutivas
- Validación automática de Pruebas 1.x, 2.x, 3.x
- Prevención de errores de diseño instruccional

## Beneficios clave
- Garantiza continuidad pedagógica
- Evita inconsistencias de estado
- Asegura trazabilidad curricular
- Facilita auditoría institucional

## Estado
Activo
