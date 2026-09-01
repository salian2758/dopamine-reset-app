import React, { useState } from 'react';

const HABITS_CONFIG = {
  pornografia: { name: 'Pornografía', emoji: '❌', critical: true },
  procrastinacion: { name: 'Procrastinación', emoji: '⏸️', critical: true },
  pantallas: { name: 'Pantallas / Scroll', emoji: '📱', critical: false },
  porros: { name: 'Porros', emoji: '🚭', critical: true },
  tabaco: { name: 'Tabaco / Nicotina', emoji: '🚬', critical: false },
  onicofagia: { name: 'Onicofagia (uñas)', emoji: '💅', critical: false },
};

const CHAPTERS = {
  0: { min: 0, max: 200, name: 'I: Despertar' },
  200: { min: 200, max: 500, name: 'II: Disciplina' },
  500: { min: 500, max: 1000, name: 'III: Maestría' },
  1000: { min: 1000, max: Infinity, name: 'IV: Legendario' },
};

export default function TabToday({ state, updateState, onNavigateToTab }) {
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedHabit, setSelectedHabit] = useState(null);

  function getChapter(points) {
    if (points < 200) return 'I: Despertar';
    if (points < 500) return 'II: Disciplina';
    if (points < 1000) return 'III: Maestría';
    return 'IV: Legendario';
  }

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState('');

  function toggleTask(taskId) {
    const updated = state.dailyTasks.map(t => 
      t.id === taskId ? { ...t, done: !t.done } : t
    );
    updateState({ dailyTasks: updated });
  }

  function startEditTask(task) {
    setEditingTaskId(task.id);
    setEditText(task.text);
  }

  function saveEditTask(taskId) {
    if (!editText.trim()) {
      setEditingTaskId(null);
      return;
    }
    const updated = state.dailyTasks.map(t => 
      t.id === taskId ? { ...t, text: editText } : t
    );
    updateState({ dailyTasks: updated });
    setEditingTaskId(null);
  }

  function cancelEditTask() {
    setEditingTaskId(null);
    setEditText('');
  }

  function addTask() {
    if (!newTaskText.trim()) return;
    const newTask = {
      id: Math.max(...state.dailyTasks.map(t => t.id), 0) + 1,
      text: newTaskText,
      done: false,
    };
    updateState({ dailyTasks: [...state.dailyTasks, newTask] });
    setNewTaskText('');
  }

  function getHabitsSorted() {
    const sorted = Object.entries(state.habits).sort(([, a], [, b]) => {
      if (a.streak === 0 && b.streak === 0) return a.level - b.level;
      if (a.streak === 0) return -1;
      if (b.streak === 0) return 1;
      return a.level - b.level;
    });
    return sorted;
  }

  return (
    <div className="tab-today">
      {/* BANNER */}
      <div className="chapter-banner">
        <div className="chapter-title">Capítulo {getChapter(state.totalPoints)}</div>
        <div className="chapter-progress">
          <div className="progress-bar" style={{ width: `${(state.totalPoints % 200 / 200) * 100}%` }} />
        </div>
        <div className="chapter-points">{state.totalPoints} puntos totales</div>
      </div>

      {/* SALUD MENTAL */}
      <div className="health-card">
        <div className="health-label">Salud Mental</div>
        <div className="health-percentage">{state.mentalHealth}%</div>
        <div className="health-bar">
          <div className="health-fill" style={{ width: `${state.mentalHealth}%` }} />
        </div>
      </div>

      {/* 3 TAREAS DEL DÍA */}
      <div className="tasks-section">
        <div className="section-title">📌 Tareas Prioritarias del Día</div>
        <p className="section-hint">Clickea para editar. Estas son tus objetivos del día.</p>
        <div className="tasks-list">
          {state.dailyTasks.slice(0, 3).map(task => (
            <div key={task.id} className={`task-item ${task.done ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              {editingTaskId === task.id ? (
                <div className="task-edit">
                  <input
                    type="text"
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && saveEditTask(task.id)}
                    autoFocus
                  />
                  <button onClick={() => saveEditTask(task.id)}>✓</button>
                  <button onClick={cancelEditTask}>✕</button>
                </div>
              ) : (
                <span 
                  className={`task-text ${task.done ? 'done' : ''}`}
                  onClick={() => startEditTask(task)}
                >
                  {task.text}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* TAREAS ADICIONALES */}
      {state.dailyTasks.length > 3 && (
        <div className="tasks-section">
          <div className="section-title">📝 Otras Tareas</div>
          <div className="tasks-list">
            {state.dailyTasks.slice(3).map(task => (
              <div key={task.id} className={`task-item ${task.done ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span className={task.done ? 'done' : ''}>{task.text}</span>
              </div>
            ))}
          </div>
          <div className="add-task">
            <input
              type="text"
              placeholder="+ Nueva tarea"
              value={newTaskText}
              onChange={e => setNewTaskText(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && addTask()}
            />
            <button onClick={addTask}>+</button>
          </div>
        </div>
      )}

      {/* HÁBITOS */}
      <div className="habits-section">
        <div className="section-title">🎯 Hábitos (ordenados por criticidad)</div>
        <div className="habits-grid">
          {getHabitsSorted().map(([key, habit]) => {
            const config = HABITS_CONFIG[key];
            const isCritical = config.critical && habit.streak === 0;
            return (
              <div
                key={key}
                className={`habit-card ${isCritical ? 'critical' : ''}`}
                onClick={() => setSelectedHabit(key)}
              >
                <div className="habit-header">
                  <span className="habit-emoji">{config.emoji}</span>
                  <span className="habit-name">{config.name}</span>
                </div>
                <div className="habit-stats">
                  <div className="stat">
                    <span className="stat-label">Nivel</span>
                    <span className="stat-value">{habit.level}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Racha</span>
                    <span className="stat-value">{habit.streak} días</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Mult.</span>
                    <span className="stat-value">{habit.multiplier.toFixed(2)}x</span>
                  </div>
                </div>
                <div className="xp-bar">
                  <div className="xp-fill" style={{ width: `${(habit.xp / habit.xpRequired) * 100}%` }} />
                </div>
                <div className="xp-text">{habit.xp} / {habit.xpRequired} XP</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DETALLES HÁBITO */}
      {selectedHabit && (
        <div className="habit-detail-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedHabit(null)}>×</button>
            <h3>{HABITS_CONFIG[selectedHabit].name}</h3>
            <p>Intervenciones para este hábito:</p>
            <button 
              className="action-btn"
              onClick={() => {
                onNavigateToTab('alternatives', HABITS_CONFIG[selectedHabit].name);
                setSelectedHabit(null);
              }}
            >
              Ver alternativas →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
