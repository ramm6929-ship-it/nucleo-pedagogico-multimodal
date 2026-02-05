// app/lib/canonical-pf-data.ts
// ========================================================================
// BASE DE DATOS CANÓNICA DE PROPÓSITOS FORMATIVOS - MCCEMS 2025
// ========================================================================
// CONTRATO BFF: Este archivo contiene el texto OFICIAL y VERBATIM de cada
// Propósito Formativo según el Marco Curricular Común de la Educación
// Media Superior (MCCEMS). El agente NAI NO PUEDE modificar, parafrasear,
// resumir ni interpretar este contenido bajo ninguna circunstancia.
// ========================================================================

export interface PropositoFormativo {
    id: string;
    texto_oficial: string;
    contenidos_formativos: string[];
}

export interface NivelCurricular {
    nivel: string;
    nombre_semestre: string;
    meta_educativa: string;
    propositos: PropositoFormativo[];
}

// ========================================================================
// CNEYT - CIENCIAS NATURALES, EXPERIMENTALES Y TECNOLOGÍA
// NIVELES I - VI (6 SEMESTRES COMPLETOS)
// ========================================================================

export const CNEYT_CURRICULUM: Record<string, NivelCurricular> = {
    // ====================================================================
    // CNEYT I - INVITACIÓN A LA CIENCIA. NATURALEZA DE LA MATERIA
    // ====================================================================
    "I": {
        nivel: "I",
        nombre_semestre: "Invitación a la ciencia. Naturaleza de la materia",
        meta_educativa: "Comprenda el carácter creativo, social y colectivo de las ciencias naturales, a través de la apropiación de conceptos que permiten la construcción de explicaciones en torno a la naturaleza intrínseca de la materia.",
        propositos: [
            {
                id: "CNEYT-I-PF1",
                texto_oficial: "Reconoce la ciencia como actividad creativa, social y colectiva que involucra el planteamiento de preguntas y la búsqueda de explicaciones sobre fenómenos naturales de su entorno, a través de la experimentación y el análisis.",
                contenidos_formativos: [
                    "Concepto de ciencia",
                    "Relatos sobre la historia de los descubrimientos científicos y la ciencia en México",
                    "El método científico y el conocimiento empírico y tradicional, como formas de comprensión de la naturaleza",
                    "Medición: concepto de medición, magnitudes y unidad de medida, y su aplicación en las ciencias naturales"
                ]
            },
            {
                id: "CNEYT-I-PF2",
                texto_oficial: "Comprende que los fenómenos de la naturaleza están interrelacionados, y pueden estudiarse en su conjunto o de forma especializada, para la generación de conocimiento o innovación tecnológica.",
                contenidos_formativos: [
                    "Objetivos de estudio de la física, la química y la biología; elementos en común y sus diferencias",
                    "Ejemplos de ciencias naturales derivadas e interdisciplinares: ecología, ciencias de la Tierra, entre otros",
                    "Concepto de tecnología y su vínculo con las ciencias naturales"
                ]
            },
            {
                id: "CNEYT-I-PF3",
                texto_oficial: "Comprende los conceptos de materia, cuerpo, masa y densidad, a partir de los objetos del entorno perceptible, para describirlos y analizarlos.",
                contenidos_formativos: [
                    "Concepto de materia y cuerpo",
                    "Concepto de masa como cantidad de materia, unidad de medida y su diferencia con el concepto de peso",
                    "Concepto de densidad",
                    "Cálculo de volumen y densidad"
                ]
            },
            {
                id: "CNEYT-I-PF4",
                texto_oficial: "Comprende los conceptos de sustancia, sustancia pura, elemento compuesto y mezcla, y los aplica para clasificar de forma práctica o analítica distintos tipos de materia y reconocer sus propiedades físicas y químicas.",
                contenidos_formativos: [
                    "Clasificación de la materia",
                    "Propiedades físicas y químicas de la materia",
                    "Tipos y características de las mezclas; métodos de separación",
                    "Cálculo de concentración de disoluciones: masa-masa, masa-volumen, volumen-volumen y partes por millón",
                    "Clasificación periódica de los elementos"
                ]
            },
            {
                id: "CNEYT-I-PF5",
                texto_oficial: "Comprende el átomo y su composición eléctrica como la partícula microscópica que estructura la materia.",
                contenidos_formativos: [
                    "Teoría Atómica: Dalton, Thomson, Rutherford, Bohr y Schrödinger",
                    "Modelos atómicos y carga eléctrica",
                    "Número y masa atómica",
                    "Isótopos",
                    "Concepto de configuración electrónica y valencia"
                ]
            },
            {
                id: "CNEYT-I-PF6",
                texto_oficial: "Analiza la formación de iones, moléculas y sustancias, a partir de la unión de dos o más átomos que tienden a la estabilidad energética, para explicar la formación de enlaces químicos.",
                contenidos_formativos: [
                    "Enlace químico",
                    "Electronegatividad y fuerzas intramoleculares",
                    "Iones y moléculas"
                ]
            },
            {
                id: "CNEYT-I-PF7",
                texto_oficial: "Explica las propiedades físicas de los estados de agregación de la materia en función del movimiento, separación y fuerzas de atracción o repulsión de las partículas internas, y las vincula con los conceptos de energía cinética, potencial e interna.",
                contenidos_formativos: [
                    "Concepto de energía",
                    "Noción intuitiva de movimiento y conceptos de energía cinética, potencial e interna",
                    "Teoría cinética de la materia",
                    "Estados de agregación de la materia y sus cambios (sólidos, líquidos, gases y plasma)"
                ]
            },
            {
                id: "CNEYT-I-PF8",
                texto_oficial: "Construye explicaciones sobre la naturaleza energética y corpuscular de la materia, y explora aplicaciones tecnológicas relacionadas.",
                contenidos_formativos: [
                    "Fenómenos naturales donde participa la actividad eléctrica de la materia",
                    "Aplicaciones tecnológicas vinculadas con la materia"
                ]
            }
        ]
    },

    // ====================================================================
    // CNEYT II - EL PODER DE LA ENERGÍA
    // ====================================================================
    "II": {
        nivel: "II",
        nombre_semestre: "El poder de la energía",
        meta_educativa: "Comprenda la importancia de la energía para construir explicaciones sobre diversos fenómenos naturales.",
        propositos: [
            {
                id: "CNEYT-II-PF1",
                texto_oficial: "Comprende, a partir del análisis de fenómenos naturales cotidianos, que la energía puede transformarse y transferirse sin destruirse.",
                contenidos_formativos: [
                    "Definición de energía",
                    "Manifestaciones, tipos y transformación de la energía",
                    "Ley de conservación de la energía",
                    "Medición de la energía y unidades de medida"
                ]
            },
            {
                id: "CNEYT-II-PF2",
                texto_oficial: "Analiza el cambio de posición de un cuerpo al interactuar con otro, para comprender los conceptos de fuerza, movimiento y su relación con la energía mecánica.",
                contenidos_formativos: [
                    "Concepto de fuerza",
                    "Conceptos de posición, movimiento y velocidad",
                    "Concepto de energía mecánica",
                    "Cálculo de la energía cinética de un cuerpo o partícula"
                ]
            },
            {
                id: "CNEYT-II-PF3",
                texto_oficial: "Analiza el intercambio de calor entre cuerpos y con el entorno, para comprender su concepto, el de temperatura y su diferencia.",
                contenidos_formativos: [
                    "Calor y temperatura",
                    "Medición de calor",
                    "Escalas termométricas absolutas y relativa",
                    "Equilibrio térmico"
                ]
            },
            {
                id: "CNEYT-II-PF4",
                texto_oficial: "Analiza la interacción entre la energía y la estructura de la materia para comprender las formas de propagación de calor.",
                contenidos_formativos: [
                    "Propagación de calor: conducción y convección",
                    "Transferencia de calor por radiación",
                    "Conductividad calorífica y capacidad térmica específica"
                ]
            },
            {
                id: "CNEYT-II-PF5",
                texto_oficial: "Analiza el vínculo entre trabajo mecánico y calor, para comprender el concepto de termodinámica.",
                contenidos_formativos: [
                    "Trabajo mecánico",
                    "Concepto de termodinámica",
                    "Vínculo del trabajo mecánico con la termodinámica",
                    "Equivalencia entre una caloría y un Joule",
                    "Principio cero de la termodinámica"
                ]
            },
            {
                id: "CNEYT-II-PF6",
                texto_oficial: "Analiza tanto la producción de calor que se genera por procesos mecánicos como las propiedades de un gas ideal, para comprender la primera ley de la termodinámica.",
                contenidos_formativos: [
                    "Dinámica y ecuación de un gas ideal",
                    "Características de un sistema termodinámico: fronteras, sistemas abiertos o cerrados, y variables de estado",
                    "Primera ley de la termodinámica"
                ]
            },
            {
                id: "CNEYT-II-PF7",
                texto_oficial: "Analiza las aplicaciones de la primera ley de la termodinámica en situaciones de interés, para comprender el concepto de entropía, entalpía, así como la segunda y tercera leyes de la termodinámica.",
                contenidos_formativos: [
                    "Concepto de Entropía",
                    "Concepto de Entalpía",
                    "Segunda y tercera leyes de la termodinámica"
                ]
            },
            {
                id: "CNEYT-II-PF8",
                texto_oficial: "Construye explicaciones sobre fenómenos naturales en donde intervienen distintos tipos de energía, y explora aplicaciones tecnológicas relacionadas.",
                contenidos_formativos: [
                    "Fenómenos naturales donde interviene la energía",
                    "Aplicaciones tecnológicas de la energía"
                ]
            }
        ]
    },

    // ====================================================================
    // CNEYT III - NUESTRO HOGAR. EL SISTEMA TERRESTRE
    // ====================================================================
    "III": {
        nivel: "III",
        nombre_semestre: "Nuestro hogar. El sistema terrestre",
        meta_educativa: "Construya explicaciones sobre fenómenos naturales que subyacen a la estructura y función de sistemas o esferas terrestres, y comprenda su importancia para la existencia de la vida en la Tierra, así como la relevancia de las acciones humanas para su cuidado.",
        propositos: [
            {
                id: "CNEYT-III-PF1",
                texto_oficial: "Comprende a la Tierra como un sistema, a partir del análisis de los subsistemas que lo conforman y sus interacciones.",
                contenidos_formativos: [
                    "La Tierra como sistema y características generales de la hidrósfera, atmósfera, litósfera y la biósfera"
                ]
            },
            {
                id: "CNEYT-III-PF2",
                texto_oficial: "Aplica el conocimiento sobre los estados de agregación y clasificación de la materia; propiedades de los cuerpos y temperatura para explicar las capas, composición e interacción de la hidrósfera y atmósfera.",
                contenidos_formativos: [
                    "Capas y composición química de la hidrósfera y la atmósfera",
                    "Conceptos involucrados: aire, agua, densidad, presión, temperatura y compuestos químicos",
                    "Ciclo biogeoquímico del agua",
                    "Concepto de clima y tiempo atmosférico"
                ]
            },
            {
                id: "CNEYT-III-PF3",
                texto_oficial: "Analiza los flujos de materia y energía que suceden en los ecosistemas y entre las esferas terrestres, para comprender la importancia de la cadena trófica y el concepto de equilibrio ecológico.",
                contenidos_formativos: [
                    "Concepto de ecosistema y biodiversidad; relación con la biósfera",
                    "Componentes bióticos y abióticos del ecosistema",
                    "Cadena trófica",
                    "Biomasa y concepto de productividad primaria",
                    "Eficiencia ecológica",
                    "Ciclo biogeoquímico del carbono y aspectos generales de los ciclos del nitrógeno y del fósforo",
                    "Concepto de equilibrio ecológico"
                ]
            },
            {
                id: "CNEYT-III-PF4",
                texto_oficial: "Analiza la estructura de una reacción química para comprender su importancia como proceso de transformación de la materia.",
                contenidos_formativos: [
                    "Concepto de reacción química",
                    "Estructura de una reacción química",
                    "Ecuación química como forma de representar una reacción",
                    "Simbología utilizada en fórmulas y reacciones químicas"
                ]
            },
            {
                id: "CNEYT-III-PF5",
                texto_oficial: "Comprende la importancia del oxígeno para la vida en la Tierra, a partir del análisis del proceso de oxigenación de la atmósfera primitiva y la intervención de los organismos fotosintéticos.",
                contenidos_formativos: [
                    "Composición química de la atmósfera reductora según Oparin-Haldane y las diferencias con la atmósfera actual",
                    "Ciclo biogeoquímico del oxígeno",
                    "Formación de óxidos básicos y ácidos"
                ]
            },
            {
                id: "CNEYT-III-PF6",
                texto_oficial: "Comprende el proceso general de la fotosíntesis y su importancia para la transferencia de energía en la cadena trófica, así como para la captura del dióxido de carbono y la liberación de oxígeno.",
                contenidos_formativos: [
                    "Fotosíntesis: aspectos generales de la fase luminosa y el ciclo de Calvin; ecuación y productos de la fotosíntesis",
                    "Importancia de los organismos autótrofos para la vida en la Tierra"
                ]
            },
            {
                id: "CNEYT-III-PF7",
                texto_oficial: "Analiza la dinámica de los subsistemas terrestres y la actividad humana, para comprender el concepto de deterioro ambiental, sus escalas y manifestaciones.",
                contenidos_formativos: [
                    "Concepto de deterioro ambiental",
                    "Deterioro a nivel global: el calentamiento y su relación con el efecto invernadero y el cambio climático; pérdida de la biodiversidad",
                    "Deterioro a nivel local: deforestación",
                    "Contaminación antropogénica, atmosférica y del agua"
                ]
            },
            {
                id: "CNEYT-III-PF8",
                texto_oficial: "Construye explicaciones sobre innovaciones tecnológicas que utilizan el conocimiento de los subsistemas terrestres para reducir el deterioro ambiental.",
                contenidos_formativos: [
                    "Restauración de ecosistemas",
                    "Aplicaciones tecnológicas para la reducción del deterioro ambiental"
                ]
            }
        ]
    },

    // ====================================================================
    // CNEYT IV - EL PODER DE LA QUÍMICA
    // ====================================================================
    "IV": {
        nivel: "IV",
        nombre_semestre: "El poder de la química",
        meta_educativa: "Comprenda la química como el estudio de la estructura, propiedades y transformación de la materia, para construir explicaciones sobre diversos fenómenos naturales.",
        propositos: [
            {
                id: "CNEYT-IV-PF1",
                texto_oficial: "Comprende las características de las reacciones químicas para clasificarlas e identificarlas en distintos fenómenos naturales de interés.",
                contenidos_formativos: [
                    "Características de las reacciones químicas: reactivos y productos; reorganización de átomos; liberación y absorción de energía",
                    "Energía química",
                    "Clasificación de las reacciones químicas (exotérmicas, endotérmicas, de síntesis, de descomposición, de desplazamiento y neutralización)",
                    "Identificación de reacciones químicas en la naturaleza y el desarrollo tecnológico"
                ]
            },
            {
                id: "CNEYT-IV-PF2",
                texto_oficial: "Aplica el método de tanteo para el balanceo de ecuaciones, como una forma de verificación de la ley de conservación de la masa en las reacciones químicas.",
                contenidos_formativos: [
                    "Ley de conservación de la masa",
                    "Mol y Masa molar",
                    "Balanceo de ecuaciones por el método de tanteo",
                    "Mención de los métodos algebraico y redox para balanceo"
                ]
            },
            {
                id: "CNEYT-IV-PF3",
                texto_oficial: "Comprende el concepto de equilibrio químico y la dinámica de las reacciones reversibles e irreversibles, para identificarlas en fenómenos naturales cotidianos o de interés.",
                contenidos_formativos: [
                    "Reacciones reversibles e irreversibles",
                    "Constante y ecuación de equilibrio químico",
                    "Identificación de reacciones reversibles e irreversibles en la naturaleza"
                ]
            },
            {
                id: "CNEYT-IV-PF4",
                texto_oficial: "Analiza las propiedades físicas y químicas de sustancias ácidas y básicas de interés, así como su diferenciación de acuerdo con el potencial de Hidrógeno, para su identificación en la naturaleza o la vida cotidiana.",
                contenidos_formativos: [
                    "Teorías sobre los ácidos y las bases de Arrhenius, Bronsted-Lowry y Lewis",
                    "Clasificación de acuerdo con su conductividad",
                    "Potencial de Hidrógeno (pH) y diferenciación de las sustancias de interés de acuerdo con su valor"
                ]
            },
            {
                id: "CNEYT-IV-PF5",
                texto_oficial: "Comprende las reacciones químicas de óxido-reducción y combustión para identificar su ocurrencia en la naturaleza, la vida cotidiana, así como su importancia para los seres vivos y la industria.",
                contenidos_formativos: [
                    "Reacciones de oxidación-reducción",
                    "Reacciones de combustión",
                    "Reacciones redox y de combustión en la naturaleza y la vida cotidiana",
                    "Importancia de las reacciones redox y de combustión para los seres vivos y la industria"
                ]
            },
            {
                id: "CNEYT-IV-PF6",
                texto_oficial: "Comprende la importancia de los compuestos orgánicos para el bienestar humano, así como su estructura, propiedades y nomenclatura para clasificarlos de forma analítica.",
                contenidos_formativos: [
                    "Importancia de los compuestos orgánicos para el bienestar humano",
                    "Estructura del carbono y sus tipos de enlace",
                    "Clasificación de los compuestos orgánicos, grupos funcionales y su nomenclatura",
                    "Definición de monómeros y polímeros"
                ]
            },
            {
                id: "CNEYT-IV-PF7",
                texto_oficial: "Analiza las características y funciones de las biomoléculas, para comprender la importancia de los compuestos orgánicos en los seres vivos.",
                contenidos_formativos: [
                    "Funciones y características de los carbohidratos, lípidos, proteínas y ácidos nucleicos",
                    "Clasificación de los carbohidratos: monosacáridos, disacáridos y polisacáridos",
                    "Clasificación de los lípidos: aceites, grasas, fosfolípidos y esteroides",
                    "Aminoácidos esenciales y no esenciales"
                ]
            },
            {
                id: "CNEYT-IV-PF8",
                texto_oficial: "Comprende los procesos químicos involucrados en la respiración aerobia y anaerobia, para identificar su importancia para los seres vivos y el bienestar humano y desarrollos tecnológicos vinculados.",
                contenidos_formativos: [
                    "Aspectos químicos de la glucólisis, ciclo de Krebs y cadena transportadora de electrones",
                    "Aspectos químicos de la fermentación",
                    "Desarrollos tecnológicos vinculados con la respiración aerobia y anaerobia"
                ]
            }
        ]
    },

    // ====================================================================
    // CNEYT V - DEL ÁTOMO AL UNIVERSO. FUERZA Y ENERGÍA
    // ====================================================================
    "V": {
        nivel: "V",
        nombre_semestre: "Del átomo al universo. Fuerza y energía",
        meta_educativa: "Cuestione los fenómenos naturales que observa en su realidad inmediata, para la construcción de explicaciones sobre aquellos de carácter mecánico, ondulatorio, óptico y gravitatorio, a partir de su análisis conceptual y matemático.",
        propositos: [
            {
                id: "CNEYT-V-PF1",
                texto_oficial: "Analiza la caída libre de los objetos y el movimiento rectilíneo uniforme de los cuerpos, en presencia y ausencia de la intervención de fuerzas, para construir explicaciones sobre la dinámica del movimiento uniforme y uniformemente acelerado, considerando las dos primeras leyes de Newton.",
                contenidos_formativos: [
                    "Concepto de fuerza, sus efectos y manifestaciones en fenómenos naturales cotidianos",
                    "Concepto de peso, unidad escalar de una fuerza y su diferencia con el concepto de masa",
                    "Movimiento uniforme y uniformemente acelerado",
                    "Representación gráfica del movimiento y cálculo de velocidad y aceleración",
                    "Carácter vectorial de una fuerza. Vectores y parámetros",
                    "Conceptos de fuerza neta, fricción e inercia",
                    "Primera y segunda leyes de Newton"
                ]
            },
            {
                id: "CNEYT-V-PF2",
                texto_oficial: "Construye explicaciones sobre los fenómenos de acción y reacción en la interacción de los cuerpos, a partir de la comprensión de la tercera ley de Newton.",
                contenidos_formativos: [
                    "Representación vectorial de las fuerzas analizadas",
                    "Tercera ley de Newton"
                ]
            },
            {
                id: "CNEYT-V-PF3",
                texto_oficial: "Construye explicaciones sobre la caída libre de objetos con diferente masa y las órbitas de los cuerpos celestes, a partir de la comprensión de la ley de la gravitación universal y el movimiento planetario.",
                contenidos_formativos: [
                    "Fuerza gravitacional: masa, distancia y aceleración",
                    "Ley de la gravitación universal: ecuación matemática",
                    "Constante de Cavendish",
                    "Leyes del movimiento planetario de Kepler"
                ]
            },
            {
                id: "CNEYT-V-PF4",
                texto_oficial: "Explica el comportamiento de fenómenos ondulatorios de interés, a partir de la comprensión de las propiedades físicas que los afectan.",
                contenidos_formativos: [
                    "Movimiento ondulatorio",
                    "Tipos de ondas: armónicas, mecánicas, electromagnéticas, transversales y longitudinales",
                    "Características de las ondas",
                    "Velocidad de propagación"
                ]
            },
            {
                id: "CNEYT-V-PF5",
                texto_oficial: "Comprende el comportamiento de la luz para explicar fenómenos naturales de carácter óptico.",
                contenidos_formativos: [
                    "Modelo de rayos de luz",
                    "Reflexión y refracción de la luz",
                    "Lentes convergentes y divergentes",
                    "Modelo corpuscular y ondulatorio de la luz"
                ]
            },
            {
                id: "CNEYT-V-PF6",
                texto_oficial: "Analiza el comportamiento de fluidos para comprender sus propiedades físicas.",
                contenidos_formativos: [
                    "Principio de Pascal y de Arquímedes",
                    "Tensión superficial y capilaridad",
                    "Ecuación de continuidad y de Bernoulli",
                    "Viscosidad"
                ]
            },
            {
                id: "CNEYT-V-PF7",
                texto_oficial: "Comprende los fundamentos del magnetismo y la electricidad, así como su relación para construir explicaciones sobre fenómenos electromagnéticos y explorar aplicaciones tecnológicas vinculadas.",
                contenidos_formativos: [
                    "Caracterización de fenómenos eléctricos y magnéticos",
                    "Campos magnéticos y eléctricos",
                    "Ley de Ohm-Coulomb",
                    "Ley de Ampere-Maxwell",
                    "Ley de Faraday-Henry",
                    "Aplicaciones tecnológicas vinculadas al electromagnetismo"
                ]
            },
            {
                id: "CNEYT-V-PF8",
                texto_oficial: "Discute con carácter divulgativo temas de interés de la física moderna y contemporánea.",
                contenidos_formativos: [
                    "Divulgación de temas de interés sobre estas sugerencias:",
                    "a) Teoría de la relatividad especial y general de Einstein",
                    "b) Mecánica cuántica",
                    "c) Física de partículas y nuclear",
                    "d) Condensado de Bose-Einstein",
                    "e) Teleportación y computación cuántica",
                    "f) Cosmología moderna",
                    "g) Superconductores"
                ]
            }
        ]
    },

    // ====================================================================
    // CNEYT VI - ¿QUÉ ES LA VIDA? EVOLUCIÓN Y DIVERSIDAD BIOLÓGICA
    // ====================================================================
    "VI": {
        nivel: "VI",
        nombre_semestre: "¿Qué es la vida? Evolución y diversidad biológica",
        meta_educativa: "Comprenda los rasgos que caracterizan a los seres vivos para construir explicaciones sobre fenómenos naturales, mediados por el funcionamiento celular, la herencia y la evolución biológica.",
        propositos: [
            {
                id: "CNEYT-VI-PF1",
                texto_oficial: "Analiza las interacciones entre materia y energía de la Tierra primitiva, así como la estructura de las biomoléculas para comprender la teoría quimiosintética del origen de la vida.",
                contenidos_formativos: [
                    "Teorías sobre el origen de la vida: creacionismo, generación espontánea y panspermia",
                    "Concepto de quimiosíntesis",
                    "Teoría quimiosintética de Oparin-Haldane sobre el origen de la vida",
                    "Experimento de Miller-Urey"
                ]
            },
            {
                id: "CNEYT-VI-PF2",
                texto_oficial: "Analiza los procesos históricos que llevaron al descubrimiento de la célula y el desarrollo de la teoría celular como unidad fundamental de los organismos vivos.",
                contenidos_formativos: [
                    "Procesos históricos que llevaron al descubrimiento de la célula",
                    "Teoría celular"
                ]
            },
            {
                id: "CNEYT-VI-PF3",
                texto_oficial: "Analiza las moléculas orgánicas y organelos celulares para comprender su estructura y función, y reconocer entre células procariotas, eucariotas y su relevancia en la naturaleza o el bienestar humano.",
                contenidos_formativos: [
                    "Moléculas orgánicas de las células y su función",
                    "Organelos celulares, su estructura y su función",
                    "Diferencias entre células procariotas y eucariotas",
                    "Teoría endosimbiótica de Lynn Margulis",
                    "Relevancia de las células procariotas y eucariotas: salud, fotosíntesis, oxigenación, entre otras"
                ]
            },
            {
                id: "CNEYT-VI-PF4",
                texto_oficial: "Analiza la estructura molecular y las funciones del ADN y el ARN, así como las características de los cromosomas, para comprender las bases moleculares de la herencia biológica y su utilidad como herramienta de análisis genético.",
                contenidos_formativos: [
                    "Concepto de herencia biológica y gen",
                    "Estructura del ADN y el ARN; nucleótidos presentes",
                    "Características de los cromosomas",
                    "Aplicaciones del ADN como herramienta de análisis genético"
                ]
            },
            {
                id: "CNEYT-VI-PF5",
                texto_oficial: "Identifica las fases de la mitosis y la meiosis para comprender su importancia como mecanismos de reproducción celular, y reconocer los procesos fundamentales de la división celular, así como las situaciones de interés en donde está implicada.",
                contenidos_formativos: [
                    "Fases e importancia de la mitosis",
                    "Fases e importancia de la meiosis",
                    "Importancia de la recombinación genética como factor de biodiversidad",
                    "Procesos fundamentales de la división celular y situaciones de interés en donde la reproducción celular está implicada"
                ]
            },
            {
                id: "CNEYT-VI-PF6",
                texto_oficial: "Analiza los mecanismos de herencia biológica e identifica sus manifestaciones en situaciones reales, para comprender la importancia de la genética.",
                contenidos_formativos: [
                    "Conceptos de fenotipo y genotipo",
                    "Leyes de Mendel y cuadros de Punnett",
                    "Codominancia",
                    "Teoría cromosómica de la herencia",
                    "Características debidas a la herencia biológica",
                    "Concepto de mutación, ejemplos e importancia evolutiva",
                    "Relevancia de la herencia genética para los seres vivos"
                ]
            },
            {
                id: "CNEYT-VI-PF7",
                texto_oficial: "Comprende el proceso de evolución por selección natural, para construir explicaciones sobre la diversidad biológica y las adaptaciones de especies de interés.",
                contenidos_formativos: [
                    "Concepto de evolución biológica",
                    "Teoría evolutiva de Lamarck",
                    "Teoría evolutiva de Darwin-Wallace por selección natural",
                    "Aspectos generales de la síntesis evolutiva moderna",
                    "Diversidad de especies, su relación con la evolución y ejemplos de adaptaciones en las especies actuales"
                ]
            },
            {
                id: "CNEYT-VI-PF8",
                texto_oficial: "Comprende las características que identifican a los seres vivos, para construir explicaciones sobre fenómenos biológicos vinculados a los contenidos formativos, y analiza aplicaciones tecnológicas relacionadas.",
                contenidos_formativos: [
                    "Características que identifican a los seres vivos",
                    "Fenómenos naturales biológicos vinculados a los temas revisados",
                    "Desarrollos tecnológicos vinculados a la célula, su estructura y función, a la genética o a la biodiversidad"
                ]
            }
        ]
    }
};

