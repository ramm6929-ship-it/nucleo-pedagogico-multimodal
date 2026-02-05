// app/lib/canonical-pm-data.ts
// ========================================================================
// BASE DE DATOS CANÓNICA - PENSAMIENTO MATEMÁTICO (PM)
// MCCEMS 2025 - 6 NIVELES COMPLETOS
// ========================================================================

import { NivelCurricular } from "./canonical-pf-data";

export const PM_CURRICULUM: Record<string, NivelCurricular> = {
    // ====================================================================
    // PM I - PENSAMIENTO ARITMÉTICO
    // ====================================================================
    "I": {
        nivel: "I",
        nombre_semestre: "Pensamiento aritmético",
        meta_educativa: "Comprenda las matemáticas como expresión del pensamiento humano para aplicar los elementos esenciales de la aritmética y el pensamiento lógico en situaciones de interés.",
        propositos: [
            {
                id: "PMI-I-PF1",
                texto_oficial: "Aplica conceptos básicos de lógica matemática en situaciones de su contexto para desarrollar esquemas de razonamiento estructurado.",
                contenidos_formativos: [
                    "Conceptualización de lógica matemática",
                    "Tablas de verdad",
                    "Proposiciones compuestas y operadores lógicos: conjunción (y) y disyunción (o)",
                    "Proposiciones condicionales y bicondicionales"
                ]
            },
            {
                id: "PMI-I-PF2",
                texto_oficial: "Comprende el concepto de conteo a partir del análisis de los procesos sociales que llevaron a su desarrollo para aplicarlo en situaciones de interés.",
                contenidos_formativos: [
                    "Sistemas de conteo en Mesopotamia, Egipto, América, India y Arabia; importancia del cero en los pueblos olmeca y maya",
                    "Concepto de número y números naturales",
                    "Leonardo de Pisa y el sistema numeral indoarábigo",
                    "Concepto y uso del ábaco"
                ]
            },
            {
                id: "PMI-I-PF3",
                texto_oficial: "Analiza distintas situaciones cotidianas en donde intervenga el proceso de contar, para comprender la clasificación de los números y realizar operaciones básicas entre números naturales y enteros.",
                contenidos_formativos: [
                    "Clasificación de los números reales",
                    "Operaciones aritméticas y sus operaciones inversas con números enteros",
                    "Propiedades de las operaciones aritméticas: cerradura, conmutación, asociación y distribución; neutros e inversos aditivo y multiplicativo",
                    "Factorización de números naturales (teorema fundamental de la aritmética)",
                    "Máximo común divisor y mínimo común múltiplo"
                ]
            },
            {
                id: "PMI-I-PF4",
                texto_oficial: "Comprende el concepto de unidad y la relación entre números fraccionarios y enteros, para realizar operaciones con fracciones y porcentajes.",
                contenidos_formativos: [
                    "Concepto de unidad y de los números racionales como fracciones (estructura)",
                    "Equivalencias entre fracciones y entre números enteros y fracciones",
                    "Simplificación de fracciones",
                    "Proporción, proporción inversa y porcentaje"
                ]
            },
            {
                id: "PMI-I-PF5",
                texto_oficial: "Comprende el concepto de potencia y raíz de un número como un tipo de factorización para aplicar el algoritmo de resolución en situaciones de interés.",
                contenidos_formativos: [
                    "Componentes de una potencia",
                    "Operaciones con potenciación (reglas)",
                    "Explicación de exponentes negativos como el inverso multiplicativo de la base",
                    "Operaciones con exponentes (reglas)",
                    "Definición de raíz cuadrada (enunciación de sus partes) y radicando diferente de 2",
                    "Raíz cuadrada como inverso de potencias de números positivos y cancelación de potencias y raíces"
                ]
            },
            {
                id: "PMI-I-PF6",
                texto_oficial: "Comprende el concepto de medición a partir del análisis de los procesos sociales que llevaron a su desarrollo para aplicarlo en situaciones de interés.",
                contenidos_formativos: [
                    "Concepto de medición",
                    "Unidades de medida y sistema internacional",
                    "Magnitudes y notación científica",
                    "Razón y proporción"
                ]
            },
            {
                id: "PMI-I-PF7",
                texto_oficial: "Aplica los elementos de la aritmética para resolver cálculos combinados con números reales.",
                contenidos_formativos: [
                    "Técnicas para la resolución de operaciones combinadas (jerarquía de operaciones)",
                    "Uso de símbolos para resolución de operaciones combinadas (paréntesis, corchetes, llaves y puntos)",
                    "Resolución de restas de números enteros como la suma con el opuesto de otro",
                    "Operaciones combinadas con adición, sustracción, multiplicación, división, potencias y raíces"
                ]
            }
        ]
    },

    // ====================================================================
    // PM II - INTRODUCCIÓN AL ÁLGEBRA
    // ====================================================================
    "II": {
        nivel: "II",
        nombre_semestre: "Introducción al álgebra",
        meta_educativa: "Entienda al lenguaje algebraico como un medio de representación de situaciones cotidianas y escolares para estimular el pensamiento abstracto.",
        propositos: [
            {
                id: "PMI-II-PF1",
                texto_oficial: "Representa operaciones aritméticas utilizadas en situaciones de interés, mediante letras y símbolos, para comprender el lenguaje algebraico.",
                contenidos_formativos: [
                    "Definición de: suma, producto, razón, cociente, diferencia y residuo",
                    "Símbolos y letras utilizados en el lenguaje algebraico",
                    "Concepto de incógnita",
                    "Términos y expresiones algebraicas",
                    "Representación de expresiones de lenguaje común a expresiones algebraicas"
                ]
            },
            {
                id: "PMI-II-PF2",
                texto_oficial: "Comprende la clasificación de las expresiones algebraicas para construir e identificar monomios, binomios, trinomios y polinomios.",
                contenidos_formativos: [
                    "Clasificación de expresiones algebraicas (monomio, binomio, trinomio y polinomio)",
                    "Componentes de un monomio: coeficiente, variable, exponente positivo y grado",
                    "Representación de situaciones reales con monomios y polinomios"
                ]
            },
            {
                id: "PMI-II-PF3",
                texto_oficial: "Aplica la aritmética y el manejo del álgebra para realizar operaciones con monomios y binomios, referentes a situaciones de interés, a partir del análisis de sus componentes.",
                contenidos_formativos: [
                    "Suma, resta, multiplicación y división con monomios",
                    "Aplicación de las reglas de los exponentes y los signos",
                    "Aplicación de operaciones con fracciones",
                    "Factorización de monomios",
                    "Binomio y trinomio simple",
                    "Suma, resta, multiplicación y división con polinomios",
                    "Productos notables",
                    "Factorización de polinomios",
                    "Trinomio cuadrado perfecto"
                ]
            },
            {
                id: "PMI-II-PF4",
                texto_oficial: "Aplica el álgebra en situaciones de interés para comprender su relevancia en otras áreas del conocimiento, fenómenos naturales o en distintas esferas de la vida humana.",
                contenidos_formativos: [
                    "Cálculo de un presupuesto personal (ingresos, gastos, ahorros, etc.)",
                    "Ajuste de proporciones en recetas según número de personas",
                    "Hallar precios finales aplicando porcentajes y ecuaciones en compras con descuento"
                ]
            },
            {
                id: "PMI-II-PF5",
                texto_oficial: "Comprende el concepto de ecuación a partir de las igualdades matemáticas para encontrar el valor de una incógnita utilizando situaciones de interés.",
                contenidos_formativos: [
                    "Concepto de igualdad e identidad algebraica",
                    "Relaciones de igualdad entre números reales",
                    "Propiedades de igualdad: reflexiva, simétrica, transitiva, uniformidad"
                ]
            }
        ]
    },

    // ====================================================================
    // PM III - PENSAMIENTO ALGEBRAICO E INTRODUCCIÓN A GEOMETRÍA PLANA
    // ====================================================================
    "III": {
        nivel: "III",
        nombre_semestre: "Pensamiento algebraico e introducción a geometría plana",
        meta_educativa: "Aplique el lenguaje algebraico como herramienta para describir situaciones de la realidad y expresar relaciones matemáticas, y mediante procesos de intuición y razonamiento, logre explicar y resolver problemas.",
        propositos: [
            {
                id: "PMI-III-PF1",
                texto_oficial: "Aplica la aritmética y el manejo del álgebra para encontrar el valor de una incógnita en ecuaciones lineales que refieran a situaciones de interés.",
                contenidos_formativos: [
                    "Concepto de ecuación y sus partes",
                    "Ecuaciones lineales de primer grado",
                    "Procedimiento para encontrar el valor de una incógnita",
                    "Forma estándar de las ecuaciones lineales"
                ]
            },
            {
                id: "PMI-III-PF2",
                texto_oficial: "Aplica la aritmética y el manejo del álgebra para resolver ecuaciones lineales con dos incógnitas que refieran a situaciones de interés.",
                contenidos_formativos: [
                    "Ecuaciones lineales con dos incógnitas",
                    "Procedimiento para solucionar ecuaciones lineales con dos incógnitas",
                    "Ecuación de la recta",
                    "Concepto de plano cartesiano: ejes perpendiculares: horizontal (X) y vertical (Y)",
                    "Representación gráfica de la ecuación de la recta"
                ]
            },
            {
                id: "PMI-III-PF3",
                texto_oficial: "Aplica la aritmética, el manejo del álgebra y el método gráfico para resolver sistemas de ecuaciones lineales que refieran a situaciones de interés.",
                contenidos_formativos: [
                    "Método de igualación",
                    "Método de sustitución",
                    "Método de reducción",
                    "Método gráfico",
                    "Método por determinantes"
                ]
            },
            {
                id: "PMI-III-PF4",
                texto_oficial: "Aplica la aritmética y el manejo del álgebra para resolver ecuaciones cuadráticas que refieran a situaciones de interés.",
                contenidos_formativos: [
                    "Ecuaciones cuadráticas",
                    "Forma general de la ecuación cuadrática",
                    "Resolución por método de completar cuadrados",
                    "Aplicación de fórmula general para ecuaciones cuadráticas (Bhaskara)",
                    "Representación gráfica"
                ]
            },
            {
                id: "PMI-III-PF5",
                texto_oficial: "Expresa y resuelve diversas situaciones de interés a través de distintos tipos de ecuaciones para comprender su relevancia en otras áreas del conocimiento, fenómenos naturales o en distintas esferas de la vida humana.",
                contenidos_formativos: [
                    "Cálculo de intereses simples y compuestos en finanzas personales",
                    "Descripción del crecimiento poblacional o propagación de fenómenos (ej. epidemia)",
                    "Determinar medidas o cantidades de material en proyectos de arquitectura"
                ]
            },
            {
                id: "PMI-III-PF6",
                texto_oficial: "Revisa el teorema del triángulo de Napoleón, considerándolo como un problema-meta para aplicar resultados de la geometría euclidiana.",
                contenidos_formativos: [
                    "Introducción a la geometría plana",
                    "Ángulos, definición, tipos y componentes",
                    "Teorema de Pitágoras",
                    "Construcción de triángulos rectángulos",
                    "Criterios de congruencia y semejanza de triángulos"
                ]
            }
        ]
    },

    // ====================================================================
    // PM IV - TRIGONOMETRÍA Y GEOMETRÍA ANALÍTICA
    // ====================================================================
    "IV": {
        nivel: "IV",
        nombre_semestre: "Trigonometría y geometría analítica",
        meta_educativa: "Resuelva problemas a partir del planteamiento y análisis de funciones trigonométricas, ecuaciones de primer y segundo grado, considerando la pertinencia y conocimiento de las variables y relaciones para explicar una situación o fenómeno.",
        propositos: [
            {
                id: "PMI-IV-PF1",
                texto_oficial: "Comprende el concepto de recta y de punto para su representación y análisis algebraico.",
                contenidos_formativos: [
                    "Concepto de punto",
                    "Concepto de recta",
                    "Tipos de recta (tangente, secante)",
                    "Construcción de figuras",
                    "Circunferencia"
                ]
            },
            {
                id: "PMI-IV-PF2",
                texto_oficial: "Analiza la relación entre los lados y los ángulos de un triángulo rectángulo para establecer razones trigonométricas.",
                contenidos_formativos: [
                    "Razones trigonométricas",
                    "Demostraciones de identidades trigonométricas"
                ]
            },
            {
                id: "PMI-IV-PF3",
                texto_oficial: "Grafica en el plano cartesiano polinomios de dos variables con coeficientes reales, con el fin de deducir la simetría y la extensión.",
                contenidos_formativos: [
                    "Polinomios de dos variables con coeficientes reales",
                    "Propiedades geométricas (simetría, extensión, etc.)"
                ]
            },
            {
                id: "PMI-IV-PF4",
                texto_oficial: "Observa el comportamiento de dos variables en relación de proporcionalidad directa para deducir la ecuación de la recta.",
                contenidos_formativos: [
                    "Comportamiento de dos variables",
                    "Ecuación de la recta (forma punto-pendiente, pendiente-ordenada al origen, simétrica)"
                ]
            },
            {
                id: "PMI-IV-PF5",
                texto_oficial: "Analiza situaciones o fenómenos que involucren en su modelado de funciones cuadráticas para deducir propiedades analíticas de la parábola.",
                contenidos_formativos: [
                    "Propiedades analíticas de la parábola",
                    "Ecuación ordinaria de parábolas verticales y horizontales, con vértice en y fuera del origen",
                    "Modelado"
                ]
            },
            {
                id: "PMI-IV-PF6",
                texto_oficial: "Estudia movimientos circulares, de elipse, y coplanaridad mediante elementos como la ecuación de la circunferencia, las leyes de Kepler, y el pensamiento variacional, para entenderlos.",
                contenidos_formativos: [
                    "Ecuación de la circunferencia",
                    "Leyes de Kepler",
                    "Elipse y coplanaridad"
                ]
            },
            {
                id: "PMI-IV-PF7",
                texto_oficial: "Aplica conocimientos sobre ecuaciones con dos variables para realizar estimaciones sencillas, para consolidar los aprendizajes.",
                contenidos_formativos: [
                    "Modelado y estimación",
                    "Aplicación de las secciones cónicas: elipse, parábola, hipérbola y circunferencia"
                ]
            }
        ]
    },

    // ====================================================================
    // PM V - CÁLCULO DIFERENCIAL
    // ====================================================================
    "V": {
        nivel: "V",
        nombre_semestre: "Cálculo diferencial",
        meta_educativa: "Analice fenómenos donde el cambio es parte central de su estudio con la finalidad de encontrar soluciones óptimas a problemas o situaciones en su entorno u otras áreas del conocimiento.",
        propositos: [
            {
                id: "PMI-V-PF1",
                texto_oficial: "Entiende de manera intuitiva los conceptos de variación promedio y variación instantánea para aproximarse al origen del cálculo.",
                contenidos_formativos: [
                    "Introducción al cálculo diferencial",
                    "Inicios del pensamiento variacional",
                    "Arquímedes y la aproximación al área",
                    "Paradoja de Zenón",
                    "Variación promedio e instantánea"
                ]
            },
            {
                id: "PMI-V-PF2",
                texto_oficial: "Investiga el origen y evolución del cálculo diferencial y el procedimiento de resolución de una función de la recta tangente a una curva en un punto dado, para la explicación de fenómenos físicos.",
                contenidos_formativos: [
                    "Antecedentes históricos y origen del cálculo diferencial",
                    "Función de la regla tangente y explicación de fenómenos físicos (movimiento)"
                ]
            },
            {
                id: "PMI-V-PF3",
                texto_oficial: "Revisa situaciones o fenómenos donde el cambio es la parte central en su estudio y aplica funciones de variable real para modelarlas e identificar simetrías en su representación gráfica.",
                contenidos_formativos: [
                    "Funciones de variable real",
                    "Representación gráfica de funciones de variable real",
                    "Conceptos de continuidad, crecimiento, decrecimiento, máximos y mínimos",
                    "Desigualdades"
                ]
            },
            {
                id: "PMI-V-PF4",
                texto_oficial: "Comprende el concepto de límite e identifica la continuidad de funciones de variable real para interpretar y modelar fenómenos naturales y sociales.",
                contenidos_formativos: [
                    "Introducción al concepto de límite",
                    "Noción intuitiva del límite",
                    "Propiedades del límite",
                    "Aplicación del concepto de límite en la continuidad de funciones y el modelado de situaciones reales"
                ]
            },
            {
                id: "PMI-V-PF5",
                texto_oficial: "Practica funciones exponenciales, logarítmicas y trigonométricas para describir sus propiedades y ejemplificar fenómenos en los que son aplicables.",
                contenidos_formativos: [
                    "Funciones logarítmicas",
                    "Funciones trigonométricas (seno, coseno, tangente)",
                    "Propiedades de las funciones trigonométricas (periodicidad, paridad, reciprocidad)"
                ]
            },
            {
                id: "PMI-V-PF6",
                texto_oficial: "Aplica métodos para derivar funciones lineales y polinomiales, comprendiendo intuitivamente su utilidad como herramienta de análisis en fenómenos de cambio de las ciencias naturales y sociales.",
                contenidos_formativos: [
                    "Concepto de la derivada (como límite)",
                    "Regla de los cuatro pasos",
                    "Derivada de funciones constantes, lineales y polinomiales",
                    "Reglas de derivación",
                    "Análisis de la función derivada",
                    "Resolución de problemas del entorno aplicando la derivada"
                ]
            },
            {
                id: "PMI-V-PF7",
                texto_oficial: "Aplica conocimientos de la derivada para resolver problemas de optimización, o situaciones de su entorno o de otras áreas del conocimiento.",
                contenidos_formativos: [
                    "Aplicación del cálculo de derivada en distintas áreas del conocimiento o esferas de la vida humana"
                ]
            },
            {
                id: "PMI-V-PF8",
                texto_oficial: "Comprende intuitivamente el Teorema Fundamental del Cálculo como conexión entre derivadas e integrales y su utilidad para analizar fenómenos de acumulación de cambios continuos.",
                contenidos_formativos: [
                    "Integral como función inversa de la derivada",
                    "Área bajo la curva de una función dentro de un intervalo",
                    "Representación gráfica"
                ]
            }
        ]
    },

    // ====================================================================
    // PM VI - PENSAMIENTO ESTADÍSTICO Y PROBABILÍSTICO
    // ====================================================================
    "VI": {
        nivel: "VI",
        nombre_semestre: "Pensamiento estadístico y probabilístico",
        meta_educativa: "Aplique procedimientos, técnicas y lenguaje matemático para plantear posibles soluciones a problemas derivados de fenómenos naturales o sociales, cuyo comportamiento puede describirse probabilísticamente y contribuir a una toma de decisiones fundamentada.",
        propositos: [
            {
                id: "PMI-VI-PF1",
                texto_oficial: "Entiende la importancia de la recolección y organización de datos en la elaboración de una muestra aleatoria para la explicación de fenómenos naturales y sociales.",
                contenidos_formativos: [
                    "Eventos deterministas y aleatorios",
                    "Recolección de datos"
                ]
            },
            {
                id: "PMI-VI-PF2",
                texto_oficial: "Identifica la incertidumbre como consecuencia de la variabilidad y, a través de simulaciones, plantea una hipótesis de trabajo para obtener la frecuencia y probabilidad de que suceda un evento.",
                contenidos_formativos: [
                    "Simulaciones probabilísticas",
                    "Equiprobabilidad",
                    "Frecuencia de los eventos"
                ]
            },
            {
                id: "PMI-VI-PF3",
                texto_oficial: "Comprende los conceptos básicos de la teoría de conjuntos para aplicarlos en problemas que le sean presentados.",
                contenidos_formativos: [
                    "Concepto general de conjunto",
                    "Notación e igualdad de conjuntos",
                    "Subconjunto, conjunto universal y subconjuntos",
                    "Representación de conjuntos con diagramas de Venn",
                    "Leyes de Morgan"
                ]
            },
            {
                id: "PMI-VI-PF4",
                texto_oficial: "Selecciona y aplica una técnica de conteo (permutaciones, combinaciones, reemplazo con y sin orden) para calcular probabilidad en eventos simples y apoyar la toma de decisiones.",
                contenidos_formativos: [
                    "Técnicas de conteo",
                    "Probabilidad dependiente e independiente",
                    "Probabilidad condicionada"
                ]
            },
            {
                id: "PMI-VI-PF5",
                texto_oficial: "Analiza los datos categóricos y cuantitativos a través de algunas de sus representaciones, para realizar gráficas de barras (variables cualitativas) o gráficos de puntos e histogramas (variables cuantitativas).",
                contenidos_formativos: [
                    "Variables estadísticas",
                    "Gráficas y su interpretación",
                    "Gráficas y tendencias"
                ]
            },
            {
                id: "PMI-VI-PF6",
                texto_oficial: "Reconoce algunas problemáticas o fenómenos de interés, para identificar cómo se relacionan entre sí dos o más variables categóricas y dos o más variables cuantitativas.",
                contenidos_formativos: [
                    "Independencia de variables cualitativas",
                    "Correlación de variables cuantitativas"
                ]
            },
            {
                id: "PMI-VI-PF7",
                texto_oficial: "Extrae información a través del empleo de técnicas de muestreo, valora la importancia de la aleatoriedad al tomar la muestra.",
                contenidos_formativos: [
                    "Población y muestra",
                    "Fuentes de información (primarias, secundarias y terciarias)",
                    "Métodos de muestreo: aleatorio simple y sistemático"
                ]
            },
            {
                id: "PMI-VI-PF8",
                texto_oficial: "Explica un evento aleatorio cuyo comportamiento puede describirse a través del estudio de la distribución normal, para calcular la probabilidad.",
                contenidos_formativos: [
                    "Distribución normal",
                    "Medidas de tendencia central",
                    "Medidas de dispersión"
                ]
            }
        ]
    }
};
