// Catálogo REAL Y LÓGICO - intervenciones específicas por CONTEXTO
// Fase (impulso/cediendo/después) × Compañía (solo/maria/familia/amigos) × Ubicación (casa/trabajo/calle/coche)

export const INTERVENTIONS = {
  "Pornografía": {
    deteccion: {
      solo_casa: [
        { name: "Hielo en cara", desc: "Agua helada. Quiebra trance.", time: "1 min", critical: true },
        { name: "Desactiva WiFi", desc: "Imposible acceder.", time: "1 min", critical: true },
        { name: "Sal de habitación", desc: "Cambio contexto.", time: "5 min", critical: false },
      ],
      solo_trabajo: [
        { name: "Agua fría baño", desc: "Shock rápido.", time: "2 min", critical: true },
        { name: "Paseo fuera oficina", desc: "Aire fresco.", time: "5 min", critical: true },
        { name: "Habla con compañero", desc: "Rompe aislamiento.", time: "5 min", critical: false },
      ],
      solo_calle: [
        { name: "Entra lugar público", desc: "Café, tienda, parque.", time: "5 min", critical: true },
        { name: "Llamada de voz", desc: "Conexión real.", time: "5 min", critical: true },
        { name: "Caminata rápida", desc: "Movimiento.", time: "5 min", critical: false },
      ],
      solo_coche: [
        { name: "Estaciona AHORA", desc: "Seguridad primero.", time: "1 min", critical: true },
        { name: "Baja del coche", desc: "Cambia de espacio.", time: "5 min", critical: true },
        { name: "Música a volumen alto", desc: "Adrenalina.", time: "5 min", critical: false },
      ],
      maria_casa: [
        { name: "Busca a María", desc: "Contacto físico.", time: "inmediato", critical: true },
        { name: "Cuéntale", desc: "Transparencia total.", time: "5 min", critical: true },
        { name: "Haz algo juntos", desc: "Interacción real.", time: "15 min", critical: false },
      ],
      maria_trabajo: [
        { name: "Llama a María", desc: "Voz familiar.", time: "5 min", critical: true },
        { name: "Envía foto/mensaje", desc: "Conexión.", time: "1 min", critical: false },
      ],
      maria_calle: [
        { name: "Toma su mano", desc: "Contacto real.", time: "inmediato", critical: true },
        { name: "Abrazo", desc: "Presencia física.", time: "inmediato", critical: true },
      ],
      maria_coche: [
        { name: "Toma su mano", desc: "Ocupación.", time: "inmediato", critical: true },
        { name: "Conversa con ella", desc: "Distracción cognitiva.", time: "5 min", critical: false },
      ],
      familia_casa: [
        { name: "Ve con ellos", desc: "Compañía constante.", time: "inmediato", critical: true },
        { name: "Actividad familiar", desc: "Interacción.", time: "30 min", critical: false },
      ],
      familia_trabajo: [
        { name: "Piensa en ellos", desc: "Recuerdo.", time: "1 min", critical: false },
      ],
      familia_calle: [
        { name: "Caminata juntos", desc: "Proximidad.", time: "10 min", critical: false },
      ],
      amigos_casa: [
        { name: "Propón juego de mesa", desc: "Entretenimiento compartido.", time: "5 min", critical: false },
        { name: "Música/película", desc: "Actividad grupal.", time: "1 hora", critical: false },
      ],
      amigos_trabajo: [
        { name: "Pausa con ellos", desc: "Conversación casual.", time: "10 min", critical: false },
      ],
      amigos_calle: [
        { name: "Mantente en grupo", desc: "No te alejes.", time: "inmediato", critical: true },
        { name: "Caminata grupal", desc: "Movimiento.", time: "10 min", critical: false },
      ],
    },
    cediendo: {
      solo_casa: [
        { name: "Ducha fría EXTREMA", desc: "3 minutos. Shock total.", time: "3 min", critical: true },
        { name: "Llama Javier AHORA", desc: "Crisis. Emergencia.", time: "5 min", critical: true },
        { name: "Llama María urgente", desc: "'Necesito ayuda'.", time: "5 min", critical: true },
      ],
      solo_trabajo: [
        { name: "Sal de edificio", desc: "Cambia de sitio COMPLETAMENTE.", time: "10 min", critical: true },
        { name: "Llama accountability", desc: "Voz en tiempo real.", time: "5 min", critical: true },
      ],
      solo_calle: [
        { name: "Entra a lugar MÁS público", desc: "Comisaría, centro comercial.", time: "5 min", critical: true },
        { name: "Llamada de emergencia", desc: "Voz ahora mismo.", time: "5 min", critical: true },
      ],
      solo_coche: [
        { name: "Estaciona SEGURO", desc: "PARAR EL VEHÍCULO.", time: "1 min", critical: true },
        { name: "Baja del coche", desc: "Cambia ambiente.", time: "5 min", critical: true },
      ],
      maria_casa: [
        { name: "CUÉNTALE YA", desc: "Emergencia. Transparencia.", time: "inmediato", critical: true },
        { name: "Pídele límite físico", desc: "Ella te ayuda.", time: "inmediato", critical: true },
      ],
      maria_trabajo: [
        { name: "Llamada de crisis", desc: "Voz. AHORA.", time: "5 min", critical: true },
      ],
      familia_casa: [
        { name: "Pide ayuda familiar", desc: "No estés solo. Emergencia.", time: "inmediato", critical: true },
      ],
    },
    despues: {
      solo_casa: [
        { name: "NO reinicies hoy", desc: "Error ≠ fracaso completo.", time: "1 min", critical: true },
        { name: "Journaling: ¿qué trigger?", desc: "Escribe 5 min.", time: "5 min", critical: false },
      ],
      solo_trabajo: [
        { name: "Sigue trabajando", desc: "Momentum hacia adelante.", time: "1 min", critical: true },
      ],
      maria_casa: [
        { name: "Abrazo sin vergüenza", desc: "Apoyo. Aceptación.", time: "inmediato", critical: true },
      ],
    },
  },

  "Procrastinación": {
    deteccion: {
      solo_casa: [
        { name: "Micro-tarea 2 min YA", desc: "Empieza lo más fácil.", time: "2 min", critical: true },
        { name: "Timer 25 min", desc: "Pomodoro. Presión time.", time: "1 min", critical: true },
      ],
      solo_trabajo: [
        { name: "Email/tarea MÁS FÁCIL", desc: "Mínima fricción.", time: "1 min", critical: true },
        { name: "Cierra Slack 30 min", desc: "Sin interrupciones.", time: "1 min", critical: true },
        { name: "Avisa a compañero", desc: "'Voy a trabajar 30 min'.", time: "1 min", critical: false },
      ],
      solo_calle: [
        { name: "Entra café/biblioteca", desc: "Espacio de concentración.", time: "5 min", critical: true },
      ],
      solo_coche: [
        { name: "Estaciona", desc: "Micro-tarea en auto.", time: "5 min", critical: false },
      ],
      maria_casa: [
        { name: "Anuncia: 'Voy a hacer X'", desc: "Accountability con ella.", time: "1 min", critical: false },
        { name: "Trabaja en su presencia", desc: "Proximidad = presión.", time: "30 min", critical: false },
      ],
      familia_casa: [
        { name: "Dile a familia qué harás", desc: "Compromiso público.", time: "1 min", critical: false },
      ],
      amigos_casa: [
        { name: "Co-working session", desc: "Todos trabajan juntos.", time: "1 hora", critical: false },
      ],
    },
    cediendo: {
      solo_casa: [
        { name: "PÁRATE de inmediato", desc: "Interrumpe el ciclo NOW.", time: "1 min", critical: true },
        { name: "Javier urgente", desc: "Accountability extrema.", time: "5 min", critical: true },
      ],
      solo_trabajo: [
        { name: "Sal de escritorio", desc: "10 min fuera.", time: "10 min", critical: true },
        { name: "Avisa a manager", desc: "Presión externa.", time: "2 min", critical: true },
      ],
      maria_casa: [
        { name: "Pídele que te force a empezar", desc: "Push físico.", time: "5 min", critical: true },
      ],
    },
    despues: {
      solo_casa: [
        { name: "Análisis: ¿Qué trigger?", desc: "Aprende el patrón.", time: "10 min", critical: false },
      ],
    },
  },

  "Pantallas": {
    deteccion: {
      solo_casa: [
        { name: "Móvil FUERA del despacho", desc: "Otro cuarto. Imposible.", time: "1 min", critical: true },
        { name: "Cierra navegador tentador", desc: "Borra tabs.", time: "1 min", critical: true },
        { name: "App blocker ON", desc: "Límite técnico.", time: "1 min", critical: false },
      ],
      solo_trabajo: [
        { name: "Solo pestaña necesaria", desc: "Una y SOLO una.", time: "1 min", critical: true },
        { name: "Móvil en cajón bajo llave", desc: "Inaccesible.", time: "30 seg", critical: true },
      ],
      solo_calle: [
        { name: "Guarda móvil bolsillo trasero", desc: "Difícil de acceder.", time: "30 seg", critical: true },
        { name: "Escucha música/podcast", desc: "Oídos ocupados.", time: "5 min", critical: false },
      ],
      solo_coche: [
        { name: "Manos al volante SIEMPRE", desc: "Enfoque conducción.", time: "inmediato", critical: true },
        { name: "Hands-free solo si urgente", desc: "Límite estricto.", time: "inmediato", critical: true },
      ],
      maria_casa: [
        { name: "Que ella te limite", desc: "'Ayúdame a no mirar'.", time: "inmediato", critical: false },
      ],
      familia_casa: [
        { name: "Actividad SIN pantallas", desc: "Juego, conversación, cocina.", time: "30 min", critical: true },
      ],
      amigos_casa: [
        { name: "Juego de mesa", desc: "Manos y mente ocupadas.", time: "1 hora", critical: false },
      ],
    },
    cediendo: {
      solo_casa: [
        { name: "APAGA TODO", desc: "WiFi OFF. Móvil OFF.", time: "1 min", critical: true },
      ],
      solo_work: [
        { name: "Sal de oficina", desc: "Ambiente diferente AHORA.", time: "10 min", critical: true },
      ],
      maria_casa: [
        { name: "Que María confisque dispositivos", desc: "Medida extrema.", time: "inmediato", critical: true },
      ],
    },
    despues: {
      solo_casa: [
        { name: "Nueva regla: MÁS restrictiva", desc: "Aprende la lección.", time: "5 min", critical: false },
      ],
    },
  },

  "Porros": {
    deteccion: {
      solo_casa: [
        { name: "Agua fría cara", desc: "Shock neurológico.", time: "1 min", critical: true },
        { name: "Respiración 4-7-8", desc: "Vagal reset.", time: "2 min", critical: true },
        { name: "Paseo 10 min FUERA", desc: "Salir de la casa.", time: "10 min", critical: true },
      ],
      solo_trabajo: [
        { name: "Paseo fuera oficina", desc: "15-20 minutos.", time: "15 min", critical: true },
        { name: "Agua en cara (baño)", desc: "Reset.", time: "2 min", critical: false },
      ],
      solo_calle: [
        { name: "Entra café/lugar público", desc: "Gente alrededor.", time: "inmediato", critical: true },
        { name: "Llamada voz", desc: "Conexión real.", time: "5 min", critical: true },
        { name: "Caminata activa", desc: "Movimiento.", time: "10 min", critical: false },
      ],
      solo_coche: [
        { name: "Baja del coche", desc: "Cambio ambiente.", time: "5 min", critical: true },
        { name: "Caminata", desc: "Movimiento corporal.", time: "10 min", critical: false },
      ],
      maria_casa: [
        { name: "Cuéntale", desc: "Transparencia.", time: "5 min", critical: true },
        { name: "Haz actividad juntos", desc: "Interacción.", time: "30 min", critical: false },
      ],
      maria_trabajo: [
        { name: "Llamada a María", desc: "Voz. Apoyo.", time: "5 min", critical: true },
      ],
      maria_calle: [
        { name: "Mano en la suya", desc: "Contacto físico.", time: "inmediato", critical: true },
      ],
      familia_casa: [
        { name: "Actividad familiar", desc: "Compañía. Imposible consumir.", time: "1 hora", critical: true },
      ],
      amigos_casa: [
        { name: "Otra actividad", desc: "Juego, música, cine.", time: "1 hora", critical: true },
      ],
      amigos_calle: [
        { name: "Sugiere actividad diferente", desc: "'Vamos a otra cosa'.", time: "1 min", critical: true },
      ],
    },
    cediendo: {
      solo_casa: [
        { name: "Ducha fría", desc: "Interrumpe efecto 3-5 min.", time: "3 min", critical: true },
        { name: "Llama urgente", desc: "Voz. Conexión.", time: "5 min", critical: true },
      ],
      maria_casa: [
        { name: "Pídele apoyo AHORA", desc: "No estés solo.", time: "inmediato", critical: true },
      ],
    },
    despues: {
      solo_casa: [
        { name: "Reflexión: ¿contexto? ¿trigger?", desc: "Aprende patrón.", time: "10 min", critical: false },
      ],
    },
  },

  "Tabaco": {
    deteccion: {
      solo_casa: [
        { name: "Chicle fuerte", desc: "Sabor. Ritual alterno.", time: "1 min", critical: false },
        { name: "Agua helada boca", desc: "Sensación.", time: "1 min", critical: true },
        { name: "Respira profundo", desc: "Pulmones sin humo.", time: "2 min", critical: false },
      ],
      solo_trabajo: [
        { name: "Paseo rápido", desc: "5-10 minutos.", time: "5 min", critical: false },
        { name: "Chicle potente", desc: "Gustativo.", time: "1 min", critical: false },
      ],
      solo_calle: [
        { name: "Entra tienda/café", desc: "Cambio contexto.", time: "5 min", critical: true },
        { name: "Caminata", desc: "Movimiento.", time: "5 min", critical: false },
      ],
      solo_coche: [
        { name: "Ventana cerrada (regla)", desc: "Física. Imposible.", time: "inmediato", critical: true },
        { name: "Música fuerte", desc: "Distracción.", time: "5 min", critical: false },
      ],
      maria_casa: [
        { name: "Cuéntale", desc: "Accountability.", time: "1 min", critical: false },
      ],
      familia_casa: [
        { name: "Actividad juntos", desc: "Ocupación.", time: "30 min", critical: false },
      ],
      amigos_casa: [
        { name: "Paseo juntos", desc: "Movimiento grupal.", time: "15 min", critical: false },
      ],
    },
    cediendo: {
      solo_casa: [
        { name: "Ducha", desc: "Interrumpe patrón.", time: "3 min", critical: true },
      ],
      maria_casa: [
        { name: "Pídele apoyo", desc: "Momento crítico.", time: "5 min", critical: true },
      ],
    },
    despues: {
      solo_casa: [
        { name: "Reflexión corta", desc: "¿Qué pasó?", time: "5 min", critical: false },
      ],
    },
  },

  "Onicofagia": {
    deteccion: {
      solo_casa: [
        { name: "Consciencia: 'Estoy haciéndolo'", desc: "Pausa atenta.", time: "1 min", critical: false },
        { name: "Uñas cortas siempre", desc: "Menos material de roer.", time: "5 min", critical: true },
        { name: "Crema amarga/gel", desc: "Gusto recordatorio.", time: "1 min", critical: false },
        { name: "Fidget spinner/pop it", desc: "Manos ocupadas.", time: "3 min", critical: false },
      ],
      solo_trabajo: [
        { name: "Bolígrafo en mano", desc: "Ocupación alternativa.", time: "1 min", critical: false },
        { name: "Escritura/teclado", desc: "Manos haciendo algo.", time: "5 min", critical: false },
      ],
      solo_calle: [
        { name: "Manos en bolsillos", desc: "Imposible acceso.", time: "30 seg", critical: true },
        { name: "Guantes", desc: "Barrera física.", time: "inmediato", critical: true },
      ],
      solo_coche: [
        { name: "Manos al volante", desc: "Concentración conducción.", time: "inmediato", critical: true },
        { name: "Fidget toy", desc: "En asiento del copiloto.", time: "3 min", critical: false },
      ],
      maria_casa: [
        { name: "Pídele que te lo señale", desc: "Feedback real-time.", time: "inmediato", critical: false },
        { name: "Ella cuida tus manos", desc: "Apoyo compartido.", time: "inmediato", critical: false },
      ],
      maria_trabajo: [
        { name: "Envía foto de uñas", desc: "Check-in con ella.", time: "1 min", critical: false },
      ],
      maria_calle: [
        { name: "Mano en su brazo", desc: "Ocupación. Contacto.", time: "inmediato", critical: false },
      ],
      familia_casa: [
        { name: "Actividad ocupada", desc: "Manualidades, cocina, dibujo.", time: "30 min", critical: true },
      ],
      amigos_casa: [
        { name: "Juego de mesa", desc: "Manos manejando fichas.", time: "1 hora", critical: false },
      ],
      amigos_calle: [
        { name: "Caminata activa", desc: "Manos en bolsillos.", time: "30 min", critical: false },
      ],
    },
    cediendo: {
      solo_casa: [
        { name: "Ducha fría", desc: "Interrumpe patrón.", time: "2 min", critical: true },
      ],
      maria_casa: [
        { name: "Pídele que te pare", desc: "Intervención física.", time: "inmediato", critical: true },
      ],
    },
    despues: {
      solo_casa: [
        { name: "Crema sanadora", desc: "Cuidado de herida.", time: "2 min", critical: false },
      ],
    },
  },
};