// ========================================================================
// PMI - PENSAMIENTO MATEMÁTICO
// Importado desde archivo separado para mantener estructura modular
// ========================================================================

import { PM_CURRICULUM } from "./canonical-pm-data";
export const PMI_CURRICULUM = PM_CURRICULUM;

// ========================================================================
// FUNCIONES DE ACCESO A DATOS CANÓNICOS
// ========================================================================

/**
 * Obtiene el ID canónico de un Propósito Formativo por su índice.
 */
export const getCanonicalPF = (asignatura: string, nivel: string, index: number): string | null => {
    const curriculum = asignatura === "CNEYT" ? CNEYT_CURRICULUM : PMI_CURRICULUM;
    const nivelData = curriculum[nivel];

    if (!nivelData) {
        console.warn(`[CANON] No existe nivel ${nivel} para ${asignatura}`);
        return null;
    }

    const pf = nivelData.propositos[index - 1];
    if (!pf) {
        console.warn(`[CANON] No existe PF${index} en ${asignatura}-${nivel}`);
        return null;
    }

    console.log(`[CANON] ${asignatura}-${nivel}-PF${index} = ${pf.id}`);
    return pf.id;
};

/**
 * Obtiene el conteo de Propósitos Formativos de un nivel.
 */
export const getPFCount = (asignatura: string, nivel: string): number => {
    const curriculum = asignatura === "CNEYT" ? CNEYT_CURRICULUM : PMI_CURRICULUM;
    const nivelData = curriculum[nivel];
    const count = nivelData?.propositos.length || 0;
    console.log(`[CANON] PF Count for ${asignatura}-${nivel}: ${count}`);
    return count;
};

