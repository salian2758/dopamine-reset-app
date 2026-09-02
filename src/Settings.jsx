import React, { useState } from 'react';
import './Settings.css';

export default function Settings({ state, updateState, onClose }) {
  const [activeTab, setActiveTab] = useState('habits');
  const [hiddenHabits, setHiddenHabits] = useState(state?.hiddenHabits || []);
  const [newHabitName, setNewHabitName] = useState('');

  const allHabits = [
    { id: 'pornografia', label: '🔴 Pornografía' },
    { id: 'porros', label: '🔴 Porros' },
    { id: 'tabaco', label: '🔴 Tabaco' },
    { id: 'onicofagia', label: '🔨 Onicofagia' },
    { id: 'pantallas_apps', label: '📱 Instalar apps' },
    { id: 'pantallas_impulso', label: '📜 Scroll sin control' },
  ];

  function toggleHabitVisibility(habitId) {
    const newHidden = hiddenHabits.includes(habitId)
      ? hiddenHabits.filter(h => h !== habitId)
      : [...hiddenHabits, habitId];
    
    setHiddenHabits(newHidden);
    updateState({ hiddenHabits: newHidden });
  }

  function addNewHabit() {
    if (!newHabitName.trim()) return;
    
    const customHabits = state?.customHabits || [];
    const newHabit = {
      id: `custom_${Date.now()}`,
      label: newHabitName,
      isCustom: true,
    };
    
    updateState({
      customHabits: [...customHabits, newHabit],
    });
    
    setNewHabitName('');
  }

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>⚙️ Ajustes</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="settings-tabs">
          <button
            className={`tab-btn ${activeTab === 'habits' ? 'active' : ''}`}
            onClick={() => setActiveTab('habits')}
          >
            Hábitos
          </button>
          <button
            className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
            onClick={() => setActiveTab('custom')}
          >
            Personalizados
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'habits' && (
            <div className="habits-section">
              <p className="section-label">Mostrar/Ocultar hábitos en el check-in:</p>
              <div className="habits-list">
                {allHabits.map(habit => (
                  <div key={habit.id} className="habit-toggle">
                    <input
                      type="checkbox"
                      id={`habit-${habit.id}`}
                      checked={!hiddenHabits.includes(habit.id)}
                      onChange={() => toggleHabitVisibility(habit.id)}
                    />
                    <label htmlFor={`habit-${habit.id}`}>{habit.label}</label>
                  </div>
                ))}
              </div>
              <p className="hint">💡 Oculta hábitos que no necesites ahora. Puedes mostrarlos de nuevo en cualquier momento.</p>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="custom-section">
              <p className="section-label">Agregar un hábito personalizado:</p>
              <div className="add-custom">
                <input
                  type="text"
                  placeholder="Nombre del nuevo hábito (ej: Meditación, Ejercicio)"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addNewHabit()}
                  className="custom-input"
                />
                <button onClick={addNewHabit} className="btn-add">Agregar</button>
              </div>

              {state?.customHabits && state.customHabits.length > 0 && (
                <div className="custom-habits">
                  <p className="section-label">Tus hábitos personalizados:</p>
                  {state.customHabits.map(habit => (
                    <div key={habit.id} className="custom-item">
                      <span>{habit.label}</span>
                      <button 
                        className="btn-remove"
                        onClick={() => {
                          updateState({
                            customHabits: state.customHabits.filter(h => h.id !== habit.id),
                          });
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <p className="hint">💡 Próximamente: Los hábitos personalizados aparecerán en el check-in con preguntas adaptadas.</p>
            </div>
          )}
        </div>

        <div className="settings-footer">
          <button className="btn-close" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}
