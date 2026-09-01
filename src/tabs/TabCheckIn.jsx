import React, { useState } from 'react';

export default function TabCheckIn({ state, updateState }) {
  const [step, setStep] = useState('tasks'); // 'tasks' o 'habits'
  const [tasksCompleted, setTasksCompleted] = useState([false, false, false]);
  const [answers, setAnswers] = useState({
    pornografia: null,
    procrastinacion: null,
    porros: null,
    pantallas: null,
    tabaco: null,
    onicofagia: null,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleTaskToggle(index) {
    const updated = [...tasksCompleted];
    updated[index] = !updated[index];
    setTasksCompleted(updated);
  }

  function proceedToHabits() {
    setStep('habits');
  }

  function handleSubmit() {
    // Calcular puntos totales
    const totalPoints = Object.values(answers).reduce((sum, val) => sum + (val || 0), 0);
    
    // Generar carta del testigo
    const witness = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-ES'),
      message: generateWitnessMessage(answers, tasksCompleted),
    };
    
    const newWitnesses = [witness, ...state.witnesses].slice(0, 10);
    updateState({ 
      witnesses: newWitnesses,
      lastCheckIn: new Date().toISOString(),
      totalPoints: (state.totalPoints || 0) + totalPoints,
    });
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep('tasks');
      setTasksCompleted([false, false, false]);
      setAnswers({
        pornografia: null,
        procrastinacion: null,
        porros: null,
        pantallas: null,
        tabaco: null,
        onicofagia: null,
      });
    }, 3000);
  }

  function generateWitnessMessage(answers, tasks) {
    const tasksCount = tasks.filter(t => t).length;
    const messages = {
      0: `Hoy fue difícil. Pero viniste aquí. Eso importa. Tu hijo futuro ve tu intención.`,
      1: `Completaste 1/3 tareas. Pequeño avance es avance. Sigue.`,
      2: `Completaste 2/3 tareas. Veo consistencia. Eso es fuerza.`,
      3: `Día perfecto en tareas. Resististe. Eso es lo que hace un campeón.`,
    };
    return messages[tasksCount] || messages[0];
  }

  return (
    <div className="tab-checkin">
      <div className="checkin-header">
        <div className="checkin-title">📋 Check-in Diario</div>
        <div className="checkin-subtitle">{step === 'tasks' ? '¿Completaste tus tareas?' : '¿Cómo estuvo tu día?'}</div>
        <div className="checkin-progress">{step === 'tasks' ? '1/2' : '2/2'}</div>
      </div>

      {step === 'tasks' && (
        <div className="questions-container">
          <div className="tasks-section">
            <p className="section-info">Marca las tareas que completaste hoy:</p>
            {state.dailyTasks?.map((task, index) => (
              <div key={task.id} className="task-checkbox">
                <input
                  type="checkbox"
                  checked={tasksCompleted[index] || false}
                  onChange={() => handleTaskToggle(index)}
                  id={`task-${index}`}
                />
                <label htmlFor={`task-${index}`}>{task.text}</label>
              </div>
            ))}
          </div>
          <button className="btn-next" onClick={proceedToHabits}>
            Siguiente →
          </button>
        </div>
      )}

      {step === 'habits' && (
        <div className="questions-container">
          {/* PORNOGRAFÍA - CRÍTICA */}
          <div className="question critical">
            <label>🔴 Pornografía</label>
            <div className="answer-options">
              <button 
                className={answers.pornografia === -15 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, pornografia: -15})}
              >
                Recaída
              </button>
              <button 
                className={answers.pornografia === 0 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, pornografia: 0})}
              >
                Desliz
              </button>
              <button 
                className={answers.pornografia === 10 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, pornografia: 10})}
              >
                ✓ No
              </button>
            </div>
          </div>

          {/* PROCRASTINACIÓN - CRÍTICA */}
          <div className="question critical">
            <label>⏸️ Procrastinación</label>
            <p className="question-hint">{tasksCompleted.filter(t => t).length}/3 tareas completadas</p>
            <div className="answer-options">
              <button 
                className={answers.procrastinacion === -15 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, procrastinacion: -15})}
              >
                0/3
              </button>
              <button 
                className={answers.procrastinacion === 5 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, procrastinacion: 5})}
              >
                1-2/3
              </button>
              <button 
                className={answers.procrastinacion === 10 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, procrastinacion: 10})}
              >
                ✓ 3/3
              </button>
            </div>
          </div>

          {/* PORROS - CRÍTICA */}
          <div className="question critical">
            <label>🚭 Porros</label>
            <div className="answer-options">
              <button 
                className={answers.porros === -15 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, porros: -15})}
              >
                Recaída
              </button>
              <button 
                className={answers.porros === 0 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, porros: 0})}
              >
                1-2
              </button>
              <button 
                className={answers.porros === 10 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, porros: 10})}
              >
                ✓ Nada
              </button>
            </div>
          </div>

          {/* PANTALLAS - SCROLL/DOPAMINA */}
          <div className="question">
            <label>📱 Pantallas / Scroll / Dopamina</label>
            <p className="question-hint">Tiempo real en redes, buscadores sin propósito, videos infinitos</p>
            <div className="answer-options">
              <button 
                className={answers.pantallas === -15 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, pantallas: -15})}
              >
                Desenfreno (3+ horas)
              </button>
              <button 
                className={answers.pantallas === -7 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, pantallas: -7})}
              >
                Mucho (1-3 horas)
              </button>
              <button 
                className={answers.pantallas === 0 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, pantallas: 0})}
              >
                Moderado (<1 hora)
              </button>
              <button 
                className={answers.pantallas === 7 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, pantallas: 7})}
              >
                ✓ Controlado
              </button>
            </div>
          </div>

          {/* TABACO */}
          <div className="question">
            <label>🚬 Tabaco / Nicotina</label>
            <div className="answer-options">
              <button 
                className={answers.tabaco === -10 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, tabaco: -10})}
              >
                Recaída
              </button>
              <button 
                className={answers.tabaco === -5 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, tabaco: -5})}
              >
                Varios
              </button>
              <button 
                className={answers.tabaco === 0 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, tabaco: 0})}
              >
                1 cigarro
              </button>
              <button 
                className={answers.tabaco === 5 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, tabaco: 5})}
              >
                ✓ Nada
              </button>
            </div>
          </div>

          {/* ONICOFAGIA */}
          <div className="question">
            <label>💅 Onicofagia (uñas)</label>
            <div className="answer-options">
              <button 
                className={answers.onicofagia === -7 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, onicofagia: -7})}
              >
                Dañada
              </button>
              <button 
                className={answers.onicofagia === -3 ? 'active' : ''} 
                onClick={() => setAnswers({...answers, onicofagia: -3})}
              >
                Descuidada
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
                ✓ Excelente
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