/**
 * Obtiene el objeto completo del Propósito Formativo actual.
 * Esta es la función principal para inyectar contexto al modelo.
 */
export const getPropositoFormativo = (pfId: string): PropositoFormativo | null => {
    // Parsear el ID (formato: CNEYT-I-PF1 o CNEYT-VI-PF8)
    const match = pfId.match(/^(CNEYT|PMI)-([IVX]+)-PF(\d+)$/);
    if (!match) {
        console.warn(`[CANON] ID inválido: ${pfId}`);
        return null;
    }

    const [, asig, nivel, numStr] = match;
    const num = parseInt(numStr, 10);

    const curriculum = asig === "CNEYT" ? CNEYT_CURRICULUM : PMI_CURRICULUM;
    const nivelData = curriculum[nivel];

    if (!nivelData) {
        console.warn(`[CANON] Nivel no encontrado: ${nivel}`);
        return null;
    }

    const pf = nivelData.propositos[num - 1];
    if (!pf) {
        console.warn(`[CANON] PF no encontrado: PF${num} en ${asig}-${nivel}`);
        return null;
    }

    return pf;
};

/**
 * Obtiene la información completa del nivel curricular.
 */
export const getNivelCurricular = (asignatura: string, nivel: string): NivelCurricular | null => {
    const curriculum = asignatura === "CNEYT" ? CNEYT_CURRICULUM : PMI_CURRICULUM;
    return curriculum[nivel] || null;
};