export const TOP_10_UNIVERSAL = [
  { name: "Paseo 5 minutos", desc: "Aire fresco. Reset neurológico.", time: "5 min", critical: true, habits: ["Pornografía", "Procrastinación", "Pantallas", "Porros", "Tabaco"] },
  { name: "Respiración 4-7-8", desc: "Inhala 4, sostén 7, exhala 8. Vagal reset.", time: "2 min", critical: true, habits: ["Pornografía", "Procrastinación", "Porros"] },
  { name: "Escucha música", desc: "Dopamina limpia. Enfoque.", time: "5 min", critical: false, habits: ["Procrastinación", "Pantallas", "Porros", "Tabaco"] },
  { name: "Agua fría en cara", desc: "Shock del sistema. Quiebra impulso.", time: "1 min", critical: true, habits: ["Pornografía", "Procrastinación", "Porros"] },
  { name: "Micro-tarea 2 min", desc: "Acción inmediata. Momentum.", time: "2 min", critical: true, habits: ["Procrastinación", "Pantallas"] },
  { name: "Llama a accountability", desc: "Voz real. Conexión.", time: "5 min", critical: true, habits: ["Pornografía", "Porros"] },
  { name: "Cambiar de cuarto", desc: "Rompe contexto. Nuevo circuito.", time: "1 min", critical: true, habits: ["Pornografía", "Pantallas", "Porros"] },
  { name: "Estiramiento/ejercicio", desc: "Movimiento. Descarga tensión.", time: "3 min", critical: false, habits: ["Procrastinación", "Pantallas", "Porros", "Tabaco"] },
  { name: "Journaling rápido", desc: "Escribe impulso. Comprende trigger.", time: "3 min", critical: false, habits: ["Pornografía", "Procrastinación"] },
  { name: "Bebe agua", desc: "Hidratación. Reset metabólico.", time: "1 min", critical: false, habits: ["Procrastinación", "Pantallas", "Tabaco"] },
];
