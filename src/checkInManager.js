// Sistema de accountability: penalizar si no hay check-in diario

export function getYesterdayDate() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString().split('T')[0];
}

export function getTodayDate() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString().split('T')[0];
}

export function shouldApplyDefaultFailure(appState) {
  // Si no hay check-in registrado hoy, aplicar penalizaciones por defecto
  if (!appState.dailyCheckIn) {
    return true;
  }
  return false;
}

export function applyDefaultFailure(appState) {
  // Esto se ejecuta cuando el usuario abre la app y no completó check-in ayer
  
  // Valores peores posibles para todos los hábitos
  const defaultAnswers = {
    pornografia: -10,    // Varias
    porros: -10,         // Varias
    tabaco: -10,         // Varias
    onicofagia: -10,     // Dañadas
    pantallas_apps: -10, // Sí
    pantallas_impulso: -7, // Bastante
  };
  
  // Calcular puntos (negativos)
  let points = Object.values(defaultAnswers).reduce((a, b) => a + b, 0);
  
  // Tareas: 0 completadas
  const tasksCompleted = 0;
  const totalTasks = appState.dailyTasks?.length || 3;
  
  // Penalización salud mental: -10 por no hacer nada
  const mentalHealthPenalty = -10;
  const newMentalHealth = Math.max(0, (appState.mentalHealth || 50) + mentalHealthPenalty);
  
  // Resetear rachas de hábitos
  const resetHabits = {};
  Object.entries(appState.habits || {}).forEach(([key, habit]) => {
    resetHabits[key] = {
      ...habit,
      streak: 0, // Racha se resetea
      multiplier: 1.0, // Multiplicador vuelve a 1
    };
  });
  
  // Crear carta testigo por falta de accountability
  const witness = {
    id: Date.now(),
    date: new Date().toLocaleDateString('es-ES'),
    message: getAbandonfallMessage(newMentalHealth),
    isDefault: true, // Marcar como penalización automática
  };
  
  const newWitnesses = [witness, ...appState.witnesses].slice(0, 10);
  
  return {
    totalPoints: Math.max(0, (appState.totalPoints || 0) + points),
    mentalHealth: newMentalHealth,
    habits: resetHabits,
    witnesses: newWitnesses,
    lastCheckIn: new Date().toISOString(),
    lastDefaultFailure: new Date().toISOString(),
  };
}

function getAbandonfallMessage(mentalHealth) {
  const messages = [
    "No viniste hoy. Tu futuro hijo te estaba esperando...",
    "Silencio. La ausencia también cuenta.",
    "Un día sin registro. La racha se rompió.",
    "Hoy no estuviste aquí. Él lo notó.",
    "Abandonaste el programa. Eso tiene precio.",
    "Sin seguimiento, sin progreso. Hoy pierdes todo.",
    "La responsabilidad es el verdadero enemigo.",
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
}

export function registerDailyCheckIn(appState, checkInData) {
  // Registrar que se completó el check-in de hoy
  return {
    ...appState,
    dailyCheckIn: checkInData,
    lastCheckIn: new Date().toISOString(),
  };
}
