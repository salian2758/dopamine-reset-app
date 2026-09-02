import React, { useState, useEffect } from 'react';
import { getWitnessMessage } from '../messages';

export default function TabCheckIn({ state, updateState }) {
  const [checkInState, setCheckInState] = useState(null);
  const [currentStep, setCurrentStep] = useState('tasks');
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
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  // Cargar check-in del día actual desde Firestore
  useEffect(() => {
    if (state?.dailyCheckIn) {
      setCheckInState(state.dailyCheckIn);
      if (state.dailyCheckIn.tasksCompleted) {
        setTasksCompleted(state.dailyCheckIn.tasksCompleted);
      }
      if (state.dailyCheckIn.answers) {
        setAnswers(state.dailyCheckIn.answers);
        setAnsweredQuestions(new Set(Object.keys(state.dailyCheckIn.answers).filter(k => state.dailyCheckIn.answers[k] !== null)));
      }
      if (state.dailyCheckIn.currentStep) {
        setCurrentStep(state.dailyCheckIn.currentStep);
      }
    }
  }, [state?.dailyCheckIn]);

  function handleTaskToggle(taskId) {
    const newTasksCompleted = {
      ...tasksCompleted,
      [taskId]: !tasksCompleted[taskId],
    };
    setTasksCompleted(newTasksCompleted);
    
    // Guardar tareas inmediatamente
    updateCheckInProgress({ tasksCompleted: newTasksCompleted });
  }

  function handleAnswerHabit(question, answer) {
    if (answeredQuestions.has(question)) {
      return; // Ya respondida, bloqueada
    }
    
    const newAnswers = { ...answers, [question]: answer };
    setAnswers(newAnswers);
    setAnsweredQuestions(new Set([...answeredQuestions, question]));
    
    // Guardar respuesta inmediatamente
    updateCheckInProgress({ answers: newAnswers });
  }

  function updateCheckInProgress(updates) {
    const updatedCheckIn = {
      ...checkInState,
      ...updates,
      currentStep,
      lastUpdated: new Date().toISOString(),
    };
    
    setCheckInState(updatedCheckIn);
    updateState({
      dailyCheckIn: updatedCheckIn,
    });
  }

  function handleNextStep() {
    if (currentStep === 'tasks') {
      setCurrentStep('habits');
      updateCheckInProgress({ currentStep: 'habits' });
    }
  }

  function handleFinalizeCheckIn() {
    // Calcular puntos SOLO de lo que respondió
    const answeredCount = Object.values(answers).filter(a => a !== null).length;
    const totalHabits = 6;
    
    // NO castigar si no respondió todo, solo calcula lo que respondió
    const totalPoints = calculatePoints(answers, tasksCompleted);
    
    // Salud mental: solo si COMPLETÓ todas las tareas (o respondió sobre ellas)
    const completedCount = Object.values(tasksCompleted).filter(t => t).length;
    const totalTasks = state.dailyTasks?.length || 3;
    
    const witness = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-ES'),
      message: getWitnessMessage(completedCount, totalTasks, state.mentalHealth, false),
    };
    
    const newWitnesses = [witness, ...state.witnesses].slice(0, 10);
    const today = new Date().toISOString();
    
    // Guardar que se completó el check-in de hoy antes de resetear para mañana
    updateState({
      witnesses: newWitnesses,
      lastCheckIn: today, // Esto marca que se hizo check-in HOY
      totalPoints: (state.totalPoints || 0) + totalPoints,
      dailyCheckIn: null, // Resetear para que mañana se pueda hacer nuevo check-in
    });
    
    setSubmitted(true);
  }

  function calculatePoints(answers, tasks) {
    let points = 0;
    
    // Puntos por tareas
    const completedTasks = Object.values(tasks).filter(t => t).length;
    points += completedTasks * 5;
    
    // Puntos por hábitos (solo de lo respondido)
    if (answers.onicofagia !== null) {
      points += answers.onicofagia;
    }
    if (answers.pornografia !== null) {
      points += answers.pornografia;
    }
    if (answers.porros !== null) {
      points += answers.porros;
    }
    if (answers.tabaco !== null) {
      points += answers.tabaco;
    }
    if (answers.pantallas_apps !== null) {
      points += answers.pantallas_apps;
    }
    if (answers.pantallas_impulso !== null) {
      points += answers.pantallas_impulso;
    }
    
    return Math.max(0, points);
  }

  // Si ya finalizó hoy
  if (submitted) {
    return (
      <div className="tab-checkin">
        <div className="checkin-completed">
          <div className="checkin-title">✅ Check-in Completado</div>
          <div className="checkin-subtitle">Vuelve mañana para continuar tu viaje.</div>
          <button 
            className="btn-primary" 
            onClick={() => {
              setSubmitted(false);
              setCheckInState(null);
              setTasksCompleted({});
              setAnswers({ onicofagia: null, pantallas_apps: null, pantallas_impulso: null, pornografia: null, porros: null, tabaco: null });
              setAnsweredQuestions(new Set());
              setCurrentStep('tasks');
            }}
          >
            Entendido
          </button>
        </div>
      </div>
    );
  }

  const tasksCompleteCount = Object.values(tasksCompleted).filter(t => t).length;
  const totalTasks = state.dailyTasks?.length || 3;

  return (
    <div className="tab-checkin">
      <div className="checkin-header">
        <div className="checkin-title">📋 Check-in Diario (Progresivo)</div>
        <div className="checkin-subtitle">
          Guarda durante el día, contesta lo que puedas
        </div>
        <div className="checkin-progress">{currentStep === 'tasks' ? '1/2 - Tareas' : '2/2 - Hábitos'}</div>
      </div>

      {currentStep === 'tasks' && (
        <div className="questions-container">
          <div className="tasks-section">
            <p className="section-info">✅ Marca tareas completadas hoy:</p>
            {state.dailyTasks && state.dailyTasks.length > 0 ? (
              state.dailyTasks.map(task => (
                <div key={task.id} className="task-item">
                  <input
                    type="checkbox"
                    checked={tasksCompleted[task.id] || false}
                    onChange={() => handleTaskToggle(task.id)}
                    id={`task-${task.id}`}
                  />
                  <label htmlFor={`task-${task.id}`}>{task.name}</label>
                </div>
              ))
            ) : (
              <p className="no-tasks">No hay tareas para hoy.</p>
            )}
            
            <div className="task-summary">
              <strong>{tasksCompleteCount} de {totalTasks}</strong> completadas
            </div>
          </div>

          <button className="btn-primary" onClick={handleNextStep}>
            Siguiente: Hábitos
          </button>
        </div>
      )}

      {currentStep === 'habits' && (
        <div className="questions-container">
          <p className="section-info">🎯 Responde sobre tus hábitos (respuestas bloqueadas después):</p>

          {/* Onicofagia */}
          <div className="habit-section">
            <h4>Uñas (Onicofagia)</h4>
            {answeredQuestions.has('onicofagia') && (
              <div className="answered-badge">✓ Ya respondida</div>
            )}
            <div className="habit-options">
              <button
                className={`habit-btn ${answers.onicofagia === -10 ? 'active critical' : ''} ${answeredQuestions.has('onicofagia') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('onicofagia', -10)}
                disabled={answeredQuestions.has('onicofagia') && answers.onicofagia !== -10}
              >
                Dañadas (-10)
              </button>
              <button
                className={`habit-btn ${answers.onicofagia === -5 ? 'active warning' : ''} ${answeredQuestions.has('onicofagia') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('onicofagia', -5)}
                disabled={answeredQuestions.has('onicofagia') && answers.onicofagia !== -5}
              >
                Regular (-5)
              </button>
              <button
                className={`habit-btn ${answers.onicofagia === 5 ? 'active good' : ''} ${answeredQuestions.has('onicofagia') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('onicofagia', 5)}
                disabled={answeredQuestions.has('onicofagia') && answers.onicofagia !== 5}
              >
                Bien (+5)
              </button>
              <button
                className={`habit-btn ${answers.onicofagia === 10 ? 'active excellent' : ''} ${answeredQuestions.has('onicofagia') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('onicofagia', 10)}
                disabled={answeredQuestions.has('onicofagia') && answers.onicofagia !== 10}
              >
                Excelentes (+10)
              </button>
            </div>
          </div>

          {/* Pantallas Apps */}
          <div className="habit-section">
            <h4>¿Abriste apps sin propósito hoy?</h4>
            {answeredQuestions.has('pantallas_apps') && (
              <div className="answered-badge">✓ Ya respondida</div>
            )}
            <div className="habit-options">
              <button
                className={`habit-btn ${answers.pantallas_apps === -10 ? 'active critical' : ''} ${answeredQuestions.has('pantallas_apps') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('pantallas_apps', -10)}
                disabled={answeredQuestions.has('pantallas_apps') && answers.pantallas_apps !== -10}
              >
                Sí (-10)
              </button>
              <button
                className={`habit-btn ${answers.pantallas_apps === 10 ? 'active excellent' : ''} ${answeredQuestions.has('pantallas_apps') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('pantallas_apps', 10)}
                disabled={answeredQuestions.has('pantallas_apps') && answers.pantallas_apps !== 10}
              >
                No (+10)
              </button>
            </div>
          </div>

          {/* Pantallas Impulso */}
          <div className="habit-section">
            <h4>Scroll/impulso sin control</h4>
            {answeredQuestions.has('pantallas_impulso') && (
              <div className="answered-badge">✓ Ya respondida</div>
            )}
            <div className="habit-options">
              <button
                className={`habit-btn ${answers.pantallas_impulso === -7 ? 'active critical' : ''} ${answeredQuestions.has('pantallas_impulso') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('pantallas_impulso', -7)}
                disabled={answeredQuestions.has('pantallas_impulso') && answers.pantallas_impulso !== -7}
              >
                Bastante (-7)
              </button>
              <button
                className={`habit-btn ${answers.pantallas_impulso === 0 ? 'active warning' : ''} ${answeredQuestions.has('pantallas_impulso') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('pantallas_impulso', 0)}
                disabled={answeredQuestions.has('pantallas_impulso') && answers.pantallas_impulso !== 0}
              >
                Poco (0)
              </button>
              <button
                className={`habit-btn ${answers.pantallas_impulso === 7 ? 'active excellent' : ''} ${answeredQuestions.has('pantallas_impulso') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('pantallas_impulso', 7)}
                disabled={answeredQuestions.has('pantallas_impulso') && answers.pantallas_impulso !== 7}
              >
                No (+7)
              </button>
            </div>
          </div>

          {/* Pornografía */}
          <div className="habit-section">
            <h4>🔴 Pornografía</h4>
            {answeredQuestions.has('pornografia') && (
              <div className="answered-badge">✓ Ya respondida</div>
            )}
            <div className="habit-options">
              <button
                className={`habit-btn ${answers.pornografia === -10 ? 'active critical' : ''} ${answeredQuestions.has('pornografia') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('pornografia', -10)}
                disabled={answeredQuestions.has('pornografia') && answers.pornografia !== -10}
              >
                Varias (-10)
              </button>
              <button
                className={`habit-btn ${answers.pornografia === 0 ? 'active warning' : ''} ${answeredQuestions.has('pornografia') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('pornografia', 0)}
                disabled={answeredQuestions.has('pornografia') && answers.pornografia !== 0}
              >
                Una (0)
              </button>
              <button
                className={`habit-btn ${answers.pornografia === 10 ? 'active excellent' : ''} ${answeredQuestions.has('pornografia') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('pornografia', 10)}
                disabled={answeredQuestions.has('pornografia') && answers.pornografia !== 10}
              >
                No (+10)
              </button>
            </div>
          </div>

          {/* Porros */}
          <div className="habit-section">
            <h4>🔴 Porros</h4>
            {answeredQuestions.has('porros') && (
              <div className="answered-badge">✓ Ya respondida</div>
            )}
            <div className="habit-options">
              <button
                className={`habit-btn ${answers.porros === -10 ? 'active critical' : ''} ${answeredQuestions.has('porros') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('porros', -10)}
                disabled={answeredQuestions.has('porros') && answers.porros !== -10}
              >
                Varias (-10)
              </button>
              <button
                className={`habit-btn ${answers.porros === 0 ? 'active warning' : ''} ${answeredQuestions.has('porros') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('porros', 0)}
                disabled={answeredQuestions.has('porros') && answers.porros !== 0}
              >
                Una (0)
              </button>
              <button
                className={`habit-btn ${answers.porros === 10 ? 'active excellent' : ''} ${answeredQuestions.has('porros') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('porros', 10)}
                disabled={answeredQuestions.has('porros') && answers.porros !== 10}
              >
                Nada (+10)
              </button>
            </div>
          </div>

          {/* Tabaco */}
          <div className="habit-section">
            <h4>🔴 Tabaco</h4>
            {answeredQuestions.has('tabaco') && (
              <div className="answered-badge">✓ Ya respondida</div>
            )}
            <div className="habit-options">
              <button
                className={`habit-btn ${answers.tabaco === -10 ? 'active critical' : ''} ${answeredQuestions.has('tabaco') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('tabaco', -10)}
                disabled={answeredQuestions.has('tabaco') && answers.tabaco !== -10}
              >
                Varias (-10)
              </button>
              <button
                className={`habit-btn ${answers.tabaco === 0 ? 'active warning' : ''} ${answeredQuestions.has('tabaco') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('tabaco', 0)}
                disabled={answeredQuestions.has('tabaco') && answers.tabaco !== 0}
              >
                Una (0)
              </button>
              <button
                className={`habit-btn ${answers.tabaco === 10 ? 'active excellent' : ''} ${answeredQuestions.has('tabaco') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('tabaco', 10)}
                disabled={answeredQuestions.has('tabaco') && answers.tabaco !== 10}
              >
                Nada (+10)
              </button>
            </div>
          </div>

          <div className="checkin-actions">
            <button className="btn-secondary" onClick={() => setCurrentStep('tasks')}>
              Atrás
            </button>
            <button className="btn-primary" onClick={handleFinalizeCheckIn}>
              Finalizar Check-in
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
