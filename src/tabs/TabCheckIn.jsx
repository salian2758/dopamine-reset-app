import React, { useState } from 'react';

export default function TabCheckIn({ state, updateState }) {
  const [answers, setAnswers] = useState({
    pornografia: 0,
    procrastinacion: 3,
    pantallas: 0,
    porros: 0,
    tabaco: 0,
    onicofagia: 0,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    // Generar carta del testigo
    const witness = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-ES'),
      message: generateWitnessMessage(answers),
    };
    
    const newWitnesses = [witness, ...state.witnesses].slice(0, 10);
    updateState({ 
      witnesses: newWitnesses,
      lastCheckIn: new Date().toISOString(),
    });
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  function generateWitnessMessage(answers) {
    const messages = [
      `Hoy resististe. Tu hijo futuro está orgulloso. Cada "no" es una victoria.`,
      `Veo tu esfuerzo. No es perfecto, pero es REAL. Eso es lo que importa.`,
      `Caíste pero te levantaste. Eso es lo que hace un campeón.`,
      `Tu fortaleza no está en no fallar. Está en no rendirse.`,
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  return (
    <div className="tab-checkin">
      <div className="checkin-header">
        <div className="checkin-title">📋 Check-in Diario</div>
        <div className="checkin-subtitle">¿Cómo estuvo tu día?</div>
      </div>

      <div className="questions-container">
        <div className="question">
          <label>Pornografía</label>
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

        <div className="question">
          <label>Procrastinación (3 tareas hoy)</label>
          <div className="answer-options">
            <button 
              className={answers.procrastinacion === -15 ? 'active' : ''} 
              onClick={() => setAnswers({...answers, procrastinacion: -15})}
            >
              0/3
            </button>
            <button 
              className={answers.procrastinacion === 0 ? 'active' : ''} 
              onClick={() => setAnswers({...answers, procrastinacion: 0})}
            >
              1-2/3
            </button>
            <button 
              className={answers.procrastinacion === 5 ? 'active' : ''} 
              onClick={() => setAnswers({...answers, procrastinacion: 5})}
            >
              3/3 ✓
            </button>
          </div>
        </div>

        <div className="question">
          <label>Pantallas</label>
          <div className="answer-options">
            <button 
              className={answers.pantallas === -15 ? 'active' : ''} 
              onClick={() => setAnswers({...answers, pantallas: -15})}
            >
              Recaída
            </button>
            <button 
              className={answers.pantallas === 0 ? 'active' : ''} 
              onClick={() => setAnswers({...answers, pantallas: 0})}
            >
              Controlado
            </button>
            <button 
              className={answers.pantallas === 7 ? 'active' : ''} 
              onClick={() => setAnswers({...answers, pantallas: 7})}
            >
              Perfecto ✓
            </button>
          </div>
        </div>

        <div className="question">
          <label>Porros</label>
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
              NADA ✓
            </button>
          </div>
        </div>

        <div className="question">
          <label>Tabaco</label>
          <div className="answer-options">
            <button 
              className={answers.tabaco === -10 ? 'active' : ''} 
              onClick={() => setAnswers({...answers, tabaco: -10})}
            >
              Recaída
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
              NADA ✓
            </button>
          </div>
        </div>

        <div className="question">
          <label>Onicofagia (uñas)</label>
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
              Excelente ✓
            </button>
          </div>
        </div>
      </div>

      <button className="btn-submit" onClick={handleSubmit}>
        ✓ Guardar Check-in
      </button>

      {submitted && (
        <div className="success-message">
          ✓ Check-in guardado. Carta generada.
        </div>
      )}
    </div>
  );
}
