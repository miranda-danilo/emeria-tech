// Estructura completa de datos para las Misiones (Sílabo)
// Basado en: "Fundamentos de Tecnologías de la Información / Tecnologías Emergentes"
// Estructura exigida: Definición, Características, Ejemplos y 5 preguntas por test.

export const silabo = [
  // =======================================================================
  // UNIDAD 1
  // =======================================================================
  {
    id: "unit_1",
    title: "UT 1: Introducción general a las Tecnologías Emergentes y a la IA",
    description: "Comprende las bases de las tecnologías disruptivas y la Inteligencia Artificial.",
    totalXp: 400,
    sessions: [
      {
        id: "u1_s2",
        name: "Sesión 2: Conceptos Base",
        lessons: [
          { 
            id: "l1_1", 
            title: "1.1 Introducción al concepto de Tecnologías Emergentes", 
            type: "theory", 
            xpReward: 50,
            isUnlocked: true,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Las tecnologías emergentes son innovaciones tecnológicas en desarrollo o en fase de adopción temprana. Poseen el potencial de transformar radicalmente las industrias, la economía y la sociedad." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Novedad Radical: Introducen capacidades inéditas.",
                "Crecimiento Rápido: Evolución acelerada que vuelve obsoleto lo anterior.",
                "Incertidumbre: Sus aplicaciones finales y límites aún están en descubrimiento."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Ejemplos clásicos incluyen la Impresión 3D aplicada a la creación de prótesis médicas, o la Computación Cuántica usada para resolver algoritmos complejos en segundos que a computadoras normales les tomaría años." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=Ftp5X3pq3KI" }
            ],
            quiz: [
              { question: "¿Qué define a una tecnología emergente?", options: ["Un invento de hace 50 años", "Una innovación en desarrollo con potencial de transformar industrias", "Una técnica manual", "Un software desactualizado"], correctAnswer: 1 },
              { question: "¿Cuál es una característica clave de las tecnologías emergentes?", options: ["Crecimiento estático", "Uso exclusivo en hogares", "Incertidumbre sobre sus aplicaciones finales", "Son siempre gratuitas"], correctAnswer: 2 },
              { question: "¿Qué característica se refiere a la 'Novedad Radical'?", options: ["Es una copia de otra tecnología", "Introduce capacidades que antes no existían", "Solo funciona en internet", "Tarda mucho en aprenderse"], correctAnswer: 1 },
              { question: "Un ejemplo de uso de la Impresión 3D como tecnología emergente es:", options: ["Imprimir documentos de Word", "Creación de prótesis médicas", "Enviar correos", "Jugar videojuegos"], correctAnswer: 1 },
              { question: "¿Por qué el crecimiento de estas tecnologías se considera 'Rápido'?", options: ["Porque pesan poco en megabytes", "Porque su evolución acelera rápidamente dejando lo anterior obsoleto", "Porque viajan a la velocidad de la luz", "Porque se instalan rápido"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l1_2", 
            title: "1.2 Introducción general a la Inteligencia Artificial (IA)", 
            type: "theory", 
            xpReward: 50,
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "La IA es un campo de la informática dedicado a crear sistemas capaces de realizar tareas que requieren inteligencia humana, como reconocimiento de voz, razonamiento y aprendizaje." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Aprendizaje Automático: Mejoran mediante exposición a datos.",
                "Procesamiento de Lenguaje Natural: Entienden comunicación humana.",
                "Autonomía: Toman decisiones sin intervención constante."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Siri o Alexa usando lenguaje natural, algoritmos de Netflix recomendando películas, y programas médicos detectando tumores en radiografías con más precisión que el ojo humano." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=8lMIdrlIWOQ" }
            ],
            quiz: [
              { question: "¿Cuál es el objetivo principal de la IA?", options: ["Reemplazar monitores", "Realizar tareas que requieren inteligencia humana", "Crear páginas web", "Imprimir en 3D"], correctAnswer: 1 },
              { question: "¿Qué característica permite a la IA mejorar con el tiempo?", options: ["Autonomía", "Aprendizaje Automático", "Energía solar", "El teclado"], correctAnswer: 1 },
              { question: "El Procesamiento de Lenguaje Natural (NLP) permite a la IA:", options: ["Hablar con animales", "Entender y procesar la comunicación humana", "Traducir código binario", "Aumentar la memoria RAM"], correctAnswer: 1 },
              { question: "¿Cuál es un caso de uso de IA en la medicina?", options: ["Llenar encuestas", "Detección de tumores en radiografías", "Limpiar hospitales", "Vender medicinas"], correctAnswer: 1 },
              { question: "La capacidad de un sistema IA para tomar decisiones por sí solo se llama:", options: ["Autonomía", "Dependencia", "Sincronización", "Renderizado"], correctAnswer: 0 }
            ]
          }
        ]
      },
      {
        id: "u1_s3",
        name: "Sesión 3: Intersección y Proyecto en Aula",
        lessons: [
          { 
            id: "l1_3", 
            title: "1.3 La intersección entre Tecnologías Emergentes e IA", 
            type: "theory", 
            xpReward: 50,
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Es el punto de convergencia donde la IA actúa como el procesador central (cerebro) que potencia y dirige las capacidades de otras tecnologías emergentes." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Sinergia: El resultado conjunto es mayor que las partes por separado.",
                "Automatización Avanzada: Procesos físicos que se controlan solos en tiempo real.",
                "Toma de decisiones descentralizada."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "La combinación de IA + Internet de las Cosas (AIoT). Ejemplo: Termostatos inteligentes que aprenden a qué hora llegas a casa para ajustar la temperatura y ahorrar energía." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=qsE2Yc4HkEQ" }
            ],
            quiz: [
              { question: "¿Qué se entiende por la intersección de tecnologías?", options: ["Cuando dos cables se cruzan", "El punto donde la IA potencia otras tecnologías", "Un programa que falla", "Un firewall"], correctAnswer: 1 },
              { question: "En la combinación AIoT (IA + IoT), ¿qué función cumple la IA?", options: ["Es el hardware físico", "Actúa como el 'cerebro' que procesa", "Es la pantalla del dispositivo", "No hace nada"], correctAnswer: 1 },
              { question: "¿Qué significa 'Sinergia' tecnológica?", options: ["Que consumen más energía", "Que el resultado conjunto es mayor que las partes separadas", "Que son independientes", "Que se anulan mutuamente"], correctAnswer: 1 },
              { question: "Un ejemplo claro de AIoT en el hogar es:", options: ["Una silla de madera", "Un termostato inteligente que aprende tus rutinas", "Un televisor de tubo", "Un ventilador manual"], correctAnswer: 1 },
              { question: "Esta intersección permite lograr una:", options: ["Desautomatización", "Automatización Avanzada", "Caída de red", "Pérdida de datos"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l1_4", 
            title: "1.4 Impacto, desafíos y futuro", 
            type: "theory", 
            xpReward: 50,
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Se refiere a las consecuencias sociales, éticas y laborales que trae la adopción masiva de la Inteligencia Artificial y tecnologías disruptivas." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Desplazamiento Laboral: Reemplazo de tareas repetitivas.",
                "Sesgos Algorítmicos: Adopción de prejuicios humanos en las decisiones de la IA.",
                "Problema de Caja Negra: Incapacidad de rastrear el razonamiento de una IA."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Casos como algoritmos de contratación de empresas que penalizaban currículums de mujeres debido a un sesgo histórico en los datos con los que fueron entrenados." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=qsE2Yc4HkEQ" }
            ],
            quiz: [
              { question: "¿Cuál es un impacto directo de la IA en el mercado laboral?", options: ["Aumenta el trabajo manual", "Desplazamiento de tareas repetitivas", "Todos ganan más dinero", "Prohíbe usar computadoras"], correctAnswer: 1 },
              { question: "¿A qué se llama 'Sesgo Algorítmico'?", options: ["Cuando la IA funciona muy rápido", "La adopción de prejuicios humanos en las decisiones de la IA", "Un virus informático", "Cuando la IA se apaga sola"], correctAnswer: 1 },
              { question: "¿Qué es el problema de la 'Caja Negra'?", options: ["Falta de luz en el servidor", "La incapacidad de rastrear el razonamiento de una IA", "Un disco duro quemado", "Falta de conexión"], correctAnswer: 1 },
              { question: "¿Cuál es un ejemplo de sesgo en recursos humanos?", options: ["Contratar al azar", "Algoritmos penalizando ciertos currículums por datos históricos", "Pagar mediante IA", "Entrevistar por zoom"], correctAnswer: 1 },
              { question: "A pesar de los desafíos, la IA promete un futuro de:", options: ["Mayor ineficiencia", "Innovación y automatización avanzada", "Regreso a tecnologías análogas", "Lentitud de procesos"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l1_5", 
            title: "1.5 Estrategia para la elaboración del tema", 
            type: "practice", 
            xpReward: 60,
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Es el proceso metodológico de identificar una necesidad o problemática real en el entorno para plantear una solución basada en tecnología." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Especificidad: El tema debe estar delimitado y no ser demasiado general.",
                "Viabilidad: Debe ser posible realizarlo con los recursos actuales.",
                "Innovación: Aportar un enfoque fresco usando tecnología."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "En lugar de 'Usar IA en la agricultura', un tema correcto sería 'Sistema IoT e IA para optimización de riego en cultivos de maíz en Manabí'." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=qM2vjQ5t16A" }
            ],
            quiz: [
              { question: "¿Cuál es el primer paso para plantear un tema de proyecto?", options: ["Comprar servidores", "Identificar una problemática real", "Crear la portada", "Hacer diapositivas"], correctAnswer: 1 },
              { question: "Un tema de proyecto debe ser:", options: ["Extremadamente general", "Específico y delimitado", "Imposible de realizar", "Ambiguo"], correctAnswer: 1 },
              { question: "¿Qué significa que el proyecto sea 'Viable'?", options: ["Que es barato", "Que es posible realizarlo con los recursos actuales", "Que viaja por internet", "Que usa mucha memoria"], correctAnswer: 1 },
              { question: "¿Por qué 'Usar IA en la agricultura' es un mal tema?", options: ["Porque es aburrido", "Porque es demasiado general y no delimitado", "Porque la IA no sirve en el campo", "Porque es muy corto"], correctAnswer: 1 },
              { question: "La innovación en el tema se refiere a:", options: ["Copiar proyectos de internet", "Aportar un enfoque fresco usando tecnología para resolver el problema", "No usar computadoras", "Hacerlo en otro idioma"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l1_6", 
            title: "1.6 Estrategia para hacer la introducción", 
            type: "practice", 
            xpReward: 60,
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "La introducción es la carta de presentación de una investigación. Contextualiza al lector sobre el problema, el propósito y la estructura del documento." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Contextualización: Describe el escenario del problema.",
                "Propósito: Responde al 'qué' y 'por qué' del estudio.",
                "Estructura: Anticipa brevemente cómo se dividirá el trabajo."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Empezar describiendo datos globales sobre el desperdicio de agua, para luego aterrizar en la necesidad del proyecto de riego inteligente propuesto." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=Hntg2VqWj0I" }
            ],
            quiz: [
              { question: "¿Qué propósito principal cumple la introducción?", options: ["Agradecer a los profesores", "Contextualizar al lector sobre el problema y propósito", "Mostrar la bibliografía", "Poner el índice"], correctAnswer: 1 },
              { question: "¿Qué preguntas clave debe responder una buena introducción?", options: ["¿Cuándo y dónde nací?", "¿Qué se va a hacer y por qué?", "¿Cuánto cuesta?", "¿Quién tiene la culpa?"], correctAnswer: 1 },
              { question: "La contextualización en la introducción sirve para:", options: ["Describir el escenario del problema", "Hacer relleno de texto", "Poner imágenes", "Cerrar el proyecto"], correctAnswer: 0 },
              { question: "¿Se debe detallar el presupuesto completo en la introducción?", options: ["Sí, es obligatorio", "No, eso va en capítulos posteriores", "Solo si es en dólares", "Depende del profesor"], correctAnswer: 1 },
              { question: "Indicar cómo se dividirá el trabajo en la introducción corresponde a:", options: ["Contextualización", "La Estructura", "La Dedicatoria", "Los Anexos"], correctAnswer: 1 }
            ]
          }
        ]
      }
    ]
  },

  // =======================================================================
  // UNIDAD 2
  // =======================================================================
  {
    id: "unit_2",
    title: "UT 2: Gestión de Conocimientos y Avances",
    description: "Metodologías de investigación y gestión de la información empresarial.",
    totalXp: 500,
    sessions: [
      {
        id: "u2_s4",
        name: "Sesión 4: Fundamentos y Formulación",
        lessons: [
          { 
            id: "l2_1", 
            title: "2.1 Fundamentos de la gestión del conocimiento", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Es el proceso de capturar, distribuir y utilizar eficazmente el conocimiento dentro de una organización para generar ventaja competitiva." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Conocimiento Explícito: Fácil de documentar (manuales, bases de datos).",
                "Conocimiento Tácito: Difícil de transferir, basado en la experiencia e intuición personal."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "La creación de una 'Wiki' interna en una empresa donde los empleados veteranos redactan manuales (volviendo explícito su conocimiento tácito) para los empleados nuevos." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=kYJmI9I2d0k" }
            ],
            quiz: [
              { question: "¿Cuál es el objetivo de la Gestión del Conocimiento?", options: ["Perder información", "Capturar y utilizar eficazmente el conocimiento de una organización", "Ocultar manuales", "Imprimir más papel"], correctAnswer: 1 },
              { question: "¿Qué es el Conocimiento Explícito?", options: ["Aquel basado en la experiencia personal", "El que es fácil de documentar como en bases de datos y manuales", "El que no se puede escribir", "El que se olvida rápido"], correctAnswer: 1 },
              { question: "¿Qué es el Conocimiento Tácito?", options: ["Bases de datos en SQL", "Manuales PDF", "Conocimiento arraigado en la experiencia e intuición personal", "Libros físicos"], correctAnswer: 2 },
              { question: "¿Por qué el conocimiento tácito es un desafío para las empresas?", options: ["Porque ocupa mucho disco duro", "Porque es difícil de transferir si el empleado se va", "Porque es muy barato", "Porque se borra con antivirus"], correctAnswer: 1 },
              { question: "Una 'Wiki' corporativa es un ejemplo de:", options: ["Transformar conocimiento tácito en explícito", "Juego de rol", "Red social externa", "Pérdida de tiempo"], correctAnswer: 0 }
            ]
          },
          { 
            id: "l2_2", 
            title: "2.2 Avances tecnológicos en la gestión", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Aplicación de herramientas tecnológicas modernas para almacenar, proteger y distribuir el capital intelectual de una empresa." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Cloud Computing: Acceso remoto y global a la información.",
                "Sistemas de Búsqueda Inteligente: IA para recuperar documentos al instante."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Usar Google Workspace o Microsoft 365 en la nube para colaboración en tiempo real, reemplazando a los servidores físicos locales propensos a daños." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=qsE2Yc4HkEQ" }
            ],
            quiz: [
              { question: "¿Qué avance tecnológico revolucionó el acceso remoto a la información?", options: ["El disquete", "Cloud Computing (Computación en la nube)", "La máquina de escribir", "El telégrafo"], correctAnswer: 1 },
              { question: "¿Cómo ayuda la IA en la gestión de documentos?", options: ["Borra los archivos antiguos", "Permite la búsqueda inteligente y recuperación instantánea", "Añade virus", "Imprime automáticamente"], correctAnswer: 1 },
              { question: "Una ventaja del Cloud Computing es:", options: ["Colaboración en tiempo real desde cualquier lugar", "Depender de discos físicos", "Es más lento", "Solo funciona de día"], correctAnswer: 0 },
              { question: "¿Qué reemplazó principalmente el almacenamiento en la nube?", options: ["Al teclado", "A los servidores físicos locales propensos a daños", "A las pantallas", "Al internet"], correctAnswer: 1 },
              { question: "Google Workspace y Microsoft 365 son ejemplos de:", options: ["Software malicioso", "Sistemas de gestión de bases de datos análogos", "Herramientas de colaboración en la nube", "Juegos de video"], correctAnswer: 2 }
            ]
          },
          { 
            id: "l2_3", 
            title: "2.3 Estrategias para formulación del problema", 
            type: "practice", 
            xpReward: 60, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Es la estructuración formal de la idea de investigación. Generalmente se sintetiza en una pregunta concisa que guía todo el proyecto." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Claridad: Sin ambigüedades.",
                "Relación de Variables: Debe involucrar causa y efecto (o problema y solución técnica)."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Ejemplo: ¿De qué manera la implementación de un sistema predictivo de IA reducirá los tiempos de espera en el hospital regional de Jipijapa?" },
              { type: "youtube", url: "https://www.youtube.com/watch?v=qM2vjQ5t16A" }
            ],
            quiz: [
              { question: "¿Cómo se suele estructurar la formulación del problema?", options: ["Como un poema", "Como una pregunta de investigación concisa", "Como una lista de compras", "Como un código de programación"], correctAnswer: 1 },
              { question: "Una buena pregunta de investigación debe tener:", options: ["Claridad y relación de variables", "Muchas palabras complejas", "Respuestas de Sí o No", "Metáforas"], correctAnswer: 0 },
              { question: "En la formulación, 'relacionar variables' significa:", options: ["Escribir código JavaScript", "Involucrar causa y efecto o problema y solución técnica", "Sumar números", "Cambiar el tipo de letra"], correctAnswer: 1 },
              { question: "¿Cuál de estas es una buena formulación de problema?", options: ["¿Cómo hacer IA?", "¿De qué manera la IA reducirá tiempos de espera en el hospital X?", "La IA es buena", "¿Cuándo se inventó la IA?"], correctAnswer: 1 },
              { question: "Formular correctamente el problema equivale a:", options: ["Terminar la tesis", "Estructurar formalmente la dirección de todo el proyecto", "Reprobar el semestre", "Pagar el semestre"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "u2_s5",
        name: "Sesión 5: Aplicaciones y Objetivos",
        lessons: [
          { 
            id: "l2_4", 
            title: "2.4 Aplicaciones tecnológicas en la gestión", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Se refiere al software y plataformas específicas (CRM, ERP, Chatbots) que automatizan la gestión del conocimiento." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Centralización: Un único lugar para toda la información.",
                "Integración: Conectan diferentes departamentos (Ventas, RRHH)."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Sistemas CRM (Customer Relationship Management) donde cualquier vendedor de la empresa puede ver el historial completo del cliente." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=8lMIdrlIWOQ" }
            ],
            quiz: [
              { question: "¿Qué hace un sistema CRM?", options: ["Repara computadoras", "Gestiona la relación y conocimiento de los clientes", "Imprime recibos", "Crea virus"], correctAnswer: 1 },
              { question: "La característica de 'Centralización' indica que:", options: ["La información está en múltiples libretas", "La información se concentra en un solo lugar accesible", "La información es secreta", "Solo el jefe la conoce"], correctAnswer: 1 },
              { question: "¿Por qué los chatbots son útiles en la gestión de conocimiento?", options: ["Sirven café", "Resuelven dudas frecuentes accediendo a la base de datos automáticamente", "Se quejan del trabajo", "Son adornos web"], correctAnswer: 1 },
              { question: "¿Qué permite la 'Integración' en estas aplicaciones?", options: ["Conectar diferentes departamentos de la empresa", "Desconectar el internet", "Borrar información vieja", "Trabajar sin energía"], correctAnswer: 0 },
              { question: "Un ERP (Planificación de Recursos Empresariales) sirve para:", options: ["Jugar en línea", "Administrar e integrar los procesos clave del negocio", "Hacer presentaciones", "Descargar música"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l2_5", 
            title: "2.5 Cultura y adopción tecnológica", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "El estudio de cómo los valores, hábitos y la mentalidad de los empleados afectan la implementación exitosa de nuevas tecnologías." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Resistencia al Cambio: Miedo a lo desconocido o pérdida de control.",
                "Liderazgo Digital: Fomento desde la gerencia para usar herramientas modernas."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Empresas que gastan millones en software de punta, pero fracasan porque no capacitaron a sus empleados o estos se niegan a abandonar el uso de papel." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=qsE2Yc4HkEQ" }
            ],
            quiz: [
              { question: "¿Qué factor humano puede hacer fracasar un proyecto tecnológico?", options: ["La velocidad del CPU", "La resistencia al cambio de los empleados", "El color del software", "El tamaño del monitor"], correctAnswer: 1 },
              { question: "¿A qué se debe la 'resistencia al cambio'?", options: ["Al exceso de sueldo", "Al miedo a lo desconocido o pérdida de control en el trabajo", "A que el software es gratuito", "A la falta de papel"], correctAnswer: 1 },
              { question: "El Liderazgo Digital busca:", options: ["Prohibir la tecnología", "Fomentar y guiar la adopción de herramientas modernas", "Despedir a todos", "Volver a la máquina de escribir"], correctAnswer: 1 },
              { question: "¿De qué sirve el mejor software si no hay capacitación?", options: ["De mucho, el software hace todo", "De poco, el personal no sabrá o no querrá usarlo", "Es indistinto", "Genera más dinero automáticamente"], correctAnswer: 1 },
              { question: "La adopción tecnológica es un tema de:", options: ["Solo hardware", "Solo licencias de software", "Cultura organizacional y mentalidad", "Cables y redes"], correctAnswer: 2 }
            ]
          },
          { 
            id: "l2_6", 
            title: "2.6 Objetivos generales y específicos", 
            type: "practice", 
            xpReward: 60, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Son las metas del proyecto. El general es la meta principal y abarcadora, los específicos son los pasos secuenciales para lograrla." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Verbos en Infinitivo: Siempre inician con terminación ar, er, ir (Desarrollar, Evaluar).",
                "Medibles: Deben poder comprobarse al final del proyecto."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "O. General: Desarrollar una app móvil... O. Específicos: 1) Analizar requerimientos, 2) Diseñar interfaz, 3) Programar código." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=Hntg2VqWj0I" }
            ],
            quiz: [
              { question: "¿Cuál es la diferencia entre objetivo general y específico?", options: ["Ninguna, son iguales", "El general es la meta final, los específicos son los pasos para lograrla", "El general es opcional", "Los específicos son los materiales a usar"], correctAnswer: 1 },
              { question: "¿Cómo deben iniciar siempre los objetivos?", options: ["Con un sustantivo", "Con una pregunta", "Con un verbo en infinitivo (ar, er, ir)", "Con el nombre del autor"], correctAnswer: 2 },
              { question: "¿Cuál de estos es un verbo en infinitivo válido para un objetivo?", options: ["Analizando", "Analizar", "Analicé", "Análisis"], correctAnswer: 1 },
              { question: "¿Qué característica asegura que sepamos si el proyecto fue un éxito?", options: ["Que los objetivos sean medibles", "Que sean muy largos", "Que estén en inglés", "Que no se puedan cumplir"], correctAnswer: 0 },
              { question: "Si el proyecto es crear una App, 'Diseñar la base de datos' sería un objetivo:", options: ["General", "Específico", "Imposible", "Subjetivo"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "u2_s6",
        name: "Sesión 6: Ética y Justificación",
        lessons: [
          { 
            id: "l2_7", 
            title: "2.7 Aspectos éticos y legales", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Conjunto de normas y leyes (como el uso de datos personales) que regulan el desarrollo e implementación tecnológica." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Privacidad: Consentimiento del usuario para manejar su información.",
                "Transparencia: Explicar qué hacen los algoritmos con los datos."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Leyes como GDPR en Europa que castigan con multas millonarias a empresas que venden datos de clientes sin su consentimiento explícito." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=qsE2Yc4HkEQ" }
            ],
            quiz: [
              { question: "¿Por qué es importante la ética en la recolección de datos?", options: ["Para llenar el servidor", "Para respetar la privacidad y cumplir las leyes de protección de datos", "Para venderlos más caro", "No es importante"], correctAnswer: 1 },
              { question: "¿Qué significa 'Transparencia' en este contexto?", options: ["Usar monitores de cristal", "Explicar al usuario qué se hace con sus datos", "Tener código invisible", "No usar contraseñas"], correctAnswer: 1 },
              { question: "¿Qué es la GDPR?", options: ["Un videojuego", "Una ley de protección de datos europea", "Un lenguaje de programación", "Un componente de hardware"], correctAnswer: 1 },
              { question: "Vender datos de usuarios sin su permiso es:", options: ["Una buena práctica de negocios", "Una violación ética y legal severa", "Algo que hacen todos", "Un avance tecnológico"], correctAnswer: 1 },
              { question: "Para manejar datos, se requiere principalmente del usuario:", options: ["Su dinero", "Su consentimiento explícito", "Su computadora", "Su contraseña de correo"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l2_8", 
            title: "2.8 Estrategias para hacer la justificación", 
            type: "practice", 
            xpReward: 60, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Es la sección del proyecto que defiende su necesidad, respondiendo a las preguntas ¿Por qué es necesario hacerlo? y ¿Para qué servirá?" },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Relevancia Social: ¿A quién beneficia?",
                "Relevancia Tecnológica: ¿Qué aporta de nuevo en el campo de la TI?"
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Justificar un proyecto de telemedicina indicando que resolverá la falta de especialistas en zonas rurales, salvando vidas (impacto social)." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=qM2vjQ5t16A" }
            ],
            quiz: [
              { question: "¿Qué preguntas responde la Justificación?", options: ["¿Cómo y cuándo?", "¿Por qué y Para qué?", "¿Quién y cuánto cuesta?", "¿Dónde y con qué computadora?"], correctAnswer: 1 },
              { question: "Definir a quién beneficia el proyecto establece su:", options: ["Relevancia Social", "Presupuesto", "Conclusión", "Anexo"], correctAnswer: 0 },
              { question: "Definir qué aporta de nuevo a la Informática establece su:", options: ["Relevancia Tecnológica", "Relevancia Médica", "Introducción", "Índice"], correctAnswer: 0 },
              { question: "La justificación sirve para:", options: ["Rellenar hojas", "Convencer de la necesidad e importancia del proyecto", "Listar los equipos a comprar", "Poner la bibliografía"], correctAnswer: 1 },
              { question: "Si un proyecto no tiene una buena justificación:", options: ["Es más fácil de programar", "Puede ser rechazado por falta de impacto o utilidad clara", "Saca mejor nota", "Se vuelve IA"], correctAnswer: 1 }
            ]
          }
        ]
      }
    ]
  },

  // =======================================================================
  // UNIDAD 3
  // =======================================================================
  {
    id: "unit_3",
    title: "UT 3: Sistemas basados en el Conocimiento (IoT y Blockchain)",
    description: "Aplicación práctica de IoT, IA Generativa, Cloud Computing y Blockchain.",
    totalXp: 450,
    sessions: [
      {
        id: "u3_s7",
        name: "Sesión 7: IoT e IA Generativa",
        lessons: [
          { 
            id: "l3_1", 
            title: "3.1 Integración con el Internet de las Cosas (IoT)", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "El IoT es la red de objetos físicos que llevan sensores, software y otras tecnologías integradas para conectarse e intercambiar datos por internet." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Sensores: Recopilan variables del mundo real (temperatura, luz, movimiento).",
                "Conectividad: Usan Wi-Fi, 5G o Bluetooth para enviar datos."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Agricultura de precisión: Sensores de humedad en la tierra que activan el riego automático solo cuando es necesario." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=LlhmzVL5bm8" }
            ],
            quiz: [
              { question: "¿Qué significan las siglas IoT?", options: ["Internet of Technology", "Internet of Things (Internet de las Cosas)", "Internal Output Transfer", "Intelligent Option Tool"], correctAnswer: 1 },
              { question: "¿Cuál es el componente clave para que un objeto físico sea IoT?", options: ["Una pantalla grande", "Sensores y conexión a internet", "Ser de metal", "Tener batería infinita"], correctAnswer: 1 },
              { question: "¿Qué hace un sensor IoT?", options: ["Crea páginas web", "Recopila variables físicas del mundo real (ej. temperatura)", "Elimina virus", "Imprime en 3D"], correctAnswer: 1 },
              { question: "Un ejemplo claro de IoT es:", options: ["Un libro de papel", "Sensores de humedad conectados para riego automático", "Una máquina de escribir", "Una guitarra acústica"], correctAnswer: 1 },
              { question: "La conectividad en IoT se logra habitualmente mediante:", options: ["Cables VGA", "Wi-Fi, 5G, Bluetooth", "Cuerdas", "Señales de humo"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l3_2", 
            title: "3.2 Aplicación en Inteligencia Artificial Generativa", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "La IA Generativa usa redes neuronales profundas para crear contenido nuevo (texto, imágenes, audio o código) a partir de descripciones (prompts)." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Creación de contenido sintético.",
                "Basada en LLMs (Modelos de Lenguaje Grande)."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "ChatGPT para redactar ensayos y código, Midjourney o DALL-E para generar arte digital desde texto." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=8lMIdrlIWOQ" }
            ],
            quiz: [
              { question: "¿Qué diferencia a la IA Generativa de otras IAs?", options: ["Que es más lenta", "Que crea contenido nuevo y sintético (texto, imágenes)", "Que no usa internet", "Que solo funciona en celulares"], correctAnswer: 1 },
              { question: "¿Cómo se llama la instrucción de texto que se le da a una IA Generativa?", options: ["Código fuente", "Prompt", "Script", "Macro"], correctAnswer: 1 },
              { question: "ChatGPT es un ejemplo de IA generativa basada en:", options: ["Imágenes", "Modelos de Lenguaje Grande (LLMs)", "Cálculo matemático 3D", "Robótica física"], correctAnswer: 1 },
              { question: "DALL-E y Midjourney se especializan en:", options: ["Generar imágenes y arte a partir de texto", "Hacer hojas de cálculo", "Limpiar malware", "Manejar vehículos"], correctAnswer: 0 },
              { question: "La IA Generativa puede programar código:", options: ["Falso, solo sabe escribir poemas", "Verdadero, puede generar scripts y código funcional", "Solo si es en HTML básico", "Falso, es ilegal"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "u3_s8",
        name: "Sesión 8: Cloud, Edge y Blockchain",
        lessons: [
          { 
            id: "l3_3", 
            title: "3.3 Cloud y Edge Computing", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Cloud procesa los datos en servidores centrales lejanos. Edge Computing procesa los datos de forma local, en el mismo dispositivo o muy cerca de él." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Cloud: Alta capacidad de procesamiento, pero requiere envío de datos por internet.",
                "Edge: Procesamiento inmediato, baja latencia (sin esperar al servidor)."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "En un vehículo autónomo, decisiones críticas como frenar se procesan en el Edge (computadora del carro) para no depender de la latencia del internet (Cloud)." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=qsE2Yc4HkEQ" }
            ],
            quiz: [
              { question: "¿Dónde se procesan los datos en el Cloud Computing?", options: ["En el celular del usuario", "En servidores centrales remotos", "En un pendrive", "En la memoria RAM local"], correctAnswer: 1 },
              { question: "¿Dónde se procesan los datos en el Edge Computing?", options: ["En la nube", "Localmente, muy cerca o dentro del dispositivo generador del dato", "En servidores de Google únicamente", "En papel"], correctAnswer: 1 },
              { question: "¿Cuál es la principal ventaja del Edge Computing?", options: ["Tiene capacidad infinita", "Baja latencia (procesamiento casi instantáneo)", "Es 100% en línea", "Reemplaza al monitor"], correctAnswer: 1 },
              { question: "Para el frenado de emergencia de un carro autónomo, es mejor usar:", options: ["Cloud Computing", "Edge Computing", "Correo electrónico", "No usar computadora"], correctAnswer: 1 },
              { question: "Cloud Computing destaca por su:", options: ["Velocidad sin internet", "Alta capacidad de procesamiento masivo y almacenamiento", "Procesamiento local", "Incapacidad de conexión"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l3_4", 
            title: "3.4 Blockchain para verificación de datos", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Es un libro de contabilidad digital descentralizado donde la información se guarda en 'bloques' enlazados criptográficamente, haciéndola imposible de alterar." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Descentralización: No depende de un servidor central.",
                "Inmutabilidad: Lo registrado no se puede borrar o editar en secreto."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Más allá de criptomonedas, se usa para Trazabilidad: rastrear si un medicamento es auténtico desde la fábrica hasta la farmacia, evitando falsificaciones." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=LlhmzVL5bm8" }
            ],
            quiz: [
              { question: "¿Qué es esencialmente el Blockchain?", options: ["Un editor de video", "Un libro de registros digital, descentralizado y seguro", "Un servidor central", "Una red social"], correctAnswer: 1 },
              { question: "La 'Inmutabilidad' en Blockchain significa que:", options: ["Los datos son transparentes", "Lo registrado no se puede alterar ni borrar en secreto", "La red se cae", "Los bloques son de hielo"], correctAnswer: 1 },
              { question: "¿Por qué el Blockchain es descentralizado?", options: ["Porque no depende de un único servidor o autoridad central", "Porque no funciona bien", "Porque requiere un administrador supremo", "Porque usa cables"], correctAnswer: 0 },
              { question: "Aparte de criptomonedas, un uso corporativo de Blockchain es:", options: ["Jugar solitario", "Trazabilidad segura en cadenas de suministro", "Reproducir música", "Imprimir fotos"], correctAnswer: 1 },
              { question: "¿Cómo se aseguran los bloques en la cadena?", options: ["Con candados físicos", "Mediante enlaces criptográficos complejos", "Con contraseñas simples como '1234'", "Con firmas de tinta"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "u3_s9",
        name: "Sesión 9: Interfaces Inmersivas y Ética",
        lessons: [
          { 
            id: "l3_5", 
            title: "3.5 Interfaces Inmersivas (VR/AR)", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "La Realidad Virtual (VR) sumerge al usuario en un mundo 100% digital. La Realidad Aumentada (AR) superpone elementos digitales sobre el mundo real." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Inmersión: Sensación de presencia física en entornos generados.",
                "Interactividad: Manipulación de objetos 3D en tiempo real."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "AR para que mecánicos vean las instrucciones flotando sobre un motor mientras lo reparan. VR para simuladores de vuelo o cirugía." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=kYJmI9I2d0k" }
            ],
            quiz: [
              { question: "¿Cuál es la diferencia entre VR y AR?", options: ["Son lo mismo", "VR sumerge totalmente, AR superpone en el mundo real", "VR es aburrido, AR es divertido", "VR es para PC, AR no existe"], correctAnswer: 1 },
              { question: "Si ves hologramas flotando en tu sala a través de unos lentes, es:", options: ["Realidad Virtual (VR)", "Realidad Aumentada (AR)", "Televisión analógica", "Computación Cuántica"], correctAnswer: 1 },
              { question: "Un simulador de vuelo donde no ves nada del cuarto físico donde estás, utiliza:", options: ["Realidad Aumentada (AR)", "Realidad Virtual (VR)", "Blockchain", "Impresora 3D"], correctAnswer: 1 },
              { question: "La inmersión se refiere a:", options: ["Meterse en el agua", "La sensación de presencia física en un entorno digital", "La pantalla apagada", "Un tipo de cable"], correctAnswer: 1 },
              { question: "¿Cuál es un uso industrial de la AR?", options: ["Jugar videojuegos en la fábrica", "Ver manuales y guías flotando sobre la maquinaria a reparar", "Dormir en el trabajo", "Vender computadoras"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l3_6", 
            title: "3.6 Gobernanza en sistemas inteligentes", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Es el conjunto de reglas, auditorías y responsabilidades legales impuestas sobre los algoritmos para evitar decisiones perjudiciales o sesgadas." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Explicabilidad: Entender por qué la IA tomó una decisión.",
                "Responsabilidad legal: Quién paga los daños si la IA falla."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Si un vehículo autónomo operado por IA atropella a alguien, la gobernanza define si la culpa es del programador, la empresa o el dueño." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=qM2vjQ5t16A" }
            ],
            quiz: [
              { question: "¿Qué busca la gobernanza en la IA?", options: ["Hacerla más rápida", "Establecer reglas, responsabilidades y evitar daños éticos", "Darle derechos de ciudadano a las máquinas", "Reducir el tamaño del disco"], correctAnswer: 1 },
              { question: "La 'Explicabilidad' significa:", options: ["Poder entender y auditar el por qué la IA tomó esa decisión", "Que el código fuente sea público", "Que la máquina hable en voz alta", "Que no haya contraseñas"], correctAnswer: 0 },
              { question: "El dilema de si la culpa es del creador o del dueño ante un accidente de IA entra en:", options: ["Programación orientada a objetos", "Responsabilidad legal y Gobernanza", "Diseño gráfico", "Hardware"], correctAnswer: 1 },
              { question: "¿Por qué es riesgoso dejar IA sin gobernanza?", options: ["Porque consumen mucha electricidad", "Pueden tomar decisiones sesgadas o perjudiciales masivamente", "Se vuelven lentas", "Se borran solas"], correctAnswer: 1 },
              { question: "Una auditoría de algoritmo busca:", options: ["Cambiarle el nombre", "Verificar que sus decisiones sean justas y cumplan normas", "Vender el algoritmo", "Aumentar sus colores"], correctAnswer: 1 }
            ]
          }
        ]
      }
    ]
  },

  // =======================================================================
  // UNIDAD 4
  // =======================================================================
  {
    id: "unit_4",
    title: "UT 4: Aprendizaje Automático e Incertidumbre en IA",
    description: "Introducción profunda al Machine Learning y el manejo algorítmico.",
    totalXp: 400,
    sessions: [
      {
        id: "u4_s10",
        name: "Sesión 10: Machine Learning Core",
        lessons: [
          { 
            id: "l4_1", 
            title: "4.1 Introducción al Machine Learning", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "El Aprendizaje Automático (ML) es la rama de la IA que permite a los sistemas aprender patrones y mejorar su rendimiento con la experiencia sin ser programados paso a paso." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Basado en Datos: Cuantos más datos analiza, mejor se vuelve.",
                "Predicción: Identifica tendencias futuras basadas en el historial."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Sistemas de recomendación en Spotify o YouTube, que aprenden tus gustos musicales analizando tus clics pasados." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=KytW151dpqU" }
            ],
            quiz: [
              { question: "¿El Machine Learning requiere ser programado explícitamente regla por regla?", options: ["Sí, es obligatorio", "No, aprende patrones a partir de los datos", "A veces, solo los viernes", "Solo para cosas simples"], correctAnswer: 1 },
              { question: "¿Qué necesita primordialmente el ML para aprender y mejorar?", options: ["Teclados nuevos", "Gran cantidad de datos de entrenamiento", "Pantallas grandes", "Conexión bluetooth"], correctAnswer: 1 },
              { question: "Un algoritmo de ML prediciendo si te gustará una película usa:", options: ["Adivinación mágica", "Tendencias basadas en tu historial de datos", "Cámaras ocultas", "El clima actual"], correctAnswer: 1 },
              { question: "¿De qué rama general forma parte el Machine Learning?", options: ["Bases de Datos Relacionales", "Inteligencia Artificial", "Diseño Web", "Redes LAN"], correctAnswer: 1 },
              { question: "El rendimiento del Machine Learning suele mejorar con:", options: ["La experiencia (más exposición a datos)", "Estar apagado un tiempo", "Usar monitores 4K", "Tener menos memoria"], correctAnswer: 0 }
            ]
          },
          { 
            id: "l4_2", 
            title: "4.2 Categorías de algoritmos", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "El ML se divide según la forma en que los datos son presentados al algoritmo durante el entrenamiento." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Aprendizaje Supervisado: Entrenado con datos ya etiquetados (respuestas correctas provistas).",
                "Aprendizaje No Supervisado: Busca patrones en datos crudos, sin etiquetas.",
                "Aprendizaje por Refuerzo: El algoritmo aprende mediante ensayo y error, recibiendo 'premios' o 'castigos'."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Supervisado: Enseñar a la IA a detectar spam dándole 1000 correos que ya dicen 'Es Spam'. Refuerzo: Una IA aprendiendo a jugar ajedrez perdiendo partidas miles de veces." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=8lMIdrlIWOQ" }
            ],
            quiz: [
              { question: "El aprendizaje donde los datos de entrenamiento ya tienen las etiquetas correctas se llama:", options: ["No Supervisado", "Supervisado", "Por Refuerzo", "Aleatorio"], correctAnswer: 1 },
              { question: "El aprendizaje que busca patrones en datos desordenados y sin etiquetas es:", options: ["Supervisado", "Por Refuerzo", "No Supervisado", "Lineal"], correctAnswer: 2 },
              { question: "Si un algoritmo aprende mediante sistema de recompensas y castigos (ensayo y error), usa:", options: ["Aprendizaje Supervisado", "Aprendizaje No Supervisado", "Aprendizaje por Refuerzo", "Bases de datos estáticas"], correctAnswer: 2 },
              { question: "Darle a un algoritmo mil fotos etiquetadas como 'Gato' o 'Perro' es un ejemplo de aprendizaje:", options: ["No Supervisado", "Supervisado", "Por Refuerzo", "Caja Negra"], correctAnswer: 1 },
              { question: "La categoría del algoritmo se define por:", options: ["El lenguaje de programación", "La forma en que se presentan los datos en el entrenamiento", "La marca de la computadora", "El color de la interfaz"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "u4_s11",
        name: "Sesión 11: Aplicaciones e Incertidumbre",
        lessons: [
          { 
            id: "l4_3", 
            title: "4.3 Aplicaciones prácticas", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "El uso de modelos predictivos en el mundo real para resolver problemas complejos de forma automática." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Detección de Anomalías: Encontrar comportamientos inusuales.",
                "Clasificación: Asignar elementos a categorías."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Los bancos usan ML para detectar transacciones fraudulentas de tarjetas de crédito en milisegundos (detección de anomalías)." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=qsE2Yc4HkEQ" }
            ],
            quiz: [
              { question: "La detección de fraudes bancarios es una aplicación que usa principalmente:", options: ["Impresión 3D", "Detección de anomalías con Machine Learning", "Blockchain exclusivamente", "Realidad Virtual"], correctAnswer: 1 },
              { question: "Separar automáticamente correos en 'Spam' y 'Principal' es una tarea de:", options: ["Detección de anomalías", "Clasificación", "Por refuerzo", "Hardware"], correctAnswer: 1 },
              { question: "Una aplicación práctica del ML en el día a día NO incluye:", options: ["Reconocimiento facial del celular", "Sistemas de recomendación de Netflix", "Barrer la calle con una escoba", "Filtros de Instagram que siguen el rostro"], correctAnswer: 2 },
              { question: "¿Por qué el ML es útil en los bancos?", options: ["Porque imprime billetes", "Porque analiza millones de transacciones en milisegundos buscando fraudes", "Porque reemplaza a las bóvedas", "Porque atiende en ventanilla físicamente"], correctAnswer: 1 },
              { question: "La capacidad predictiva del ML se usa en:", options: ["Pasar VHS a DVD", "Identificar tendencias futuras como el clima o la bolsa de valores", "Pintar paredes", "Desarrollar teclados"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l4_4", 
            title: "4.4 Incertidumbre en Inteligencia Artificial", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "El mundo real no es determinista. La incertidumbre ocurre cuando un algoritmo debe tomar decisiones basándose en datos incompletos o ruidosos." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Probabilidad: La IA usa matemáticas para calcular el 'porcentaje de confianza' de su respuesta.",
                "Redes Bayesianas: Modelos gráficos que calculan probabilidades de causas y efectos."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Un médico usando IA para un diagnóstico. La IA no dirá 'Tiene gripe', sino 'Hay un 85% de probabilidad de gripe', manejando la incertidumbre de los síntomas." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=LlhmzVL5bm8" }
            ],
            quiz: [
              { question: "¿Qué causa la 'Incertidumbre' en un modelo de IA?", options: ["Datos incompletos, ruidosos o ambiguos", "Que la computadora es muy potente", "Una buena conexión a internet", "El exceso de memoria"], correctAnswer: 0 },
              { question: "¿Cómo maneja matemáticamente la IA esta incertidumbre?", options: ["Con sumas y restas simples", "Usando probabilidad y porcentaje de confianza", "Apagándose", "Ignorando el problema"], correctAnswer: 1 },
              { question: "¿Qué es una Red Bayesiana?", options: ["Una red social nueva", "Un modelo gráfico probabilístico para calcular causas y efectos", "Un tipo de cable de red", "Una marca de computadora"], correctAnswer: 1 },
              { question: "La IA frente al mundo real asume que este es:", options: ["Totalmente determinista y perfecto", "Ruidoso y con cierto nivel de incertidumbre", "Un holograma", "Binario puro"], correctAnswer: 1 },
              { question: "Ante la incertidumbre, la respuesta de una IA predictiva suele ser:", options: ["Un 'Sí' o 'No' absoluto", "Un porcentaje de probabilidad", "Un chiste", "Un cierre de sistema"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "u4_s12",
        name: "Sesión 12: Arquitectura y Proyecto",
        lessons: [
          { 
            id: "l4_5", 
            title: "4.5 Modularidad en Diseño de IA", 
            type: "theory", 
            xpReward: 40, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "La práctica de dividir un gran sistema de software en partes pequeñas e independientes (módulos), donde cada módulo hace una sola cosa." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Independencia: Si un módulo falla, el sistema completo no cae.",
                "Actualización Fácil: Puedes mejorar una parte sin tocar el resto."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "En un robot, tener un módulo de IA solo para 'ver' (visión artificial) y otro solo para 'caminar'. Si actualizas la cámara, no afecta a las piernas." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=kYJmI9I2d0k" }
            ],
            quiz: [
              { question: "¿Qué es la modularidad en diseño de sistemas?", options: ["Hacer el código en un solo archivo gigante", "Dividir el sistema en partes pequeñas e independientes", "Usar monitores modulares", "Eliminar el código fuente"], correctAnswer: 1 },
              { question: "Una ventaja principal de la modularidad es:", options: ["Hace que el sistema sea imposible de entender", "Permite actualizar un módulo sin afectar a los demás", "Que es más barato comprar hardware", "Consume toda la memoria RAM"], correctAnswer: 1 },
              { question: "Si un módulo falla en un sistema modular:", options: ["Todo el sistema se destruye", "Generalmente el sistema completo no colapsa totalmente", "Se borra la base de datos", "El teclado deja de funcionar"], correctAnswer: 1 },
              { question: "Tener el sistema de visión y el sistema motor de un robot separados es un ejemplo de:", options: ["Desorden", "Modularidad", "Gobernanza", "Blockchain"], correctAnswer: 1 },
              { question: "¿Qué principio busca que cada parte del código haga una sola cosa específica?", options: ["Monolithic Design", "Modularidad (Alta Cohesión)", "Spaghetti Code", "Redes LAN"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l4_6", 
            title: "4.6 Lógica Monótona y No Monótona", 
            type: "theory", 
            xpReward: 40, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "En lógica formal, un sistema monótono nunca invalida conclusiones pasadas al recibir datos nuevos. La IA moderna usa lógica no-monótona, adaptándose al cambiar de contexto." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Lógica Monótona: Hechos rígidos (Matemáticas puras).",
                "Lógica No-Monótona: Razonamiento flexible o por defecto (Sentido común)."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Regla inicial: 'Las aves vuelan'. El pingüino es ave, conclusión monótona: 'Vuela' (Error). Lógica No-Monótona: 'Las aves vuelan, a menos que sea un pingüino' (Se corrige con datos nuevos)." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=8lMIdrlIWOQ" }
            ],
            quiz: [
              { question: "En un sistema de lógica monótona, agregar nueva información:", options: ["Borra la memoria", "Nunca invalida las conclusiones pasadas", "Cambia las matemáticas", "Hace que la IA se enoje"], correctAnswer: 1 },
              { question: "El razonamiento de sentido común humano se parece más a:", options: ["Lógica Monótona", "Lógica No-Monótona (flexible a nuevos datos contrarios)", "Cálculo diferencial puro", "Lógica binaria estricta"], correctAnswer: 1 },
              { question: "Si una conclusión anterior se anula porque recibimos un dato nuevo que la contradice, usamos:", options: ["Lógica Monótona", "Lógica No-Monótona", "Un error de sistema", "Un bucle infinito"], correctAnswer: 1 },
              { question: "La matemática pura (2+2=4 independientemente del contexto) es el mejor ejemplo de:", options: ["Lógica Monótona", "Lógica No-Monótona", "Redes Neuronales", "Blockchain"], correctAnswer: 0 },
              { question: "Para que un sistema experto médico no cometa errores letales al descubrir nuevos síntomas, debe usar:", options: ["Lógica monótona estricta", "Lógica no-monótona para adaptar el diagnóstico", "Impresión 3D", "Un reloj inteligente"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l4_7", 
            title: "4.7 Presentación de proyecto en aula", 
            type: "practice", 
            xpReward: 120, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "La defensa y demostración de las habilidades investigativas y técnicas adquiridas durante el desarrollo del proyecto final." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Síntesis: Explicar 6 meses de trabajo en 15 minutos.",
                "Oratoria y Apoyo Visual: Diapositivas limpias, sin exceso de texto."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Presentar un prototipo de IoT mostrando la placa física y la base de datos en tiempo real, demostrando que el problema formulado fue resuelto." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=Hntg2VqWj0I" }
            ],
            quiz: [
              { question: "¿Cuál es el objetivo de la presentación final del proyecto?", options: ["Leer un documento de 100 páginas", "Defender y demostrar las habilidades técnicas y la solución al problema", "Hacer tiempo", "Solo mostrar fotos"], correctAnswer: 1 },
              { question: "Una regla de oro en las diapositivas de apoyo visual es:", options: ["Poner todo el texto del proyecto en ellas", "Usar letras muy pequeñas", "Sintetizar la información y evitar el exceso de texto", "No poner imágenes"], correctAnswer: 2 },
              { question: "La presentación final debe enfocarse principalmente en responder a:", options: ["¿Cómo se llama el equipo?", "¿Cómo se resolvió el problema inicialmente planteado?", "¿Cuánto costó la impresión?", "¿A qué hora termina la clase?"], correctAnswer: 1 },
              { question: "Si presentas un prototipo tecnológico, lo ideal es:", options: ["Solo hablar de él teóricamente", "Hacer una demostración técnica de que funciona", "Dejarlo en casa", "Mostrar un dibujo a mano"], correctAnswer: 1 },
              { question: "La habilidad clave durante la defensa verbal del proyecto es la:", options: ["Programación C++", "Síntesis y Oratoria", "Velocidad de tipeo", "Memoria visual absoluta"], correctAnswer: 1 }
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

// =======================================================================
// JUEGOS ARCADE EXTRA
// =======================================================================
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