import React, { useState, useEffect } from 'react';
import { getWitnessMessage } from '../messages';
import { calculateTotalDayPoints, calculateMentalHealthChange, getChapter, getChapterNumber } from '../balanceSystem';

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
      // Si hay un check-in en progreso, cargar su estado completo
      setCheckInState(state.dailyCheckIn);
      if (state.dailyCheckIn.tasksCompleted) {
        setTasksCompleted(state.dailyCheckIn.tasksCompleted);
      }
      if (state.dailyCheckIn.answers) {
        setAnswers(state.dailyCheckIn.answers);
        setAnsweredQuestions(new Set(Object.keys(state.dailyCheckIn.answers).filter(k => state.dailyCheckIn.answers[k] !== null)));
      }
      // IMPORTANTE: Si hay currentStep guardado, usarlo (para NO resetear a 'tasks')
      if (state.dailyCheckIn.currentStep) {
        setCurrentStep(state.dailyCheckIn.currentStep);
      }
    }
    // NO resetear si no hay dailyCheckIn - mantener el estado local
  }, [state?.dailyCheckIn]);

  // Inicializar tasksCompleted desde dailyTasks (si no hay dailyCheckIn aún)
  useEffect(() => {
    if (!state?.dailyCheckIn && state?.dailyTasks && state.dailyTasks.length > 0) {
      // SOLO inicializar si tasksCompleted está vacío
      if (Object.keys(tasksCompleted).length === 0) {
        const initialTasks = {};
        state.dailyTasks.forEach(task => {
          initialTasks[task.id] = null; // null = sin responder, 'done' = hecha, 'not-done' = no hecha
        });
        setTasksCompleted(initialTasks);
      }
    }
  }, [state?.dailyCheckIn]); // Dependencia SOLO de dailyCheckIn, no de dailyTasks

  function handleTaskOption(taskId, option) {
    // option: 'done' | 'not-done'
    console.log('🔵 handleTaskOption', taskId, option); // DEBUG
    const newTasksCompleted = {
      ...tasksCompleted,
      [taskId]: option,
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
    // Asegurar que checkInState tiene estructura básica
    const baseCheckIn = checkInState || {
      tasksCompleted: {},
      answers: {},
      currentStep: 'tasks',
    };
    
    const updatedCheckIn = {
      ...baseCheckIn,
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    
    // Asegurar que currentStep está en el objeto (tomar el valor actualizado)
    if (!updatedCheckIn.currentStep && updates.currentStep === undefined) {
      updatedCheckIn.currentStep = currentStep;
    }
    
    setCheckInState(updatedCheckIn);
    updateState({
      dailyCheckIn: updatedCheckIn,
    });
  }

  function handleNextStep() {
    console.log('🔴 handleNextStep called, currentStep:', currentStep); // DEBUG
    if (currentStep === 'tasks') {
      const newStep = 'habits';
      console.log('🟡 Moving to habits'); // DEBUG
      setCurrentStep(newStep);
      updateCheckInProgress({ currentStep: newStep });
    }
  }

  function handleFinalizeCheckIn() {
    // BLOQUEO ANTI-CHEAT: verificar si ya se finalizó hoy
    const today = new Date().toDateString(); // "Wed Sep 02 2026"
    const lastCheckInDate = state.lastCheckInFinalized ? new Date(state.lastCheckInFinalized).toDateString() : null;
    
    if (lastCheckInDate === today) {
      console.warn('⛔ YA FINALIZASTE HOY. No puedes finalizar 2 veces en el mismo día.');
      alert('Ya finalizaste tu check-in hoy. Vuelve mañana para continuar.');
      return; // BLOQUEAR
    }
    
    console.log('🟢 FINALIZANDO CHECK-IN'); // DEBUG
    console.log('tasksCompleted:', tasksCompleted);
    console.log('answers:', answers);
    console.log('state.dailyTasks:', state.dailyTasks);
    
    // Calcular puntos con nuevo sistema balanceado
    const totalPoints = calculatePoints(answers, tasksCompleted);
    console.log('📊 totalPoints calculados:', totalPoints); // DEBUG
    
    // Calcular salud mental con nuevo sistema
    const completedCount = Object.values(tasksCompleted).filter(t => t === 'done').length;
    const totalTasks = state.dailyTasks?.length || 3;
    
    // Contar hábitos fallados para penalización
    const failedHabits = Object.values(answers).filter(a => a !== null && a < 0).length;
    const mentalHealthChange = calculateMentalHealthChange(tasksCompleted, false, failedHabits);
    console.log('💚 mentalHealthChange:', mentalHealthChange); // DEBUG
    
    const newMentalHealth = Math.max(0, Math.min(100, (state.mentalHealth || 50) + mentalHealthChange));
    console.log('Salud mental anterior:', state.mentalHealth, '→ nueva:', newMentalHealth); // DEBUG
    
    const witness = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-ES'),
      message: getWitnessMessage(completedCount, totalTasks, newMentalHealth, false),
    };
    
    const newWitnesses = [witness, ...state.witnesses].slice(0, 10);
    const todayISO = new Date().toISOString();
    
    // Calcular nuevos puntos totales, pero con mínimo 0
    let newTotalPoints = (state.totalPoints || 0) + totalPoints;
    newTotalPoints = Math.max(0, newTotalPoints);
    console.log('Puntos totales anterior:', state.totalPoints, '→ nueva:', newTotalPoints); // DEBUG
    
    // Obtener capítulo actual y nuevo
    const currentChapter = getChapter(state.totalPoints || 0);
    const newChapter = getChapter(newTotalPoints);
    
    // NO permitir bajar de capítulo
    let finalChapter = newChapter.chapter;
    if (getChapterNumber(currentChapter.chapter) > getChapterNumber(newChapter.chapter)) {
      finalChapter = currentChapter.chapter;
      // Mantener los puntos dentro del capítulo actual
      newTotalPoints = Math.max(currentChapter.min, newTotalPoints);
    }
    console.log('Capítulo anterior:', state.chapter, '→ nuevo:', finalChapter); // DEBUG
    
    // Guardar último check-in completado para referencia
    const completedCheckIn = {
      date: todayISO,
      tasksCompleted,
      answers,
      points: totalPoints,
      mentalHealthChange,
    };
    
    // Actualizar dailyTasks con el estado del check-in
    // IMPORTANTE: Remover tareas completadas (done: true)
    const updatedDailyTasks = state.dailyTasks
      .map(task => ({
        ...task,
        done: tasksCompleted[task.id] === 'done' ? true : false,
      }))
      .filter(task => tasksCompleted[task.id] !== 'done'); // REMOVER las que están done
    
    console.log('📝 updatedDailyTasks (tareas sin las completadas):', updatedDailyTasks); // DEBUG
    
    const updatePayload = {
      witnesses: newWitnesses,
      lastCheckIn: todayISO,
      lastCheckInFinalized: todayISO, // NUEVO: timestamp de cuando se finalizó
      totalPoints: newTotalPoints,
      chapter: finalChapter,
      mentalHealth: newMentalHealth,
      lastCompletedCheckIn: completedCheckIn,
      dailyCheckIn: null, // Listo para nuevo check-in mañana
      dailyTasks: updatedDailyTasks, // Sincronizar tareas
    };
    
    console.log('🔵 Guardando en Firebase:', updatePayload); // DEBUG
    updateState(updatePayload);
    console.log('✅ Check-in finalizado'); // DEBUG
    
    setSubmitted(true);
  }

  function calculatePoints(answers, tasks) {
    // Usar nuevo sistema balanceado
    return calculateTotalDayPoints(answers, tasks);
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

  const tasksCompleteCount = Object.values(tasksCompleted).filter(t => t === 'done').length;
  const totalTasks = state.dailyTasks?.length || 3;

  return (
    <div className="tab-checkin">
      <div className="checkin-header">
        <div className="checkin-title">📋 Check-in Diario (Progresivo)</div>
        <div className="checkin-subtitle">
          Guarda durante el día, contesta lo que puedas
        </div>
        <div className="checkin-progress">{currentStep === 'tasks' ? '1/2 - Tareas' : '2/2 - Hábitos'}</div>
        <div className="checkin-info">
          💡 Tus respuestas se guardan automáticamente. Los puntos se calculan cuando das "Finalizar".
        </div>
      </div>

      {currentStep === 'tasks' && (
        <div className="questions-container">
          <div className="tasks-section">
            <p className="section-info">✅ Marca tareas completadas hoy:</p>
            {state.dailyTasks && state.dailyTasks.length > 0 ? (
              state.dailyTasks.map(task => {
                // Determinar puntos para cada tarea
                let donePoints, notDonePoints;
                if (task.id === 1) {
                  donePoints = 12; notDonePoints = -8;
                } else if (task.id === 2) {
                  donePoints = 5; notDonePoints = -5;
                } else {
                  donePoints = 2; notDonePoints = -2;
                }
                
                return (
                  <div key={task.id} className="task-habit-section">
                    <h4>{task.name || `Tarea ${task.id}`}</h4>
                    <div className="habit-options two-col">
                      <button
                        className={`habit-btn ${tasksCompleted[task.id] === 'done' ? 'active excellent' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTaskOption(task.id, 'done');
                        }}
                      >
                        Hecha (+{donePoints})
                      </button>
                      <button
                        className={`habit-btn ${tasksCompleted[task.id] === 'not-done' ? 'active critical' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTaskOption(task.id, 'not-done');
                        }}
                      >
                        No hecha ({notDonePoints})
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="no-tasks">No hay tareas para hoy.</p>
            )}
            
            <div className="task-summary">
              <strong>{tasksCompleteCount} de {totalTasks}</strong> completadas
            </div>
          </div>

          <button 
            className="btn-primary" 
            onClick={(e) => {
              console.log('🔴 BOTÓN SIGUIENTE PRESIONADO EXPLÍCITAMENTE POR USUARIO');
              e.preventDefault();
              e.stopPropagation();
              handleNextStep();
            }}
          >
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
                className={`habit-btn ${answers.onicofagia === -4 ? 'active critical' : ''} ${answeredQuestions.has('onicofagia') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('onicofagia', -4)}
                disabled={answeredQuestions.has('onicofagia') && answers.onicofagia !== -4}
              >
                Dañadas (-4)
              </button>
              <button
                className={`habit-btn ${answers.onicofagia === -2 ? 'active warning' : ''} ${answeredQuestions.has('onicofagia') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('onicofagia', -2)}
                disabled={answeredQuestions.has('onicofagia') && answers.onicofagia !== -2}
              >
                Regular (-2)
              </button>
              <button
                className={`habit-btn ${answers.onicofagia === 3 ? 'active good' : ''} ${answeredQuestions.has('onicofagia') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('onicofagia', 3)}
                disabled={answeredQuestions.has('onicofagia') && answers.onicofagia !== 3}
              >
                Bien (+3)
              </button>
              <button
                className={`habit-btn ${answers.onicofagia === 6 ? 'active excellent' : ''} ${answeredQuestions.has('onicofagia') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('onicofagia', 6)}
                disabled={answeredQuestions.has('onicofagia') && answers.onicofagia !== 6}
              >
                Excelentes (+6)
              </button>
            </div>
          </div>

          {/* Pantallas Apps */}
          <div className="habit-section">
            <h4>📱 Pantallas (Prevención): ¿Instalaste apps o pusiste contenido nuevo en el móvil?</h4>
            {answeredQuestions.has('pantallas_apps') && (
              <div className="answered-badge">✓ Ya respondida</div>
            )}
            <div className="habit-options">
              <button
                className={`habit-btn ${answers.pantallas_apps === -6 ? 'active critical' : ''} ${answeredQuestions.has('pantallas_apps') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('pantallas_apps', -6)}
                disabled={answeredQuestions.has('pantallas_apps') && answers.pantallas_apps !== -6}
              >
                Sí (-6)
              </button>
              <button
                className={`habit-btn ${answers.pantallas_apps === 7 ? 'active excellent' : ''} ${answeredQuestions.has('pantallas_apps') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('pantallas_apps', 7)}
                disabled={answeredQuestions.has('pantallas_apps') && answers.pantallas_apps !== 7}
              >
                No (+7)
              </button>
            </div>
          </div>

          {/* Pantallas Control */}
          <div className="habit-section">
            <h4>📱 Pantallas (Control): ¿Cuando usaste el móvil, lo tuviste controlado?</h4>
            {answeredQuestions.has('pantallas_impulso') && (
              <div className="answered-badge">✓ Ya respondida</div>
            )}
            <div className="habit-options">
              <button
                className={`habit-btn ${answers.pantallas_impulso === -4 ? 'active critical' : ''} ${answeredQuestions.has('pantallas_impulso') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('pantallas_impulso', -4)}
                disabled={answeredQuestions.has('pantallas_impulso') && answers.pantallas_impulso !== -4}
              >
                No, perdí control (-4)
              </button>
              <button
                className={`habit-btn ${answers.pantallas_impulso === 0 ? 'active warning' : ''} ${answeredQuestions.has('pantallas_impulso') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('pantallas_impulso', 0)}
                disabled={answeredQuestions.has('pantallas_impulso') && answers.pantallas_impulso !== 0}
              >
                Distracciones (0)
              </button>
              <button
                className={`habit-btn ${answers.pantallas_impulso === 5 ? 'active excellent' : ''} ${answeredQuestions.has('pantallas_impulso') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('pantallas_impulso', 5)}
                disabled={answeredQuestions.has('pantallas_impulso') && answers.pantallas_impulso !== 5}
              >
                Muy controlado (+5)
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
                className={`habit-btn ${answers.pornografia === -5 ? 'active critical' : ''} ${answeredQuestions.has('pornografia') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('pornografia', -5)}
                disabled={answeredQuestions.has('pornografia') && answers.pornografia !== -5}
              >
                Varias (-5)
              </button>
              <button
                className={`habit-btn ${answers.pornografia === 0 ? 'active warning' : ''} ${answeredQuestions.has('pornografia') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('pornografia', 0)}
                disabled={answeredQuestions.has('pornografia') && answers.pornografia !== 0}
              >
                Una (0)
              </button>
              <button
                className={`habit-btn ${answers.pornografia === 8 ? 'active excellent' : ''} ${answeredQuestions.has('pornografia') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('pornografia', 8)}
                disabled={answeredQuestions.has('pornografia') && answers.pornografia !== 8}
              >
                No (+8)
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
                className={`habit-btn ${answers.porros === -5 ? 'active critical' : ''} ${answeredQuestions.has('porros') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('porros', -5)}
                disabled={answeredQuestions.has('porros') && answers.porros !== -5}
              >
                Varias (-5)
              </button>
              <button
                className={`habit-btn ${answers.porros === 0 ? 'active warning' : ''} ${answeredQuestions.has('porros') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('porros', 0)}
                disabled={answeredQuestions.has('porros') && answers.porros !== 0}
              >
                Una (0)
              </button>
              <button
                className={`habit-btn ${answers.porros === 8 ? 'active excellent' : ''} ${answeredQuestions.has('porros') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('porros', 8)}
                disabled={answeredQuestions.has('porros') && answers.porros !== 8}
              >
                Nada (+8)
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
                className={`habit-btn ${answers.tabaco === -5 ? 'active critical' : ''} ${answeredQuestions.has('tabaco') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('tabaco', -5)}
                disabled={answeredQuestions.has('tabaco') && answers.tabaco !== -5}
              >
                Varias (-5)
              </button>
              <button
                className={`habit-btn ${answers.tabaco === 0 ? 'active warning' : ''} ${answeredQuestions.has('tabaco') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('tabaco', 0)}
                disabled={answeredQuestions.has('tabaco') && answers.tabaco !== 0}
              >
                Una (0)
              </button>
              <button
                className={`habit-btn ${answers.tabaco === 8 ? 'active excellent' : ''} ${answeredQuestions.has('tabaco') ? 'disabled' : ''}`}
                onClick={() => handleAnswerHabit('tabaco', 8)}
                disabled={answeredQuestions.has('tabaco') && answers.tabaco !== 8}
              >
                Nada (+8)
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
