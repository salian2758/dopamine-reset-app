// SISTEMA BALANCEADO - Puntos, Salud Mental, Niveles

// ===== NUEVAS REGLAS DE PUNTUACIÓN =====
// Objetivo: Coherencia, no imposible remontar, pero con consecuencias reales

export const POINTS_SYSTEM = {
  // Hábitos: escala más suave (-5 a +8 en lugar de ±10)
  habits: {
    pornografia: { worst: -5, neutral: 0, best: 8 },    // Varias=-5, Una=0, No=+8
    porros: { worst: -5, neutral: 0, best: 8 },         // Varias=-5, Una=0, Nada=+8
    tabaco: { worst: -5, neutral: 0, best: 8 },         // Varias=-5, Una=0, Nada=+8
    onicofagia: { worst: -4, bad: -2, good: 3, best: 6 }, // Dañadas=-4, Regular=-2, Bien=+3, Excelentes=+6
    pantallas_apps: { worst: -6, best: 7 },             // Sí=-6, No=+7
    pantallas_impulso: { worst: -4, neutral: 0, best: 5 }, // Bastante=-4, Poco=0, No=+5
  },
  
  // Tareas: proporcional pero suave
  tasks: {
    complete_all: 12,      // 3/3 = +12
    complete_two: 5,       // 2/3 = +5
    complete_one: 0,       // 1/3 = 0
    complete_none: -8,     // 0/3 = -8 (no -10)
  },
  
  // No hacer check-in (entrar pero no marcar nada)
  noCheckIn: {
    enterAppButNotMark: -6, // Penalización media (entre fallar completamente y no entrar)
  },
};

// ===== SALUD MENTAL =====
// Cambio: NO baja -10 por no hacer tareas. Baja PROPORCIONALMENTE
export const MENTAL_HEALTH = {
  allTasksDone: 0,           // 3/3 tareas = sin cambio (mantiene)
  twoTasksDone: -2,          // 2/3 tareas = baja -2
  oneTaskDone: -4,           // 1/3 tareas = baja -4
  noTasksDone: -6,           // 0/3 tareas = baja -6 (no -10)
  
  // Bonificación si todos hábitos están bien
  allHabitsBest: 5,          // Si todos los hábitos están en su mejor versión = +5 salud
  
  // Penalización ACUMULATIVA si múltiples hábitos fallan
  // (pero no suma lineal, para evitar caídas precipitadas)
  perFailedHabit: -1,        // Por cada hábito fallado = -1 salud (NO -10)
};

// ===== RACHA (STREAK) =====
// Más lentos de resetear, pero aún castigan
export const STREAK_RULES = {
  increaseBy: 1,             // Cada day perfecto = +1 streak
  
  resetRules: {
    // Antes: cualquier fallo = reset a 0
    // Ahora: solo reset por fallo CRÍTICO (pornografía, porros negativo)
    criticalHabits: ['pornografia', 'porros'],
    failCritical: true,      // Fallo crítico = reset racha
    failNonCritical: false,  // Fallo menor (tabaco, pantallas) = -1 racha, no reset
  },
  
  minStreak: 0,
};

// ===== MULTIPLICADOR =====
// Más lento de subir, más lento de bajar
export const MULTIPLIER_RULES = {
  baseMultiplier: 1.0,
  
  phases: [
    { streakMin: 0, streakMax: 5, rate: 0.02 },    // 0-5 días: +0.02 por día (lento)
    { streakMin: 6, streakMax: 15, rate: 0.03 },   // 6-15 días: +0.03 por día
    { streakMin: 16, streakMax: 50, rate: 0.04 },  // 16-50 días: +0.04 por día
    { streakMin: 51, streakMax: Infinity, rate: 0.02 }, // 50+ días: +0.02 (lento, evita sobrepoderoso)
  ],
  
  sosBonus: 0.02,            // +0.02 por SOS exitoso (no +0.05)
  failurePenalty: -0.10,     // -0.10 si falla un día (no reset completo)
  
  maxMultiplier: 4.0,        // 4.0x máximo (no 5.0x)
  minMultiplier: 0.5,        // No puede ir abajo de 0.5x
};

// ===== NIVELES (XP) =====
// Más XP necesario, más lento progreso general (evita ciclos muy rápidos)
export const LEVEL_SYSTEM = {
  baseXpPerLevel: 150,       // Era 100, ahora 150 (20% más lento)
  exponentialFactor: 1.4,    // Era 1.5, ahora 1.4 (más suave)
  
  // Nivel 1: 150 XP
  // Nivel 2: 150 × 1.4 = 210 XP
  // Nivel 3: 210 × 1.4 = 294 XP
  // Más alcanzable pero aún requiere consistencia
};

