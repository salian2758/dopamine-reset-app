import React, { useState, useEffect } from 'react';

export default function TabSOS({ state, updateState }) {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  function formatTime(secs) {
    const mins = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }

  function handleStop() {
    setIsRunning(false);
    if (seconds >= 300) {
      // 5+ min = éxito
      alert('✓ ÉXITO: +20 XP + 0.05 multiplicador\n\n5 minutos resistidos. Eres fuerte.');
    } else if (seconds > 60) {
      // 1-5 min = entrenamiento
      alert('💪 ENTRENAMIENTO\n\nNo es fracaso. Es práctica.\nVuelve mañana más fuerte.');
    } else {
      // <1 min
      alert('👶 INICIO\n\nVuelve mañana. Cada intento suma.');
    }
    setSeconds(0);
  }

  const motivationalPhrases = [
    '🧒 Tu futuro hijo te está viendo AHORA',
    '💪 Resiste 5 minutos. Solo 5.',
    '🎯 Cada segundo cuenta. Punto real.',
    '❌ NO es derrota. Es ENTRENAMIENTO.',
    '🔥 Tu cuerpo es más fuerte que el impulso',
    '📞 Si no puedes solo, llama a Javier',
    '🛁 Agua fría. Hielo. Movimiento.',
    '⏱️ Mira el timer. Gana tiempo.',
  ];

  return (
    <div className="tab-sos">
      <div className="sos-header">
        <div className="sos-title">🆘 RESISTENCIA CRÍTICA</div>
        <div className="sos-subtitle">Cuando ya está pasando</div>
      </div>

      <div className="timer-container">
        <div className="timer-display">{formatTime(seconds)}</div>
        <div className="timer-buttons">
          <button
            className={`btn-timer ${isRunning ? 'running' : ''}`}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? '⏸ Pausa' : '▶ Empezar'}
          </button>
          <button className="btn-timer stop" onClick={handleStop}>
            🛑 Parar
          </button>
        </div>
      </div>

      <div className="sos-messages">
        {motivationalPhrases.map((phrase, i) => (
          <div key={i} className="sos-message">{phrase}</div>
        ))}
      </div>

      <div className="sos-actions">
        <div className="action-section">
          <div className="action-title">🚨 ACCIONES INMEDIATAS</div>
          <div className="action-list">
            <div className="action">💧 Agua helada en cara</div>
            <div className="action">🏃 Corre / Salta ahora</div>
            <div className="action">📞 Llama a Javier</div>
            <div className="action">💑 Llama a María</div>
            <div className="action">🚿 Ducha fría extrema</div>
            <div className="action">💪 Flexiones hasta sudar</div>
          </div>
        </div>
      </div>
    </div>
  );
}
