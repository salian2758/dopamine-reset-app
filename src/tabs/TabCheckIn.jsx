import React, { useState } from 'react';

export default function TabCheckIn({ state, updateState }) {
  const [step, setStep] = useState('tasks');
  const [tasksCompleted, setTasksCompleted] = useState({});
  const [answers, setAnswers] = useState({
    procrastinacion: null,
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
    const totalPoints = calculatePoints(answers);
    
    const witness = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-ES'),
      message: generateWitnessMessage(tasksCompleted, answers),
    };
    
    // Resetear tareas para el nuevo día
    const resetTasks = state.dailyTasks.map(task => ({...task, done: false}));
    
    const newWitnesses = [witness, ...state.witnesses].slice(0, 10);
    updateState({ 
      witnesses: newWitnesses,
      lastCheckIn: new Date().toISOString(),
      totalPoints: (state.totalPoints || 0) + totalPoints,
      dailyTasks: resetTasks, // Resetear tareas
    });
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep('tasks');
      setTasksCompleted({});
      setAnswers({
        procrastinacion: null,
        onicofagia: null,
        pantallas_apps: null,
        pantallas_impulso: null,
        pornografia: null,
        porros: null,
        tabaco: null,
      });
    }, 3000);
  }

  function calculatePoints(answers) {
    let points = 0;
    Object.values(answers).forEach(val => {
      if (val !== null) points += val;
    });
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
          {/* PROCRASTINACIÓN */}
          <div className="question">
            <label>⏸️ Procrastinación</label>
            <p className="question-hint">{tasksCompleteCount}/{totalTasks} tareas completadas</p>
            <div className="answer-options">
              <button 
                className={answers.procrastinacion === -15 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, procrastinacion: -15})}
              >
                0/{totalTasks}
              </button>
              <button 
                className={answers.procrastinacion === 5 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, procrastinacion: 5})}
              >
                1-2/{totalTasks}
              </button>
              <button 
                className={answers.procrastinacion === 10 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, procrastinacion: 10})}
              >
                ✓ {totalTasks}/{totalTasks}
              </button>
            </div>
          </div>

          {/* ONICOFAGIA */}
          <div className="question">
            <label>💅 Onicofagia</label>
            <div className="answer-options">
              <button 
                className={answers.onicofagia === -7 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, onicofagia: -7})}
              >
                Dañadas
              </button>
              <button 
                className={answers.onicofagia === -3 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, onicofagia: -3})}
              >
                Regular
              </button>
              <button 
                className={answers.onicofagia === 2 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, onicofagia: 2})}
              >
                Bien
              </button>
              <button 
                className={answers.onicofagia === 5 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, onicofagia: 5})}
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
            <p className="question-hint">Sí = perdiste control. No = totalmente programado</p>
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
                className={answers.tabaco === 5 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, tabaco: 5})}
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
