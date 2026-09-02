import React, { useState } from 'react';
import { getWitnessMessage } from '../messages';

export default function TabCheckIn({ state, updateState }) {
  const [step, setStep] = useState('tasks');
  const [tasksCompleted, setTasksCompleted] = useState({});
  const [answers, setAnswers] = useState({
    onicofagia: null,
    pantallas_apps: null,
    pantallas_impulso: null,
    pornografia: null,
    porros: null,
    tabaco: null,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleTaskToggle(taskId) {
    setTasksCompleted({
      ...tasksCompleted,
      [taskId]: !tasksCompleted[taskId],
    });
  }

  function proceedToHabits() {
    setStep('habits');
  }

  function handleSubmit() {
    const totalPoints = calculatePoints(answers, tasksCompleted);
    
    // Calcular salud mental y completadas para mensaje dinámico
    const completedCount = Object.values(tasksCompleted).filter(t => t).length;
    const totalTasks = state.dailyTasks?.length || 3;
    const mentalHealthChange = completedCount === totalTasks ? 0 : (completedCount === 0 ? -10 : -5);
    const newMentalHealth = Math.max(0, (state.mentalHealth || 50) + mentalHealthChange);
    
    const witness = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-ES'),
      message: getWitnessMessage(completedCount, totalTasks, newMentalHealth, false),
    };
    
    // NUEVO: Mantener tareas incompletas del día anterior
    // Separa: incompletas (pasan al siguiente día) y completadas (se resetean)
    const incompleteTasks = state.dailyTasks.filter(task => !tasksCompleted[task.id]);
    const completedTasks = state.dailyTasks.filter(task => tasksCompleted[task.id]);
    
    // Las tareas completadas se resetean, las incompletas se mantienen en el orden
    const resetTasks = [
      ...incompleteTasks, // Incompletas del día anterior (mismo orden)
      ...completedTasks.map(task => ({...task, done: false})) // Completadas se resetean
    ];
    
    const newWitnesses = [witness, ...state.witnesses].slice(0, 10);
    updateState({ 
      witnesses: newWitnesses,
      lastCheckIn: new Date().toISOString(),
      totalPoints: (state.totalPoints || 0) + totalPoints,
      dailyTasks: resetTasks, // Incompletas + completadas reseteadas
      mentalHealth: newMentalHealth, // Usar newMentalHealth ya calculado
    });
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep('tasks');
      setTasksCompleted({});
      setAnswers({
        onicofagia: null,
        pantallas_apps: null,
        pantallas_impulso: null,
        pornografia: null,
        porros: null,
        tabaco: null,
      });
    }, 3000);
  }

  function calculatePoints(answers, tasks) {
    let points = 0;
    
    // Procrastinación: se calcula automáticamente desde tareas
    const completedCount = Object.values(tasks).filter(t => t).length;
    const totalTasks = state.dailyTasks?.length || 3;
    
    if (completedCount === totalTasks) {
      points += 10; // Todas completas: +10
    } else if (completedCount === 0) {
      points -= 10; // Ninguna: -10 (ajustado de -15)
    } else if (completedCount === 1) {
      points += 0; // 1 de 3: neutral
    } else if (completedCount === 2) {
      points += 5; // 2 de 3: +5
    }
    
    // Hábitos: simétrico ±10 balance
    // Pornografía: -10 / 0 / +10
    if (answers.pornografia !== null) points += answers.pornografia;
    
    // Porros: -10 / 0 / +10
    if (answers.porros !== null) points += answers.porros;
    
    // Tabaco: -10 / 0 / +10 (ajustado de -10/0/+5)
    if (answers.tabaco !== null) points += answers.tabaco;
    
    // Onicofagia: -10 / -5 / +5 / +10 (ajustado de -7/-3/+2/+5)
    if (answers.onicofagia !== null) points += answers.onicofagia;
    
    // Pantallas (apps): -10 / +10
    if (answers.pantallas_apps !== null) points += answers.pantallas_apps;
    
    // Pantallas (impulso): -7 / 0 / +7 (más suave que otros hábitos)
    if (answers.pantallas_impulso !== null) points += answers.pantallas_impulso;
    
    // Puntos de tareas (proporcionales a prioridad)
    const taskPoints = [8, 5, 2]; // Tarea 1, 2, 3
    if (state.dailyTasks && state.dailyTasks.length > 0) {
      state.dailyTasks.slice(0, 3).forEach((task, index) => {
        if (tasks[task.id]) {
          points += taskPoints[index];
        } else {
          points -= taskPoints[index];
        }
      });
    }
    
    return points;
  }

  function generateWitnessMessage(tasks, answers) {
    const completedTasks = Object.values(tasks).filter(t => t).length;
    const totalTasks = state.dailyTasks?.length || 3;
    
    if (completedTasks === totalTasks) {
      return `Completaste TODAS las tareas. Tu hijo futuro está orgulloso. Eso es fuerza.`;
    } else if (completedTasks > 0) {
      return `Hiciste ${completedTasks} de ${totalTasks} tareas. Avance es avance. Sigue.`;
    } else {
      return `Hoy fue duro. Pero viniste aquí. Eso que importa. Tu hijo ve tu intención.`;
    }
  }

  const tasksCompleteCount = Object.values(tasksCompleted).filter(t => t).length;
  const totalTasks = state.dailyTasks?.length || 3;

  return (
    <div className="tab-checkin">
      <div className="checkin-header">
        <div className="checkin-title">📋 Check-in Diario</div>
        <div className="checkin-subtitle">
          {step === 'tasks' ? '¿Completaste tus tareas?' : '¿Cómo estuvo tu día?'}
        </div>
        <div className="checkin-progress">{step === 'tasks' ? '1/2' : '2/2'}</div>
      </div>

      {step === 'tasks' && (
        <div className="questions-container">
          <div className="tasks-section">
            <p className="section-info">Marca las tareas que completaste hoy:</p>
            {state.dailyTasks && state.dailyTasks.length > 0 ? (
              state.dailyTasks.map(task => (
                <div key={task.id} className="task-checkbox">
                  <input
                    type="checkbox"
                    checked={tasksCompleted[task.id] || false}
                    onChange={() => handleTaskToggle(task.id)}
                    id={`task-${task.id}`}
                  />
                  <label htmlFor={`task-${task.id}`}>{task.text}</label>
                </div>
              ))
            ) : (
              <p className="section-info">No hay tareas definidas</p>
            )}
          </div>
          <button className="btn-next" onClick={proceedToHabits}>
            Siguiente →
          </button>
        </div>
      )}

      {step === 'habits' && (
        <div className="questions-container">
          {/* BREAKDOWN DE TAREAS */}
          <div className="tasks-breakdown">
            <div className="breakdown-title">📊 Resumen Tareas</div>
            {state.dailyTasks && state.dailyTasks.slice(0, 3).map((task, index) => {
              const taskPoints = [8, 5, 2][index];
              const completed = tasksCompleted[task.id];
              const points = completed ? taskPoints : -taskPoints;
              return (
                <div key={task.id} className={`breakdown-item ${completed ? 'completed' : 'failed'}`}>
                  <span className="task-name">{task.text}</span>
                  <span className={`task-points ${completed ? 'positive' : 'negative'}`}>
                    {completed ? '+' : ''}{points}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* ONICOFAGIA */}
          <div className="question">
            <label>💅 Onicofagia</label>
            <div className="answer-options">
              <button 
                className={answers.onicofagia === -10 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, onicofagia: -10})}
              >
                Dañadas
              </button>
              <button 
                className={answers.onicofagia === -5 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, onicofagia: -5})}
              >
                Regular
              </button>
              <button 
                className={answers.onicofagia === 5 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, onicofagia: 5})}
              >
                Bien
              </button>
              <button 
                className={answers.onicofagia === 10 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, onicofagia: 10})}
              >
                ✓ Excelentes
              </button>
            </div>
          </div>

          {/* PANTALLAS - PREGUNTA 1: APPS NUEVAS */}
          <div className="question">
            <label>📱 Pantallas - ¿Instalaste apps nuevas?</label>
            <p className="question-hint">Regla inquebrantable</p>
            <div className="answer-options">
              <button 
                className={answers.pantallas_apps === 10 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, pantallas_apps: 10})}
              >
                ✓ No
              </button>
              <button 
                className={answers.pantallas_apps === -15 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, pantallas_apps: -15})}
              >
                Sí
              </button>
            </div>
          </div>

          {/* PANTALLAS - PREGUNTA 2: IMPULSO */}
          <div className="question">
            <label>📱 Pantallas - ¿Uso por impulso (no programado)?</label>
            <p className="question-hint">No (+7) → Poco (0) → Bastante (-10)</p>
            <div className="answer-options">
              <button 
                className={answers.pantallas_impulso === 7 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, pantallas_impulso: 7})}
              >
                ✓ No
              </button>
              <button 
                className={answers.pantallas_impulso === 0 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, pantallas_impulso: 0})}
              >
                Poco
              </button>
              <button 
                className={answers.pantallas_impulso === -10 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, pantallas_impulso: -10})}
              >
                Bastante
              </button>
            </div>
          </div>

          {/* PORNOGRAFÍA */}
          <div className="question hidden-habit">
            <label>❌ Pornografía</label>
            <div className="answer-options">
              <button 
                className={answers.pornografia === 10 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, pornografia: 10})}
              >
                ✓ No
              </button>
              <button 
                className={answers.pornografia === 0 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, pornografia: 0})}
              >
                Una vez
              </button>
              <button 
                className={answers.pornografia === -15 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, pornografia: -15})}
              >
                Varias veces
              </button>
            </div>
          </div>

          {/* PORROS */}
          <div className="question hidden-habit">
            <label>🚭 Porros</label>
            <div className="answer-options">
              <button 
                className={answers.porros === 10 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, porros: 10})}
              >
                ✓ Nada
              </button>
              <button 
                className={answers.porros === 0 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, porros: 0})}
              >
                Una vez
              </button>
              <button 
                className={answers.porros === -15 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, porros: -15})}
              >
                Más de una
              </button>
            </div>
          </div>

          {/* TABACO */}
          <div className="question hidden-habit">
            <label>🚬 Tabaco</label>
            <div className="answer-options">
              <button 
                className={answers.tabaco === 10 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, tabaco: 10})}
              >
                ✓ Nada
              </button>
              <button 
                className={answers.tabaco === 0 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, tabaco: 0})}
              >
                Una vez
              </button>
              <button 
                className={answers.tabaco === -10 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, tabaco: -10})}
              >
                Más de una
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'habits' && (
        <button className="btn-submit" onClick={handleSubmit}>
          ✓ Guardar Check-in
        </button>
      )}

      {submitted && (
        <div className="success-message">
          ✓ Check-in guardado. Carta generada.
        </div>
      )}
    </div>
  );
}
