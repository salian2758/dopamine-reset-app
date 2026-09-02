// Mensajes dinámicos según contexto - con alma, motivadores, personalizados

export const headerMessages = {
  // Por capítulo
  chapter1: [
    "🧒 Tu niño interior confía en ti",
    "💪 Está contigo en cada paso",
    "✨ Sabe que lo vas a conseguir",
    "🌱 Crece cada día contigo",
  ],
  chapter2: [
    "🎯 Tu futuro hijo ve tu disciplina",
    "⚡ Está orgulloso de tu fortaleza",
    "🔥 Sabe que PUEDES lograrlo",
    "💎 Confía en tu determinación",
  ],
  chapter3: [
    "👑 Tu futuro yo te ve vencer",
    "🚀 Está maravillado por tu dominio",
    "🌟 SABES que lo conseguirás",
    "🏆 Confía en tu maestría",
  ],
  chapter4: [
    "🧬 Tu legado te observa",
    "⭐ Viviendo sin miedo, con libertad",
    "🌍 Transformando vidas alrededor",
    "🎆 La leyenda que SÍ se hizo",
  ],
};

export const witnessMessages = {
  // Cartas del testigo por contexto
  allTasksDone: [
    "Hoy conquistaste TODO. Tu futuro hijo sonríe.",
    "3/3 tareas. Eso es DISCIPLINA. Él lo ve todo.",
    "Completaste tu día. Él está aquí, celebrando contigo.",
    "Dominio total. Tu futuro yo está tan orgulloso...",
  ],
  someTasksDone: [
    "2 de 3. No es perfección, es PROGRESO. Él lo sabe.",
    "Avanzaste hoy, aunque incompleto. Eso CUENTA.",
    "No todo, pero ALGO. Tu futuro hijo ve el esfuerzo.",
    "Parcial hoy, pero mañana será mejor. Él cree en ti.",
  ],
  noTasksDone: [
    "Hoy fue difícil. Pero su mirada no te juzga, te sostiene.",
    "0 tareas. Mañana es un nuevo capítulo. Él espera.",
    "Hoy no fue tu día. Pero MAÑANA sí lo será.",
    "Caíste hoy, pero te levantarás. Tu futuro lo sabe.",
  ],
  perfectCheckIn: [
    "Todos los hábitos bajo control. MAESTRÍA pura.",
    "Salud mental máxima. Tu futuro hijo respira tranquilo.",
    "Hoy fuiste INVENCIBLE. Él lo vio todo.",
  ],
  goodCheckIn: [
    "La mayoría ganada. El futuro se acerca más cada día.",
    "Buen trabajo hoy. Tu niño interior está contento.",
    "Avanzaste, te cuidaste. Eso es suficiente para hoy.",
  ],
  hardDay: [
    "Hoy fue batalla. Pero las batallas forjan héroes.",
    "Cediste, pero EXISTISTE. Mañana es tu victoria.",
    "Fue difícil. Su amor no depende de la perfección.",
  ],
  sosSuccess: [
    "5+ minutos de RESISTENCIA. Eso es PODER puro.",
    "Aguantaste. Tu futuro lo VENENCIÓ.",
    "Resistencia es fuerza. Él lo celebra contigo.",
  ],
  sosTraining: [
    "Entrenamiento vale. Pequeñas victorias = progreso.",
    "Intentaste resistir. Eso ya es ganar.",
  ],
};

export const getHeaderMessage = (chapter) => {
  const messages = headerMessages[`chapter${chapter}`] || headerMessages.chapter1;
  return messages[Math.floor(Math.random() * messages.length)];
};

export const getWitnessMessage = (tasksCompleted, totalTasks, mentalHealth, sosSuccess = false) => {
  if (sosSuccess) {
    const sosMessages = witnessMessages.sosSuccess;
    return sosMessages[Math.floor(Math.random() * sosMessages.length)];
  }

  const ratio = tasksCompleted / totalTasks;
  
  if (mentalHealth >= 80) {
    return witnessMessages.perfectCheckIn[Math.floor(Math.random() * witnessMessages.perfectCheckIn.length)];
  } else if (mentalHealth >= 60) {
    return witnessMessages.goodCheckIn[Math.floor(Math.random() * witnessMessages.goodCheckIn.length)];
  } else if (mentalHealth >= 40) {
    if (ratio === 1) {
      return witnessMessages.goodCheckIn[Math.floor(Math.random() * witnessMessages.goodCheckIn.length)];
    } else if (ratio > 0) {
      return witnessMessages.someTasksDone[Math.floor(Math.random() * witnessMessages.someTasksDone.length)];
    } else {
      return witnessMessages.noTasksDone[Math.floor(Math.random() * witnessMessages.noTasksDone.length)];
    }
  } else {
    return witnessMessages.hardDay[Math.floor(Math.random() * witnessMessages.hardDay.length)];
  }
};