// ===== EJEMPLO DE PROGRESIÓN REALISTA =====
/*
DÍA PERFECTO:
- 3/3 tareas: +12
- Todos hábitos en mejor: +8+8+8+6+7+5 = +42
- Salud mental: +5 (bonificación)
- Total día perfecto: +59 XP

PEOR DÍA POSIBLE:
- 0/3 tareas: -8
- Todos hábitos peor: -5-5-5-4-6-4 = -29
- Salud mental: -6
- Total peor día: -43 XP

RESULTADO:
- Diferencia día perfecto vs peor = 102 puntos
- En 3 días peores: -129 puntos (NO llegamos a 0 si comenzamos con 150+)
- Para remontar 3 días malos: ~5 días perfectos (es DURO pero POSIBLE)
- Esto crea CICLO REALISTA: malo → posible remontar → bueno → malo

SALUD MENTAL:
- Comienza: 50%
- Día perfecto: +5 = 55%
- Día peor: -6 = 44%
- 3 días peores: 50% → 38% (no 0%, permite remontar)
- 7 días peores consecutivos: 50% → 50-42 = 8% (CRÍTICO, pero posible)
*/

// ===== FUNCIONES DE CÁLCULO =====

export function calculateHabitPoints(habit, answer) {
  const habitConfig = POINTS_SYSTEM.habits[habit];
  if (!habitConfig) return 0;
  
  // Mapear respuestas a puntos según el hábito
  if (habit === 'onicofagia') {
    if (answer === 'dañadas') return habitConfig.worst;
    if (answer === 'regular') return habitConfig.bad;
    if (answer === 'bien') return habitConfig.good;
    if (answer === 'excelentes') return habitConfig.best;
  }
  
  if (habit === 'pantallas_impulso') {
    if (answer === 'bastante') return habitConfig.worst;
    if (answer === 'poco') return habitConfig.neutral;
    if (answer === 'no') return habitConfig.best;
  }
  
  // Para hábitos binarios o ternarios
  if (answer === 'worst' || answer === 'varias' || answer === 'si' || answer === 'dañadas') 
    return habitConfig.worst;
  if (answer === 'neutral' || answer === 'una' || answer === 'poco')
    return habitConfig.neutral;
  if (answer === 'best' || answer === 'nada' || answer === 'no' || answer === 'excelentes')
    return habitConfig.best;
  
  return 0;
}

export function calculateTasksPoints(tasksCompleted) {
  if (!tasksCompleted) return 0;
  
  let totalPoints = 0;
  
  // Puntos por tarea individual
  const taskPoints = {
    1: { done: 12, notDone: -8 },
    2: { done: 5, notDone: -5 },
    3: { done: 2, notDone: -2 },
  };
  
  Object.entries(tasksCompleted).forEach(([taskId, option]) => {
    const id = parseInt(taskId);
    if (option === 'done') {
      totalPoints += taskPoints[id]?.done || 0;
    } else if (option === 'not-done') {
      totalPoints += taskPoints[id]?.notDone || 0;
    }
    // Si null o no respondida, 0 puntos (neutral)
  });
  
  return totalPoints;
}

export function calculateMentalHealthChange(tasksCompleted, allHabitsBest = false, failedHabits = 0) {
  if (!tasksCompleted) return MENTAL_HEALTH.noTasksDone;
  
  const done = Object.values(tasksCompleted).filter(t => t === 'done').length;
  const total = Object.keys(tasksCompleted).length;
  
  let change = 0;
  
  if (done === total) {
    change += MENTAL_HEALTH.allTasksDone;
  } else if (done === total - 1) {
    change += MENTAL_HEALTH.twoTasksDone;
  } else if (done >= 1) {
    change += MENTAL_HEALTH.oneTaskDone;
  } else {
    change += MENTAL_HEALTH.noTasksDone;
  }
  
  if (allHabitsBest) {
    change += MENTAL_HEALTH.allHabitsBest;
  }
  
  // Penalización por cada hábito fallado
  change -= (failedHabits * MENTAL_HEALTH.perFailedHabit);
  
  return change;
}

export function calculateTotalDayPoints(answers, tasksCompleted) {
  if (!answers) answers = {};
  
  let total = 0;
  
  // Sumar puntos de hábitos (answers ya contiene valores numéricos)
  Object.entries(answers).forEach(([habit, answer]) => {
    if (answer !== null && typeof answer === 'number') {
      total += answer;
    }
  });
  
  // Sumar puntos de tareas
  total += calculateTasksPoints(tasksCompleted);
  
  return total;
}

export function getChapter(totalPoints) {
  if (totalPoints < 300) return { chapter: 'I', name: 'Despertar', min: 0, max: 300 };
  if (totalPoints < 700) return { chapter: 'II', name: 'Disciplina', min: 300, max: 700 };
  if (totalPoints < 1500) return { chapter: 'III', name: 'Maestría', min: 700, max: 1500 };
  return { chapter: 'IV', name: 'Legendario', min: 1500, max: Infinity };
}

export function getChapterNumber(chapter) {
  const mapping = { 'I': 1, 'II': 2, 'III': 3, 'IV': 4 };
  return mapping[chapter] || 1;
}