/**
 * Genera el contexto BFF para inyectar al modelo.
 * Este texto se añade al prompt para que el agente tenga el contenido
 * oficial sin necesidad de recordarlo o inventarlo.
 */
export const generarContextoBFF = (asignatura: string, nivel: string, pfActualId: string): string => {
    const nivelData = getNivelCurricular(asignatura, nivel);
    const pfActual = getPropositoFormativo(pfActualId);

    if (!nivelData || !pfActual) {
        return "ERROR: No se pudo cargar el contexto curricular.";
    }

    // Calcular el índice del PF siguiente (si existe)
    const pfIndex = nivelData.propositos.findIndex(p => p.id === pfActualId);
    const pfSiguiente = nivelData.propositos[pfIndex + 1] || null;

    return `
========================================================================
📚 CONTEXTO CURRICULAR BFF (SOLO LECTURA - NO MODIFICAR)
========================================================================

ASIGNATURA: ${asignatura}
NIVEL: ${nivel} - ${nivelData.nombre_semestre}
META EDUCATIVA DEL SEMESTRE:
"${nivelData.meta_educativa}"

------------------------------------------------------------------------
🎯 PROPÓSITO FORMATIVO ACTUAL: ${pfActual.id}
------------------------------------------------------------------------
TEXTO OFICIAL (VERBATIM - NO PARAFRASEAR):
"${pfActual.texto_oficial}"

CONTENIDOS FORMATIVOS ASOCIADOS:
${pfActual.contenidos_formativos.map((c, i) => `  ${i + 1}. ${c}`).join('\n')}

${pfSiguiente ? `
------------------------------------------------------------------------
➡️ PROPÓSITO FORMATIVO SIGUIENTE: ${pfSiguiente.id}
------------------------------------------------------------------------
TEXTO OFICIAL:
"${pfSiguiente.texto_oficial}"
` : `
------------------------------------------------------------------------
⚠️ ÚLTIMO PROPÓSITO FORMATIVO DEL NIVEL
------------------------------------------------------------------------
Al acreditar este PF, el estudiante habrá completado el nivel ${nivel}.
`}

========================================================================
⚠️ RESTRICCIONES BFF (CONTRATO INVIOLABLE)
========================================================================
1. NO PUEDES modificar, parafrasear, resumir ni interpretar el texto
   del Propósito Formativo. Debes citarlo EXACTAMENTE como aparece.
2. NO PUEDES mezclar contenidos de otros niveles. Solo puedes usar los
   contenidos formativos listados arriba para este PF.
3. NO PUEDES inventar conceptos, teorías o ejemplos que no estén en
   el MCCEMS.
4. DEBES vincular tus preguntas y actividades a los contenidos
   formativos específicos del PF activo.
========================================================================
`;
};

