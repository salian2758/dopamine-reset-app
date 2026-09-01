// Catálogo COMPLETO de intervenciones para todos los hábitos y todas las combinaciones
// Fase: deteccion (impulso) | cediendo | despues
// Compañía: solo | maria | familia | amigos
// Ubicación: casa | trabajo | calle | coche

export const INTERVENTIONS = {
  "Pornografía": {
    deteccion: {
      solo_casa: [
        { name: "Hielo en cara", desc: "Agua helada. Quiebra trance.", time: "<5 min", critical: true },
        { name: "Desactiva internet", desc: "WiFi OFF. Imposible acceder.", time: "1 min", critical: true },
        { name: "Abre Circuito", desc: "Dopamina real > fake.", time: "1 min", critical: true },
        { name: "Respiración 4-7-8", desc: "Vagal reset inmediato.", time: "2 min", critical: true },
        { name: "Paseo 5 minutos", desc: "Aire fresco. Salir del contexto.", time: "5 min", critical: false },
      ],
      solo_trabajo: [
        { name: "Agua fría en cara (baño)", desc: "Choque. Reset.", time: "<5 min", critical: true },
        { name: "Paseo fuera oficina", desc: "Cambio de escena.", time: "5 min", critical: false },
        { name: "Llamar a Javier", desc: "Voz real. Accountability.", time: "5 min", critical: true },
      ],
      solo_calle: [
        { name: "Respiración profunda", desc: "En público. Disimulado.", time: "2 min", critical: true },
        { name: "Abre Circuito", desc: "Dopamina real en bolsillo.", time: "1 min", critical: true },
        { name: "Entra a un lugar público", desc: "Café, tienda. Imposible actuar.", time: "5 min", critical: true },
      ],
      solo_coche: [
        { name: "Detén vehículo seguro", desc: "Estaciona. Respira.", time: "1 min", critical: true },
        { name: "Escucha música", desc: "Manos ocupadas.", time: "5 min", critical: false },
        { name: "Llamar a alguien", desc: "Voz. Conexión real.", time: "5 min", critical: true },
      ],
      maria_casa: [
        { name: "Abraza a María", desc: "Contacto físico real.", time: "inmediato", critical: true },
        { name: "Cuéntale", desc: "'Tengo impulso'. Transparencia.", time: "5 min", critical: true },
        { name: "Haz algo juntos", desc: "Interacción compartida.", time: "5 min", critical: false },
      ],
      familia_casa: [
        { name: "Ve con ellos", desc: "Compañía. Imposible estar solo.", time: "inmediato", critical: true },
        { name: "Propón actividad", desc: "Interacción familiar.", time: "5 min", critical: false },
      ],
      amigos_casa: [
        { name: "Invítalos a hacer algo", desc: "Estar con gente.", time: "5 min", critical: false },
      ],
      amigos_calle: [
        { name: "Propón actividad", desc: "Mantente con ellos.", time: "5 min", critical: false },
      ],
    },
    cediendo: {
      solo_casa: [
        { name: "Ducha fría EXTREMA", desc: "Shock vagal total.", time: "3-5 min", critical: true },
        { name: "Llama a Javier AHORA", desc: "NO SOLO. Pide ayuda.", time: "5 min", critical: true },
        { name: "Llamar a María", desc: "'Necesito ayuda'.", time: "5 min", critical: true },
      ],
      maria_casa: [
        { name: "Cuéntale YA", desc: "'Me estoy cediendo. Ayuda'.", time: "inmediato", critical: true },
      ],
    },
    despues: {
      solo_casa: [
        { name: "NO reinicies. Reconecta", desc: "Error ≠ día perdido.", time: "1 min", critical: true },
        { name: "Journaling rápido", desc: "¿Qué trigger fue? ¿Dónde falló?", time: "5 min", critical: false },
        { name: "Escucha música", desc: "Dopamina limpia.", time: "5 min", critical: false },
      ],
      maria_casa: [
        { name: "Abraza a María", desc: "Sin vergüenza. Apoyo.", time: "inmediato", critical: true },
      ],
    },
  },

  "Procrastinación": {
    deteccion: {
      solo_casa: [
        { name: "Una micro-tarea YA", desc: "2 minutos máximo. Momentum.", time: "2 min", critical: true },
        { name: "Abre Circuito", desc: "Dopamina genuina. START.", time: "1 min", critical: true },
        { name: "Pon timer 25 min", desc: "Pomodoro. Urgencia.", time: "1 min", critical: true },
        { name: "Cambiar de cuarto", desc: "Otro espacio. Reset.", time: "1 min", critical: false },
        { name: "Estiramiento", desc: "Sangre en movimiento.", time: "2 min", critical: false },
      ],
      solo_trabajo: [
        { name: "Empieza la tarea más fácil", desc: "Mínima fricción primero.", time: "1 min", critical: true },
        { name: "Dile a compañero: 'Voy a trabajar'", desc: "Accountability público.", time: "1 min", critical: false },
        { name: "Cierra Slack/Teams 30 min", desc: "Sin interrupciones.", time: "1 min", critical: true },
      ],
      solo_calle: [
        { name: "Entra a un café", desc: "Espacio de trabajo.", time: "5 min", critical: false },
        { name: "Llama a alguien", desc: "Accountability en voz.", time: "5 min", critical: false },
      ],
      solo_coche: [
        { name: "Estaciona. Haz micro-tarea", desc: "Avanza en el auto.", time: "5 min", critical: false },
      ],
      maria_casa: [
        { name: "Cuéntale qué vas a hacer", desc: "Responsabilidad compartida.", time: "1 min", critical: false },
        { name: "Haz tarea con ella cerca", desc: "Presencia. No responsabilidad.", time: "30 min", critical: false },
      ],
      familia_casa: [
        { name: "Anuncia qué harás", desc: "Compromiso familiar.", time: "1 min", critical: false },
      ],
      amigos_casa: [
        { name: "Propón sesión de co-working", desc: "Todos trabajan juntos.", time: "1 hora", critical: false },
      ],
    },
  },

  "Pantallas": {
    deteccion: {
      solo_casa: [
        { name: "Móvil FUERA del despacho", desc: "Otro cuarto. Imposible.", time: "1 min", critical: true },
        { name: "Cierra navegador", desc: "Borra tabs tentadores.", time: "1 min", critical: true },
        { name: "Abre Circuito", desc: "Alternativa real.", time: "1 min", critical: true },
        { name: "Pon timer", desc: "30 min máximo programado.", time: "1 min", critical: false },
      ],
      solo_trabajo: [
        { name: "Abre solo lo necesario", desc: "Una pestaña. Una app.", time: "1 min", critical: true },
        { name: "Cierra Slack/Teams", desc: "Sin notificaciones.", time: "1 min", critical: false },
        { name: "Móvil en cajón", desc: "Invisible. Inaccesible.", time: "30 seg", critical: true },
      ],
      solo_calle: [
        { name: "Guarda móvil", desc: "Bolsillo trasero o mochila.", time: "30 seg", critical: true },
        { name: "Entra a un lugar", desc: "Cambio de contexto.", time: "5 min", critical: false },
      ],
      solo_coche: [
        { name: "Móvil con voz", desc: "Manos libres si es necesario.", time: "inmediato", critical: true },
        { name: "Escucha música/podcast", desc: "Mente ocupada.", time: "5 min", critical: false },
      ],
      maria_casa: [
        { name: "Ponla como límite", desc: "'Me ayudas a no mirar'.", time: "inmediato", critical: false },
      ],
      familia_casa: [
        { name: "Actividad familiar SIN pantallas", desc: "Juego, conversación.", time: "30 min", critical: false },
      ],
    },
  },

  "Porros": {
    deteccion: {
      solo_casa: [
        { name: "Agua fría en cara", desc: "Shock del sistema.", time: "1 min", critical: true },
        { name: "Respiración 4-7-8", desc: "Vagal reset.", time: "2 min", critical: true },
        { name: "Paseo inmediato", desc: "Salir de casa. Contexto diferente.", time: "5 min", critical: true },
        { name: "Llamar a accountability", desc: "'Tengo ganas. Ayuda'.", time: "5 min", critical: true },
      ],
      solo_trabajo: [
        { name: "Paseo fuera oficina", desc: "15 minutos. Aire.", time: "15 min", critical: false },
        { name: "Haz micro-tarea", desc: "Ocupación mental.", time: "5 min", critical: false },
      ],
      solo_calle: [
        { name: "Entra a un lugar público", desc: "Café, tienda, parque concurrido.", time: "inmediato", critical: true },
        { name: "Llama a alguien", desc: "Voz real. Conexión.", time: "5 min", critical: true },
      ],
      solo_coche: [
        { name: "Ventana abierta. Música fuerte", desc: "Adrenalina. Distracción.", time: "5 min", critical: false },
      ],
      maria_casa: [
        { name: "Cuéntale", desc: "'Tengo ganas'. Transparencia.", time: "5 min", critical: false },
        { name: "Haz algo juntos", desc: "Interacción real.", time: "30 min", critical: false },
      ],
      familia_casa: [
        { name: "Propón actividad", desc: "Imposible estar solo.", time: "5 min", critical: false },
      ],
      amigos_calle: [
        { name: "Sugiere actividad diferente", desc: "'Vamos a...' (no esto).", time: "1 min", critical: false },
      ],
      amigos_casa: [
        { name: "Haz algo juntos", desc: "Interacción sin consumir.", time: "30 min", critical: false },
      ],
    },
  },

  "Tabaco": {
    deteccion: {
      solo_casa: [
        { name: "Chicle o caramelo", desc: "Boca ocupada. Ritual alterno.", time: "1 min", critical: false },
        { name: "Agua helada", desc: "Quiebra impulso.", time: "1 min", critical: true },
        { name: "Escucha música", desc: "Manos ocupadas.", time: "5 min", critical: false },
      ],
      solo_trabajo: [
        { name: "Paseo corto", desc: "5 minutos. Movimiento.", time: "5 min", critical: false },
        { name: "Chicle fuerte", desc: "Sabor potente.", time: "1 min", critical: false },
      ],
      solo_calle: [
        { name: "Entra a una tienda", desc: "Cambio de contexto.", time: "5 min", critical: true },
        { name: "Llama a alguien", desc: "Ocupación de manos.", time: "5 min", critical: false },
      ],
      solo_coche: [
        { name: "Ventana cerrada (regla)", desc: "Imposible fumar.", time: "inmediato", critical: true },
        { name: "Música o podcast", desc: "Mente ocupada.", time: "3 min", critical: false },
      ],
      maria_casa: [
        { name: "Cuéntale", desc: "'Tengo ganas'. Accountability.", time: "1 min", critical: false },
      ],
      familia_casa: [
        { name: "Propón actividad", desc: "Compañía. Distracción.", time: "5 min", critical: false },
      ],
      amigos_casa: [
        { name: "Salgamos a pasear", desc: "Movimiento. Interacción.", time: "10 min", critical: false },
      ],
    },
  },

  "Onicofagia": {
    deteccion: {
      solo_casa: [
        { name: "Manos a la boca consciente", desc: "Pausa. Respira.", time: "1 min", critical: false },
        { name: "Uñas CORTAS siempre", desc: "Menos material. Menos tentación.", time: "5 min", critical: true },
        { name: "Aplica crema/bálsamo amargo", desc: "Recordatorio táctico.", time: "1 min", critical: false },
        { name: "Fidget spinner o stress ball", desc: "Manos ocupadas.", time: "3 min", critical: false },
      ],
      solo_trabajo: [
        { name: "Ten un bolígrafo", desc: "Ocupación alternativa.", time: "1 min", critical: false },
        { name: "Esconde las manos bajo escritorio", desc: "Fuera de vista.", time: "1 min", critical: false },
        { name: "Fidget toy en el escritorio", desc: "Pop it. Ocupación táctil.", time: "3 min", critical: false },
      ],
      solo_calle: [
        { name: "Mete manos en bolsillos", desc: "Imposible acceso.", time: "30 seg", critical: true },
        { name: "Lleva guantes", desc: "Física. No puedes.", time: "inmediato", critical: true },
      ],
      solo_coche: [
        { name: "Manos al volante", desc: "Ocupadas. Seguridad.", time: "inmediato", critical: true },
        { name: "Fidget toy", desc: "Para los dedos inquietos.", time: "3 min", critical: false },
      ],
      maria_casa: [
        { name: "Pídele que te lo señale", desc: "Feedback en tiempo real.", time: "inmediato", critical: false },
        { name: "Hazlo frente a ella", desc: "Consciencia compartida.", time: "inmediato", critical: false },
      ],
      familia_casa: [
        { name: "Actividad con las manos ocupadas", desc: "Juego, dibujo, manualidades.", time: "30 min", critical: false },
      ],
      amigos_casa: [
        { name: "Juego de mesa", desc: "Manos ocupadas en tarjetas.", time: "1 hora", critical: false },
      ],
      amigos_calle: [
        { name: "Actividad ocupada", desc: "Paseo, compras, café.", time: "30 min", critical: false },
      ],
    },
  },
};

