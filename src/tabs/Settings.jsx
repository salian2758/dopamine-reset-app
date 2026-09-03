import React, { useState } from 'react';
import './Settings.css';

const HABITS_CONFIG = {
  pornografia: { name: '🔴 Pornografía', emoji: '🔴', critical: true },
  procrastinacion: { name: '⏸️ Procrastinación', emoji: '⏸️', critical: true },
  pantallas: { name: '📱 Móvil (Prevención + Control)', emoji: '📱', critical: false },
  porros: { name: '🚭 Porros', emoji: '🚭', critical: true },
  tabaco: { name: '🚬 Tabaco / Nicotina', emoji: '🚬', critical: false },
  onicofagia: { name: '💅 Onicofagia (uñas)', emoji: '💅', critical: false },
};

export default function Settings({ state, updateState, onClose }) {
  const [newCustomHabit, setNewCustomHabit] = useState('');
  const [hiddenHabits, setHiddenHabits] = useState(state.hiddenHabits || []);

  function toggleHabitVisibility(habitKey) {
    const newHidden = hiddenHabits.includes(habitKey)
      ? hiddenHabits.filter(h => h !== habitKey) // Mostrar
      : [...hiddenHabits, habitKey]; // Ocultar
    
    setHiddenHabits(newHidden);
    updateState({ hiddenHabits: newHidden });
  }

  function addCustomHabit() {
    if (!newCustomHabit.trim()) return;
    
    const customHabits = state.customHabits || [];
    const newCustom = {
      id: `custom_${Date.now()}`,
      name: newCustomHabit,
      custom: true,
    };
    
    updateState({ customHabits: [...customHabits, newCustom] });
    setNewCustomHabit('');
  }

  function removeCustomHabit(id) {
    const customHabits = (state.customHabits || []).filter(h => h.id !== id);
    updateState({ customHabits });
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div className="settings-title">⚙️ Ajustes</div>
        <button className="settings-close" onClick={onClose}>✕</button>
      </div>

      {/* HÁBITOS VISIBLES/OCULTOS */}
      <div className="settings-section">
        <div className="section-title">👁️ Visibilidad de Hábitos</div>
        <p className="section-hint">Oculta hábitos que no quieras rastrear. Reaparece todo cuando los muestres de nuevo.</p>
        
        <div className="habits-toggle-list">
          {Object.entries(HABITS_CONFIG).map(([key, config]) => (
            <div key={key} className="habit-toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={!hiddenHabits.includes(key)}
                  onChange={() => toggleHabitVisibility(key)}
                />
                <span className="habit-label">
                  {config.emoji} {config.name}
                </span>
              </label>
              {hiddenHabits.includes(key) && (
                <span className="hidden-badge">Oculto</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* HÁBITOS PERSONALIZADOS */}
      <div className="settings-section">
        <div className="section-title">✨ Hábitos Personalizados</div>
        <p className="section-hint">Agrega hábitos propios para rastrear. Reemplazan los ocultos.</p>
        
        {state.customHabits && state.customHabits.length > 0 && (
          <div className="custom-habits-list">
            {state.customHabits.map(habit => (
              <div key={habit.id} className="custom-habit-item">
                <span>{habit.name}</span>
                <button 
                  className="btn-remove"
                  onClick={() => removeCustomHabit(habit.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="add-custom-habit">
          <input
            type="text"
            placeholder="Nombre del nuevo hábito (ej: Meditación, Ejercicio)"
            value={newCustomHabit}
            onChange={e => setNewCustomHabit(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && addCustomHabit()}
          />
          <button onClick={addCustomHabit}>+ Agregar</button>
        </div>
      </div>

      {/* INFO */}
      <div className="settings-info">
        <p>ℹ️ <strong>Hábitos ocultos:</strong> Desaparecerán del Check-in, Hoy, Alternativas y Cartas.</p>
        <p>✨ <strong>Hábitos personalizados:</strong> Aparecerán en Check-in como preguntas simples con puntuación automática.</p>
      </div>
    </div>
  );
}