// ========================================================================
// SECUENCIA DE PF (COMPATIBILIDAD CON CÓDIGO EXISTENTE)
// ========================================================================

export const PF_SEQUENCE: Record<string, Record<string, string[]>> = {
    PMI: {
        I: ["PMI-I-PF1", "PMI-I-PF2", "PMI-I-PF3", "PMI-I-PF4", "PMI-I-PF5", "PMI-I-PF6", "PMI-I-PF7"],
        II: ["PMI-II-PF1", "PMI-II-PF2", "PMI-II-PF3", "PMI-II-PF4", "PMI-II-PF5"],
        III: ["PMI-III-PF1", "PMI-III-PF2", "PMI-III-PF3", "PMI-III-PF4", "PMI-III-PF5", "PMI-III-PF6"],
        IV: ["PMI-IV-PF1", "PMI-IV-PF2", "PMI-IV-PF3", "PMI-IV-PF4", "PMI-IV-PF5", "PMI-IV-PF6", "PMI-IV-PF7"],
        V: ["PMI-V-PF1", "PMI-V-PF2", "PMI-V-PF3", "PMI-V-PF4", "PMI-V-PF5", "PMI-V-PF6", "PMI-V-PF7", "PMI-V-PF8"],
        VI: ["PMI-VI-PF1", "PMI-VI-PF2", "PMI-VI-PF3", "PMI-VI-PF4", "PMI-VI-PF5", "PMI-VI-PF6", "PMI-VI-PF7", "PMI-VI-PF8"]
    },
    CNEYT: {
        I: ["CNEYT-I-PF1", "CNEYT-I-PF2", "CNEYT-I-PF3", "CNEYT-I-PF4", "CNEYT-I-PF5", "CNEYT-I-PF6", "CNEYT-I-PF7", "CNEYT-I-PF8"],
        II: ["CNEYT-II-PF1", "CNEYT-II-PF2", "CNEYT-II-PF3", "CNEYT-II-PF4", "CNEYT-II-PF5", "CNEYT-II-PF6", "CNEYT-II-PF7", "CNEYT-II-PF8"],
        III: ["CNEYT-III-PF1", "CNEYT-III-PF2", "CNEYT-III-PF3", "CNEYT-III-PF4", "CNEYT-III-PF5", "CNEYT-III-PF6", "CNEYT-III-PF7", "CNEYT-III-PF8"],
        IV: ["CNEYT-IV-PF1", "CNEYT-IV-PF2", "CNEYT-IV-PF3", "CNEYT-IV-PF4", "CNEYT-IV-PF5", "CNEYT-IV-PF6", "CNEYT-IV-PF7", "CNEYT-IV-PF8"],
        V: ["CNEYT-V-PF1", "CNEYT-V-PF2", "CNEYT-V-PF3", "CNEYT-V-PF4", "CNEYT-V-PF5", "CNEYT-V-PF6", "CNEYT-V-PF7", "CNEYT-V-PF8"],
        VI: ["CNEYT-VI-PF1", "CNEYT-VI-PF2", "CNEYT-VI-PF3", "CNEYT-VI-PF4", "CNEYT-VI-PF5", "CNEYT-VI-PF6", "CNEYT-VI-PF7", "CNEYT-VI-PF8"]
    }
};