export const TOP_10_UNIVERSAL = [
  { name: "Paseo 5 minutos", desc: "Aire fresco. Reset neurológico.", time: "5 min", critical: true, habits: ["Pornografía", "Procrastinación", "Pantallas", "Porros", "Tabaco"] },
  { name: "Respiración 4-7-8", desc: "Inhala 4, sostén 7, exhala 8. Vagal reset.", time: "2 min", critical: true, habits: ["Pornografía", "Procrastinación", "Porros", "Tabaco"] },
  { name: "Escucha música", desc: "Dopamina limpia. Enfoque.", time: "3-5 min", critical: false, habits: ["Procrastinación", "Pantallas", "Porros", "Tabaco"] },
  { name: "Agua fría en cara", desc: "Shock del sistema. Quiebra impulso.", time: "1 min", critical: true, habits: ["Pornografía", "Procrastinación", "Porros"] },
  { name: "Micro-tarea (2 min)", desc: "Acción inmediata. Momentum.", time: "2 min", critical: true, habits: ["Procrastinación", "Pantallas"] },
  { name: "Llama a accountability", desc: "'Tengo impulso'. Voz real.", time: "5 min", critical: true, habits: ["Pornografía", "Porros"] },
  { name: "Cambiar de cuarto", desc: "Rompe contexto. Nuevo circuito.", time: "1 min", critical: true, habits: ["Pornografía", "Pantallas", "Porros", "Procrastinación"] },
  { name: "Estiramiento/ejercicio", desc: "Movimiento. Descarga tensión.", time: "3-5 min", critical: false, habits: ["Procrastinación", "Pantallas", "Porros", "Tabaco"] },
  { name: "Journaling rápido", desc: "Escribe impulso. Comprende trigger.", time: "3 min", critical: false, habits: ["Pornografía", "Procrastinación"] },
  { name: "Bebe agua", desc: "Hidratación. Reset metabólico.", time: "1 min", critical: false, habits: ["Procrastinación", "Pantallas", "Tabaco"] },
];