// ===== VALIDACIÓN DE ENTRADA =====
export function validateCheckIn(checkInData) {
  // Si entró a la app pero NO marcó NADA
  const tasksMarked = Object.values(checkInData.tasksCompleted || {}).some(t => t);
  const habitsMarked = Object.values(checkInData.answers || {}).some(a => a !== null);
  
  if (!tasksMarked && !habitsMarked) {
    return {
      valid: false,
      reason: 'ENTERED_BUT_NOT_MARKED',
      points: POINTS_SYSTEM.noCheckIn.enterAppButNotMark, // -6
      mentalHealthChange: -3,
    };
  }
  
  return { valid: true };
}

// ===== PROGRESIÓN SEMANAL ESPERADA =====
/*
SEMANA BUENA (5 días perfectos, 2 malos):
- 5 perfectos: +295
- 2 peores: -86
- Total: +209 → 50% → 259%
- Racha: 5 días (multiplicador ~1.10x)
- Salud mental: 50% + 3 = 53%

SEMANA MALA (2 perfectos, 5 malos):
- 2 perfectos: +118
- 5 peores: -215
- Total: -97 → Baja pero aún progresa desde 150+
- Racha: reset (multiplicador 1.0x)
- Salud mental: 50% - 15 = 35%

SEMANA MIXTA (3 buenos, 3 malos, 1 neutral):
- Total: ~neutral o ligeramente positivo
- Permite "mal día" sin catástrofe
*/

// ===== AUTO-FINALIZAR CHECK-IN =====
export function autoFinalizeCheckIn(state) {
  // Función para auto-finalizar check-in si usuario se olvida
  // Llena con opciones PEORES lo que no respondió
  
  if (!state.dailyCheckIn) {
    return {
      totalPoints: state.totalPoints || 0,
      chapter: state.chapter || 'I',
      mentalHealth: state.mentalHealth || 50,
      witnesses: state.witnesses || [],
    };
  }
  
  const { tasksCompleted = {}, answers = {} } = state.dailyCheckIn;
  
  // Completar tareas no respondidas con "not-done" (opción peor)
  const completeTasksCompleted = { ...tasksCompleted };
  (state.dailyTasks || []).forEach(task => {
    if (!completeTasksCompleted[task.id]) {
      completeTasksCompleted[task.id] = 'not-done';
    }
  });
  
  // Completar hábitos no respondidos con opciones PEORES
  const completeAnswers = {
    onicofagia: answers.onicofagia !== null ? answers.onicofagia : -4, // Dañadas
    pantallas_apps: answers.pantallas_apps !== null ? answers.pantallas_apps : -6, // Sí
    pantallas_impulso: answers.pantallas_impulso !== null ? answers.pantallas_impulso : -4, // Bastante
    pornografia: answers.pornografia !== null ? answers.pornografia : -5, // Varias
    porros: answers.porros !== null ? answers.porros : -5, // Varias
    tabaco: answers.tabaco !== null ? answers.tabaco : -5, // Varias
  };
  
  // Calcular puntos con valores completados
  const totalPoints = calculateTotalDayPoints(completeAnswers, completeTasksCompleted);
  
  // Calcular salud mental
  const completedCount = Object.values(completeTasksCompleted).filter(t => t === 'done').length;
  const failedHabits = Object.values(completeAnswers).filter(a => a < 0).length;
  const mentalHealthChange = calculateMentalHealthChange(completeTasksCompleted, false, failedHabits);
  const newMentalHealth = Math.max(0, Math.min(100, (state.mentalHealth || 50) + mentalHealthChange));
  
  // Actualizar puntos totales
  let newTotalPoints = (state.totalPoints || 0) + totalPoints;
  newTotalPoints = Math.max(0, newTotalPoints);
  
  // Validar capítulo
  const currentChapter = getChapter(state.totalPoints || 0);
  const newChapter = getChapter(newTotalPoints);
  let finalChapter = newChapter.chapter;
  if (getChapterNumber(currentChapter.chapter) > getChapterNumber(newChapter.chapter)) {
    finalChapter = currentChapter.chapter;
    newTotalPoints = Math.max(currentChapter.min, newTotalPoints);
  }
  
  // Crear carta testigo
  const witness = {
    id: Date.now(),
    date: new Date().toLocaleDateString('es-ES'),
    message: `Auto-finalizado (sin responder todos). ${completedCount}/${state.dailyTasks?.length || 3} tareas.`,
  };
  
  return {
    totalPoints: newTotalPoints,
    chapter: finalChapter,
    mentalHealth: newMentalHealth,
    witnesses: [witness, ...(state.witnesses || [])].slice(0, 10),
  };
}

export default {
  POINTS_SYSTEM,
  MENTAL_HEALTH,
  STREAK_RULES,
  MULTIPLIER_RULES,
  LEVEL_SYSTEM,
  validateCheckIn,
  getChapter,
  autoFinalizeCheckIn,
};
