// Estructura de datos para las Misiones (Sílabo)
// Basado en: "Fundamentos de Tecnologías de la Información / Tecnologías Emergentes"

export const silabo = [
  {
    id: "unit_1",
    title: "UT 1: Introducción general a las Tecnologías Emergentes y a la IA",
    description: "Comprende las bases de las tecnologías disruptivas y la Inteligencia Artificial.",
    totalXp: 400,
    sessions: [
      {
        id: "u1_s1",
        name: "Sesión 1: Fundamentos y Conceptos",
        lessons: [
          { 
            id: "l1_1", 
            title: "1.1 Introducción al concepto de Tecnologías Emergentes", 
            type: "theory", 
            xpReward: 50,
            isUnlocked: true, // Única lección abierta por defecto al iniciar el curso
            content: [
              { type: "subtitle", value: "¿Qué son las Tecnologías Emergentes?" },
              { type: "text", value: "Las tecnologías emergentes son innovaciones tecnológicas en desarrollo o en fase de adopción temprana. Poseen el potencial de transformar radicalmente las industrias, la economía y la sociedad. A diferencia de las tecnologías tradicionales, estas se encuentran en rápida evolución y su impacto final a menudo es incierto pero prometedor." },
              { type: "image", alt: "Ecosistema Digital de Innovación", url: "" },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Novedad Radical: Introducen capacidades que antes no existían o mejoran drásticamente las actuales.",
                "Crecimiento Rápido: Su desarrollo avanza a pasos agigantados, dejando obsoletas las tecnologías anteriores rápidamente.",
                "Impacto Prominente: Tienen el poder de alterar modelos de negocio completos y cambiar nuestro estilo de vida.",
                "Incertidumbre: Al estar en fase de desarrollo, sus límites, regulaciones y aplicaciones finales aún se están definiendo."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso Destacados" },
              { type: "list", items: [
                "Inteligencia Artificial (IA): Asistentes virtuales, diagnóstico médico asistido y conducción autónoma.",
                "Internet de las Cosas (IoT): Monitoreo de ciudades inteligentes, agricultura de precisión y domótica.",
                "Blockchain: Trazabilidad inmutable en la cadena de suministro y contratos inteligentes (Smart Contracts).",
                "Realidad Virtual y Aumentada (VR/AR): Simulaciones inmersivas para entrenamiento industrial y médico."
              ]}
            ],
            quiz: [
              {
                question: "¿Cuál de las siguientes NO es una característica de una tecnología emergente?",
                options: ["Novedad Radical", "Impacto Prominente", "Crecimiento Lento y Estático", "Incertidumbre"],
                correctAnswer: 2
              },
              {
                question: "¿Qué tecnología emergente se utiliza principalmente para garantizar la seguridad y trazabilidad descentralizada?",
                options: ["Realidad Virtual (VR)", "Blockchain", "Impresión 3D", "Computación Cuántica"],
                correctAnswer: 1
              }
            ]
          },
          { 
            id: "l1_2", 
            title: "1.2 Introducción general a la Inteligencia Artificial (IA)", 
            type: "theory", 
            xpReward: 50,
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "El Concepto de Inteligencia Artificial" },
              { type: "text", value: "La Inteligencia Artificial (IA) es un campo de la informática dedicado a crear sistemas capaces de realizar tareas que normalmente requieren inteligencia humana, como el reconocimiento de voz, la toma de decisiones, la visión artificial y la traducción de idiomas." },
              { type: "image", alt: "Cerebro Artificial Inteligente", url: "" },
              { type: "subtitle", value: "Subcampos y Características" },
              { type: "list", items: [
                "Aprendizaje Automático (Machine Learning): Capacidad de aprender de los datos sin ser programados explícitamente regla por regla.",
                "Procesamiento de Lenguaje Natural (NLP): Capacidad de entender, interpretar e interactuar usando el lenguaje humano escrito o hablado.",
                "Razonamiento y Lógica Algorítmica: Habilidad de inferir conclusiones óptimas a partir de reglas y datos masivos."
              ]},
              { type: "subtitle", value: "Casos de Uso Cotidianos" },
              { type: "text", value: "La IA ya no es ciencia ficción. Está presente en motores de recomendación (como Netflix o Spotify), vehículos autónomos (Tesla, Waymo) y plataformas de servicio al cliente automatizado mediante chatbots avanzados." }
            ],
            quiz: [
              {
                question: "¿Qué subcampo de la IA permite a las máquinas aprender y mejorar a partir de datos históricos?",
                options: ["Realidad Aumentada", "Machine Learning", "Cloud Computing", "Ciberseguridad"],
                correctAnswer: 1
              },
              {
                question: "¿Qué tecnología de IA permite a los asistentes de voz entender el idioma humano?",
                options: ["NLP (Procesamiento de Lenguaje Natural)", "Blockchain", "IoT", "Robótica Industrial"],
                correctAnswer: 0
              }
            ]
          }
        ]
      },
      {
        id: "u1_s2",
        name: "Sesión 2: Intersección e Impacto",
        lessons: [
          { 
            id: "l1_3", 
            title: "1.3 La intersección entre Tecnologías Emergentes e IA", 
            type: "theory", 
            xpReward: 50,
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Sinergia Tecnológica" },
              { type: "text", value: "Las tecnologías emergentes alcanzan su verdadero potencial cuando convergen. En este ecosistema, la IA actúa como el 'cerebro' que procesa y toma decisiones, mientras que otras tecnologías, como el Internet de las Cosas (IoT), actúan como los 'sentidos' que recopilan datos del mundo físico." },
              { type: "image", alt: "Convergencia Tecnológica", url: "" },
              { type: "subtitle", value: "La Fusión de la IA con otras tecnologías" },
              { type: "list", items: [
                "IA + IoT (AIoT): Dispositivos que no solo recopilan datos, sino que actúan sobre ellos de forma autónoma (ej. termostatos inteligentes que aprenden tus rutinas).",
                "IA + Blockchain: Sistemas donde la IA toma decisiones y la cadena de bloques registra cada paso para garantizar transparencia absoluta y evitar manipulaciones.",
                "IA + Robótica: Robots de ensamblaje en fábricas que detectan anomalías en tiempo real y optimizan sus propios procesos mecánicos."
              ]}
            ],
            quiz: [
              {
                question: "En la combinación de IA e IoT (AIoT), ¿cuál es el papel principal del IoT?",
                options: ["Tomar decisiones lógicas complejas", "Actuar como el 'cerebro' del sistema", "Actuar como 'sentidos' recopilando datos del mundo físico", "Crear mundos virtuales"],
                correctAnswer: 2
              }
            ]
          },
          { 
            id: "l1_4", 
            title: "1.4 Impacto, desafíos y futuro", 
            type: "theory", 
            xpReward: 50,
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "El Impacto en el Mercado Laboral" },
              { type: "text", value: "La adopción masiva de la IA está redefiniendo el trabajo. Tareas repetitivas y manuales se automatizan, lo que genera desplazamiento en ciertos sectores. Sin embargo, también nacen nuevos roles enfocados en el desarrollo algorítmico, mantenimiento de sistemas y supervisión ética." },
              { type: "subtitle", value: "Desafíos Éticos y Técnicos Críticos" },
              { type: "list", items: [
                "Sesgos Algorítmicos: La IA puede heredar y amplificar los prejuicios humanos si los datos con los que se entrena contienen sesgos históricos.",
                "Privacidad y Seguridad: El volumen masivo de datos necesarios para entrenar IA crea vulnerabilidades severas en la privacidad del usuario.",
                "Problema de la Caja Negra (Black Box): Especialmente en el Deep Learning, a menudo es imposible para un humano entender los pasos exactos que tomó la IA para llegar a una decisión."
              ]}
            ],
            quiz: [
              {
                question: "¿A qué se refiere el problema de la 'Caja Negra' en la IA?",
                options: ["Servidores de IA apagados.", "La dificultad para entender la lógica interna de cómo un modelo llega a una conclusión.", "Un error en la base de datos.", "El costo del hardware."],
                correctAnswer: 1
              },
              {
                question: "¿Cuál es uno de los principales riesgos éticos al entrenar modelos de IA?",
                options: ["Consumo eléctrico excesivo.", "Sesgos algorítmicos derivados de datos prejuiciosos.", "Velocidad de procesamiento lenta.", "Fallo de conexión."],
                correctAnswer: 1
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "unit_2",
    title: "UT 2: Gestión de Conocimientos y Avances Tecnológicos",
    description: "Aprende cómo las organizaciones manejan la información en la era digital.",
    totalXp: 350,
    sessions: [
      {
        id: "u2_s1",
        name: "Sesión 4: Fundamentos de Gestión",
        lessons: [
          { 
            id: "l2_1", 
            title: "2.1 Fundamentos de la gestión del conocimiento", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "¿Qué es la Gestión del Conocimiento?" },
              { type: "text", value: "Es el proceso sistemático de identificar, capturar, estructurar, valorar y compartir los activos de información y el conocimiento de una organización, permitiendo que esta sea más competitiva y evite la pérdida de 'know-how' cuando los empleados se van." },
              { type: "image", alt: "Gestión de Datos", url: "" },
              { type: "subtitle", value: "Conocimiento Tácito vs Explícito" },
              { type: "list", items: [
                "Conocimiento Explícito: Información estructurada que es fácil de articular, escribir y almacenar (Manuales, Bases de datos, Documentos, Fórmulas).",
                "Conocimiento Tácito: Conocimiento personal arraigado en la experiencia individual, intuición y habilidades prácticas. Es muy difícil de transferir (Ej. la intuición de un cirujano experto)."
              ]}
            ],
            quiz: [
              {
                question: "¿Qué tipo de conocimiento es aquel basado en la experiencia personal y es difícil de escribir en un manual?",
                options: ["Conocimiento Explícito", "Conocimiento Tácito", "Conocimiento Binario", "Conocimiento Digital"],
                correctAnswer: 1
              }
            ]
          },
          { 
            id: "l2_2", 
            title: "2.2 Avances tecnológicos y su impacto en la gestión", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "El cambio de paradigma en el almacenamiento" },
              { type: "text", value: "Históricamente, la gestión del conocimiento dependía de grandes archivos físicos y la memoria humana. Hoy, la computación en la nube (Cloud Computing) permite el acceso global a la información corporativa desde cualquier lugar." },
              { type: "subtitle", value: "El rol de las Tecnologías Emergentes" },
              { type: "text", value: "La IA y el Machine Learning ahora se utilizan para buscar patrones, categorizar documentos automáticamente y extraer respuestas instantáneas a partir de petabytes de datos corporativos, convirtiendo la información muerta en conocimiento accionable." }
            ],
            quiz: [
              {
                question: "¿Qué tecnología ha permitido el acceso global, remoto y colaborativo a los activos de conocimiento de una empresa?",
                options: ["El Archivo Físico", "Computación en la Nube (Cloud)", "La Realidad Virtual", "La Impresión 3D"],
                correctAnswer: 1
              }
            ]
          }
        ]
      }
    ]
  }
];

export const calculateLevel = (totalXp) => {
  return Math.floor(totalXp / 100) + 1;
};

export const arcadeGames = [
  {
    id: "game_memory_1",
    title: "Memoria Tecnológica",
    type: "memory",
    description: "Encuentra los pares entre los conceptos y sus definiciones. Entrena tu mente.",
    xpReward: 100,
    requiredLessonId: "l1_1", 
    requiredLessonName: "1.1 Introducción al concepto de Tecnologías Emergentes",
    data: [
      { id: 1, text: "Internet de las Cosas (IoT)", matchId: 101 },
      { id: 101, text: "Objetos físicos con sensores conectados a internet.", matchId: 1 },
      { id: 2, text: "Blockchain", matchId: 102 },
      { id: 102, text: "Libro de contabilidad descentralizado e inmutable.", matchId: 2 },
      { id: 3, text: "Inteligencia Artificial (IA)", matchId: 103 },
      { id: 103, text: "Sistemas que emulan inteligencia humana.", matchId: 3 },
      { id: 4, text: "Machine Learning", matchId: 104 },
      { id: 104, text: "Sistemas que aprenden a partir de los datos.", matchId: 4 }
    ]
  }
];