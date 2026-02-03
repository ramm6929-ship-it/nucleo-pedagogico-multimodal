/**
 * REPOSITORIO ESTÁTICO DE CONTENIDOS CURRICULARES (MCCEMS 2025)
 * 
 * Mapeo de IDs de Propósitos Formativos a textos y contenidos oficiales.
 * Actúa como "base de datos estática" para el Frontend Pasivo.
 * 
 * REGLA DE ORO: Textos LITERALES de los documentos oficiales MCCEMS.
 */

export interface CurriculumItem {
    id: string;
    texto: string;
    contenidos: string[];
    fuente_mccems: string; // Enlace explícito al archivo normativo
}

export const CURRICULUM_DATA: Record<string, CurriculumItem> = {
    // --- PENSAMIENTO MATEMÁTICO I ---
    "PMI-I-PF1": {
        id: "PMI-I-PF1",
        texto: "Aplica conceptos básicos de lógica matemática en situaciones de su contexto para desarrollar esquemas de razonamiento estructurado.",
        contenidos: [
            "Conceptualización de lógica matemática",
            "Tablas de verdad",
            "Proposiciones compuestas y operadores lógicos: conjunción (y) y disyunción (o)",
            "Proposiciones condicionales y bicondicionales"
        ],
        fuente_mccems: "MCCEMS_Pensamiento_Matematico.md.md"
    },
    "PMI-I-PF2": {
        id: "PMI-I-PF2",
        texto: "Comprende el concepto de conteo a partir del análisis de los procesos sociales que llevaron a su desarrollo para aplicarlo en situaciones de interés.",
        contenidos: [
            "Sistemas de conteo en Mesopotamia, Egipto, América, India y Arabia; importancia del cero en los pueblos olmeca y maya",
            "Concepto de número y números naturales",
            "Leonardo de Pisa y el sistema numeral indoarábigo",
            "Concepto y uso del ábaco"
        ],
        fuente_mccems: "MCCEMS_Pensamiento_Matematico.md.md"
    },
    "PMI-I-PF3": {
        id: "PMI-I-PF3",
        texto: "Analiza distintas situaciones cotidianas en donde intervenga el proceso de contar, para comprender la clasificación de los números y realizar operaciones básicas entre números naturales y enteros.",
        contenidos: [
            "Clasificación de los números reales",
            "Operaciones aritméticas y sus operaciones inversas con números enteros",
            "Propiedades de las operaciones aritméticas: cerradura, conmutación, asociación y distribución; neutros e inversos aditivo y multiplicativo",
            "Factorización de números naturales (teorema fundamental de la aritmética)",
            "Máximo común divisor y mínimo común múltiplo"
        ],
        fuente_mccems: "MCCEMS_Pensamiento_Matematico.md.md"
    },
    "PMI-I-PF4": {
        id: "PMI-I-PF4",
        texto: "Comprende el concepto de unidad y la relación entre números fraccionarios y enteros, para realizar operaciones con fracciones y porcentajes.",
        contenidos: [
            "Concepto de unidad y de los números racionales como fracciones (estructura)",
            "Equivalencias entre fracciones y entre números enteros y fracciones",
            "Simplificación de fracciones",
            "Proporción, proporción inversa y porcentaje"
        ],
        fuente_mccems: "MCCEMS_Pensamiento_Matematico.md.md"
    },
    "PMI-I-PF5": {
        id: "PMI-I-PF5",
        texto: "Comprende el concepto de potencia y raíz de un número como un tipo de factorización para aplicar el algoritmo de resolución en situaciones de interés.",
        contenidos: [
            "Componentes de una potencia",
            "Operaciones con potenciación (reglas)",
            "Explicación de exponentes negativos como el inverso multiplicativo de la base",
            "Operaciones con exponentes (reglas)",
            "Definición de raíz cuadrada (enunciación de sus partes) y radicando diferente de 2",
            "Raíz cuadrada como inverso de potencias de números positivos y cancelación de potencias y raíces"
        ],
        fuente_mccems: "MCCEMS_Pensamiento_Matematico.md.md"
    },
    "PMI-I-PF6": {
        id: "PMI-I-PF6",
        texto: "Comprende el concepto de medición a partir del análisis de los procesos sociales que llevaron a su desarrollo para aplicarlo en situaciones de interés.",
        contenidos: [
            "Concepto de medición",
            "Unidades de medida y sistema internacional",
            "Magnitudes y notación científica",
            "Razón y proporción"
        ],
        fuente_mccems: "MCCEMS_Pensamiento_Matematico.md.md"
    },
    "PMI-I-PF7": {
        id: "PMI-I-PF7",
        texto: "Aplica los elementos de la aritmética para resolver cálculos combinados con números reales.",
        contenidos: [
            "Técnicas para la resolución de operaciones combinadas (jerarquía de operaciones)",
            "Uso de símbolos para resolución de operaciones combinadas (paréntesis, corchetes, llaves y puntos)",
            "Resolución de restas de números enteros como la suma con el opuesto de otro",
            "Operaciones combinadas con adición, sustracción, multiplicación, división, potencias y raíces"
        ],
        fuente_mccems: "MCCEMS_Pensamiento_Matematico.md.md"
    },

    // --- CIENCIAS NATURALES, EXPERIMENTALES Y TECNOLOGÍA I ---
    "CNEYT-I-PF1": {
        id: "CNEYT-I-PF1",
        texto: "Reconoce la ciencia como actividad creativa, social y colectiva que involucra el planteamiento de preguntas y la búsqueda de explicaciones sobre fenómenos naturales de su entorno, a través de la experimentación y el análisis.",
        contenidos: [
            "Concepto de ciencia",
            "Relatos sobre la historia de los descubrimientos científicos y la ciencia en México",
            "El método científico y el conocimiento empírico y tradicional, como formas de comprensión de la naturaleza",
            "Medición: concepto de medición, magnitudes y unidad de medida, y su aplicación en las ciencias naturales"
        ],
        fuente_mccems: "MCCEMS_CNEYT.md.md"
    },
    "CNEYT-I-PF2": {
        id: "CNEYT-I-PF2",
        texto: "Comprende que los fenómenos de la naturaleza están interrelacionados, y pueden estudiarse en su conjunto o de forma especializada, para la generación de conocimiento o innovación tecnológica.",
        contenidos: [
            "Objetivos de estudio de la física, la química y la biología; elementos en común y sus diferencias",
            "Ejemplos de ciencias naturales derivadas e interdisciplinares: ecología, ciencias de la Tierra, entre otros",
            "Concepto de tecnología y su vínculo con las ciencias naturales"
        ],
        fuente_mccems: "MCCEMS_CNEYT.md.md"
    },
    "CNEYT-I-PF3": {
        id: "CNEYT-I-PF3",
        texto: "Comprende los conceptos de materia, cuerpo, masa y densidad, a partir de los objetos del entorno perceptible, para describirlos y analizarlos.",
        contenidos: [
            "Concepto de materia y cuerpo",
            "Concepto de masa como cantidad de materia, unidad de medida and su diferencia con el concepto de peso",
            "Concepto de densidad",
            "Cálculo de volumen y densidad"
        ],
        fuente_mccems: "MCCEMS_CNEYT.md.md"
    },
    "CNEYT-I-PF4": {
        id: "CNEYT-I-PF4",
        texto: "Comprende los conceptos de sustancia, sustancia pura, elemento compuesto y mezcla, y los aplica para clasificar de forma práctica o analítica distintos tipos de materia y reconocer sus propiedades físicas y químicas.",
        contenidos: [
            "Clasificación de la materia",
            "Propiedades físicas y químicas de la materia",
            "Tipos y características de las mezclas; métodos de separación",
            "Cálculo de concentración de disoluciones: masa-masa, masa-volumen, volumen-volumen y partes por millón",
            "Clasificación periódica de los elementos"
        ],
        fuente_mccems: "MCCEMS_CNEYT.md.md"
    },
    "CNEYT-I-PF5": {
        id: "CNEYT-I-PF5",
        texto: "Comprende el átomo y su composición eléctrica como la partícula microscópica que estructura la materia.",
        contenidos: [
            "Teoría Atómica: Dalton, Thomson, Rutherford, Bohr y Schrödinger",
            "Modelos atómicos y carga eléctrica",
            "Número y masa atómica",
            "Isótopos",
            "Concepto de configuración electrónica y valencia"
        ],
        fuente_mccems: "MCCEMS_CNEYT.md.md"
    },
    "CNEYT-I-PF6": {
        id: "CNEYT-I-PF6",
        texto: "Analiza la formación de iones, moléculas y sustancias, a partir de la unión de dos o más átomos que tienden a la estabilidad energética, para explicar la formación de enlaces químicos.",
        contenidos: [
            "Enlace químico",
            "Electronegatividad y fuerzas intramoleculares",
            "Iones y moléculas"
        ],
        fuente_mccems: "MCCEMS_CNEYT.md.md"
    },
    "CNEYT-I-PF7": {
        id: "CNEYT-I-PF7",
        texto: "Explica las propiedades físicas de los estados de agregación de la materia en función del movimiento, separación y fuerzas de atracción o repulsión de las partículas internas, y las vincula con los conceptos de energía cinética, potencial e interna.",
        contenidos: [
            "Concepto de energía",
            "Noción intuitiva de movimiento y conceptos de energía cinética, potencial e interna",
            "Teoría cinética de la materia",
            "Estados de agregación de la materia y sus cambios (sólidos, líquidos, gases y plasma)"
        ],
        fuente_mccems: "MCCEMS_CNEYT.md.md"
    },
    "CNEYT-I-PF8": {
        id: "CNEYT-I-PF8",
        texto: "Construye explicaciones sobre la naturaleza energética y corpuscular de la materia, y explora aplicaciones tecnológicas relacionadas.",
        contenidos: [
            "Fenómenos naturales donde participa la actividad eléctrica de la materia",
            "Aplicaciones tecnológicas vinculadas con la materia"
        ],
        fuente_mccems: "MCCEMS_CNEYT.md.md"
    },

    // Fallback genérico para desarrollo
    "DEFAULT": {
        id: "UNKNOWN",
        texto: "Propósito Formativo no encontrado en repositorio estático.",
        contenidos: [],
        fuente_mccems: "NONE"
    }
};

export function getCurriculumData(id: string): CurriculumItem {
    return CURRICULUM_DATA[id] || CURRICULUM_DATA["DEFAULT"];
}
