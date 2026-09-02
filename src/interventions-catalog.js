// Catálogo ABSOLUTAMENTE COMPLETO - garantiza intervenciones para CUALQUIER combinación
// Genera dinámicamente fallbacks para combos sin intervenciones específicas

const phaseInterventions = {
  "Pornografía": {
    deteccion: {
      generico: [
        { name: "Hielo en cara", desc: "Shock del sistema.", time: "1 min", critical: true },
        { name: "Respiración profunda", desc: "Vagal reset.", time: "2 min", critical: true },
        { name: "Sal de contexto", desc: "Cambio de lugar.", time: "5 min", critical: true },
      ],
    },
    cediendo: {
      generico: [
        { name: "Ducha fría extrema", desc: "Shock total.", time: "3 min", critical: true },
        { name: "Llama a alguien", desc: "Voz real. Urgencia.", time: "5 min", critical: true },
      ],
    },
    despues: {
      generico: [
        { name: "NO reinicies", desc: "Error ≠ fracaso.", time: "1 min", critical: true },
        { name: "Journaling", desc: "Comprende el trigger.", time: "5 min", critical: false },
      ],
    },
  },
  "Procrastinación": {
    deteccion: {
      generico: [
        { name: "Micro-tarea 2 min", desc: "Momentum inmediato.", time: "2 min", critical: true },
        { name: "Timer 25 min", desc: "Pomodoro urgente.", time: "1 min", critical: true },
      ],
    },
    cediendo: {
      generico: [
        { name: "Párate YA", desc: "Interrumpe el ciclo.", time: "1 min", critical: true },
        { name: "Llama accountability", desc: "Presión externa.", time: "5 min", critical: true },
      ],
    },
    despues: {
      generico: [
        { name: "Analiza qué falló", desc: "Aprendizaje.", time: "5 min", critical: false },
      ],
    },
  },
  "Pantallas": {
    deteccion: {
      generico: [
        { name: "Móvil FUERA", desc: "Otro cuarto.", time: "1 min", critical: true },
        { name: "Cierra navegador", desc: "Borra tentación.", time: "1 min", critical: true },
      ],
    },
    cediendo: {
      generico: [
        { name: "Apaga TODO", desc: "Internet OFF.", time: "1 min", critical: true },
      ],
    },
    despues: {
      generico: [
        { name: "Nueva regla estricta", desc: "Más restrictivo.", time: "5 min", critical: false },
      ],
    },
  },
  "Porros": {
    deteccion: {
      generico: [
        { name: "Agua fría cara", desc: "Shock neurológico.", time: "1 min", critical: true },
        { name: "Respira 4-7-8", desc: "Vagal reset.", time: "2 min", critical: true },
        { name: "Paseo inmediato", desc: "Salir contexto.", time: "5 min", critical: true },
      ],
    },
    cediendo: {
      generico: [
        { name: "Ducha fría", desc: "Interrumpe efecto.", time: "3 min", critical: true },
        { name: "Llama urgente", desc: "Conexión real.", time: "5 min", critical: true },
      ],
    },
    despues: {
      generico: [
        { name: "Reflexiona contexto", desc: "¿Por qué pasó?", time: "5 min", critical: false },
      ],
    },
  },
  "Tabaco": {
    deteccion: {
      generico: [
        { name: "Chicle o caramelo", desc: "Ritual alterno.", time: "1 min", critical: false },
        { name: "Agua helada", desc: "Quiebra impulso.", time: "1 min", critical: true },
      ],
    },
    cediendo: {
      generico: [
        { name: "Ducha fría", desc: "Interrumpe.", time: "3 min", critical: true },
      ],
    },
    despues: {
      generico: [
        { name: "Reflexión breve", desc: "Aprendizaje rápido.", time: "5 min", critical: false },
      ],
    },
  },
  "Onicofagia": {
    deteccion: {
      generico: [
        { name: "Manos consciencia", desc: "Pausa atenta.", time: "1 min", critical: false },
        { name: "Uñas cortas SIEMPRE", desc: "Menos material.", time: "5 min", critical: true },
        { name: "Crema amarga", desc: "Recordatorio táctil.", time: "1 min", critical: false },
        { name: "Fidget toy", desc: "Alternativa ocupada.", time: "3 min", critical: false },
      ],
    },
    cediendo: {
      generico: [
        { name: "Ducha fría", desc: "Interrumpe patrón.", time: "2 min", critical: true },
      ],
    },
    despues: {
      generico: [
        { name: "Crema sanadora", desc: "Cuidado de herida.", time: "2 min", critical: false },
      ],
    },
  },
};

export const INTERVENTIONS = {};

// Generar TODAS las combinaciones automáticamente
const habits = Object.keys(phaseInterventions);
const phases = ["deteccion", "cediendo", "despues"];
const companies = ["solo", "maria", "familia", "amigos"];
const locations = ["casa", "trabajo", "calle", "coche"];

habits.forEach(habit => {
  INTERVENTIONS[habit] = {};
  
  phases.forEach(phase => {
    INTERVENTIONS[habit][phase] = {};
    
    companies.forEach(company => {
      locations.forEach(location => {
        const key = `${company}_${location}`;
        // Usar genérico como base - garantiza que SIEMPRE hay algo
        INTERVENTIONS[habit][phase][key] = [...phaseInterventions[habit][phase].generico];
      });
    });
  });
});

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
