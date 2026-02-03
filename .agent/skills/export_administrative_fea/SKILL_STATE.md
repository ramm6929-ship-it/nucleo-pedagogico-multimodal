Skill State: Export Administrative FEA (SEP / DGB)
Skill ID
export_administrative_fea
Versión
1.0.0
Propósito del archivo
Definir los estados válidos, transiciones permitidas y bloqueos normativos del Skill export_administrative_fea, encargado exclusivamente de la exportación administrativa conforme a SEP/DGB.
Este archivo NO contiene lógica pedagógica, NO evalúa aprendizaje y NO altera decisiones académicas.
________________________________________
Estados válidos del Skill
1. idle
Descripción:
Estado inicial del Skill. No existe solicitud activa de exportación administrativa.
Condiciones de entrada:
•	El sistema se ha iniciado.
•	No se ha invocado el Skill.
Acciones permitidas:
•	Esperar invocación explícita del Skill.
________________________________________
2. data_validated
Descripción:
El objeto eco_calificacion ha sido validado estructural y normativamente.
Condiciones obligatorias:
•	eco_calificacion existe.
•	Contiene:
o	calificacion_numerica
o	porcentaje_pf_acreditados
o	observacion_normativa
•	No se accede a:
o	PF individuales
o	evidencias
o	MVA
o	RACN
Acciones permitidas:
•	Preparar estructura FEA.
•	Calcular estatus administrativo (ACREDITADO / NO_ACREDITADO).

3. ready_for_export
Descripción:
El FEA ha sido construido en su versión canónica y está listo para exportarse.
Condiciones obligatorias:
- Lógica blindada aplicada:
  - estatus_administrativo = "ACREDITADO" ⇨ solo si porcentaje_pf_acreditados == "100%"
  - estatus_administrativo = "NO_ACREDITADO" ⇨ en cualquier otro caso
- calificacion_numerica:
  - Debe existir como campo obligatorio.
  - Es derivada exclusivamente del ECOC.
  - NO participa en la decisión del estatus administrativo.
- Metadatos completos:
  - cct
  - ciclo_escolar
  - semestre
  - asignatura
  - fecha_hora
  - identificador_exportacion
  - hash_integridad
Acciones permitidas:
•	Generar formatos:
o	JSON Administrativo (canónico)
o	CSV SEP/DGB
o	XLSX administrativo
4. exported
Descripción:
El FEA ha sido exportado exitosamente en uno o más formatos administrativos.
Condiciones obligatorias:
•	Al menos un formato generado sin error.
•	Paridad confirmada entre formatos.
Acciones permitidas:
•	Registrar auditoría.
•	Bloquear modificaciones del registro exportado.
•	Emitir acuse técnico de exportación.
________________________________________
5. blocked
Descripción:
El proceso de exportación ha sido bloqueado por incumplimiento normativo.
Causas posibles:
•	eco_calificacion inexistente.
•	Campos obligatorios faltantes.
•	Intento de inferir estatus administrativo fuera de la lógica blindada.
•	Intento de acceder a datos pedagógicos (PF, evidencias, MVA).
Acciones permitidas:
•	Emitir mensaje normativo de bloqueo.
•	Registrar intento fallido en auditoría.
________________________________________
Transiciones permitidas
Estado actual	Estado siguiente	Condición
idle	data_validated	Skill invocado
data_validated	ready_for_export	Datos completos y válidos
ready_for_export	exported	Exportación exitosa
cualquier estado	blocked	Violación normativa
________________________________________
Transiciones prohibidas
•	idle → exported
•	data_validated → exported
•	exported → ready_for_export
•	exported → data_validated
•	Cualquier transición que implique recalcular MVA o PF
________________________________________
Principios normativos inmutables
•	El Skill NO decide acreditación académica.
•	El Skill NO modifica calificaciones.
•	El Skill NO habilita avance de nivel.
•	El Skill NO interactúa con PAEC.
•	El Skill NO genera retroalimentación pedagógica.
La única fuente de verdad es:
eco_calificacion
________________________________________
Relación con otros componentes
•	SYSTEM PROMPT: define reglas académicas → este Skill solo consume resultados.
•	execute_curriculum_test: valida currículo → este Skill no lo revisa.
•	Supabase: recibe datos ya normalizados.
•	Frontend: consume FEA como salida administrativa final.
________________________________________
Estado
Activo
