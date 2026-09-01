import React, { useState } from 'react';
import { INTERVENTIONS, TOP_10_UNIVERSAL } from '../interventions-catalog';


export default function TabAlternatives({ state, updateState, selectedHabit = '' }) {
  const [habit, setHabit] = useState(selectedHabit || '');
  const [phase, setPhase] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [showAddIntervention, setShowAddIntervention] = useState(false);
  const [newIntervention, setNewIntervention] = useState({
    name: '',
    desc: '',
    time: '',
    critical: false,
    habit: habit || '',
    phase: phase || 'deteccion',
    company: company || 'solo',
    location_new: location || 'casa',
  });

  function getTopUniversal() {
    // TOP 10 universal sin filtros
    if (!habit && !phase && !company && !location) {
      return TOP_10_UNIVERSAL;
    }
    // TOP por hábito (si seleccionó hábito pero sin otros filtros)
    if (habit && !phase && !company && !location) {
      return TOP_10_UNIVERSAL.filter(i => i.habits.includes(habit));
    }
    return [];
  }

  function getSpecificInterventions() {
    // Intervenciones específicas (con TODOS los filtros)
    if (!habit || !phase || !company || !location) return [];
    const key = `${company}_${location}`;
    return INTERVENTIONS[habit]?.[phase]?.[key] || [];
  }

  function saveNewIntervention() {
    if (!newIntervention.name || !newIntervention.habit) {
      alert('Nombre e hábito son obligatorios');
      return;
    }
    
    // Guardar en state (customInterventions)
    const customInterventions = state.customInterventions || [];
    customInterventions.push({
      ...newIntervention,
      id: Date.now(),
    });
    
    updateState({ customInterventions });
    setShowAddIntervention(false);
    setNewIntervention({
      name: '',
      desc: '',
      time: '',
      critical: false,
      habit: habit || '',
      phase: 'deteccion',
      company: 'solo',
      location_new: 'casa',
    });
  }

  const topInterventions = getTopUniversal();
  const specificInterventions = getSpecificInterventions();
  const interventions = specificInterventions.length > 0 ? specificInterventions : topInterventions;

  return (
    <div className="tab-alternatives">
      <div className="alternatives-header">
        <div className="alternatives-title">🎯 Intervenciones Rápidas</div>
        <div className="alternatives-subtitle">Sin fricción. Selecciona. Actúa.</div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Hábito</label>
          <select value={habit} onChange={e => setHabit(e.target.value)}>
            <option value="">← Selecciona o deselecciona</option>
            {Object.keys(INTERVENTIONS).map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Fase</label>
          <div className="phase-buttons">
            <button 
              className={phase === 'deteccion' ? 'active' : ''} 
              onClick={() => setPhase(phase === 'deteccion' ? '' : 'deteccion')}
            >
              🔔 Impulso
            </button>
            <button 
              className={phase === 'cediendo' ? 'active' : ''} 
              onClick={() => setPhase(phase === 'cediendo' ? '' : 'cediendo')}
            >
              ⚠️ Cediendo
            </button>
            <button 
              className={phase === 'despues' ? 'active' : ''} 
              onClick={() => setPhase(phase === 'despues' ? '' : 'despues')}
            >
              🔄 Después
            </button>
          </div>
        </div>

        <div className="filter-group">
          <label>¿Con quién?</label>
          <div className="company-buttons">
            <button 
              className={`company-btn solo ${company === 'solo' ? 'active' : ''}`} 
              onClick={() => setCompany(company === 'solo' ? '' : 'solo')}
            >
              🚨 SOLO
            </button>
            <button 
              className={company === 'familia' ? 'active' : ''} 
              onClick={() => setCompany(company === 'familia' ? '' : 'familia')}
            >
              👨‍👩‍👧 Familia
            </button>
            <button 
              className={company === 'amigos' ? 'active' : ''} 
              onClick={() => setCompany(company === 'amigos' ? '' : 'amigos')}
            >
              👥 Amigos
            </button>
            <button 
              className={company === 'maria' ? 'active' : ''} 
              onClick={() => setCompany(company === 'maria' ? '' : 'maria')}
            >
              💑 María
            </button>
          </div>
        </div>

        <div className="filter-group">
          <label>¿Dónde?</label>
          <div className="location-buttons">
            <button 
              className={location === 'casa' ? 'active' : ''} 
              onClick={() => setLocation(location === 'casa' ? '' : 'casa')}
            >
              🏠 Casa
            </button>
            <button 
              className={location === 'trabajo' ? 'active' : ''} 
              onClick={() => setLocation(location === 'trabajo' ? '' : 'trabajo')}
            >
              💼 Trabajo
            </button>
            <button 
              className={location === 'calle' ? 'active' : ''} 
              onClick={() => setLocation(location === 'calle' ? '' : 'calle')}
            >
              🚶 Calle
            </button>
            <button 
              className={location === 'coche' ? 'active' : ''} 
              onClick={() => setLocation(location === 'coche' ? '' : 'coche')}
            >
              🚗 Coche
            </button>
          </div>
        </div>
      </div>

      <div className="add-intervention-btn">
        <button onClick={() => setShowAddIntervention(!showAddIntervention)}>
          + Agregar intervención
        </button>
      </div>

      {showAddIntervention && (
        <div className="add-intervention-modal">
          <div className="modal-content">
            <h3>➕ Nueva Intervención</h3>
            
            <input
              type="text"
              placeholder="Nombre"
              value={newIntervention.name}
              onChange={e => setNewIntervention({...newIntervention, name: e.target.value})}
            />
            
            <textarea
              placeholder="Descripción"
              value={newIntervention.desc}
              onChange={e => setNewIntervention({...newIntervention, desc: e.target.value})}
            />
            
            <input
              type="text"
              placeholder="Tiempo (ej: 5 min)"
              value={newIntervention.time}
              onChange={e => setNewIntervention({...newIntervention, time: e.target.value})}
            />
            
            <label>
              <input
                type="checkbox"
                checked={newIntervention.critical}
                onChange={e => setNewIntervention({...newIntervention, critical: e.target.checked})}
              />
              Crítica/Urgente
            </label>
            
            <select
              value={newIntervention.habit}
              onChange={e => setNewIntervention({...newIntervention, habit: e.target.value})}
            >
              <option value="">Selecciona hábito</option>
              {Object.keys(INTERVENTIONS).map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
            
            <div className="modal-buttons">
              <button className="btn-save" onClick={saveNewIntervention}>Guardar</button>
              <button className="btn-cancel" onClick={() => setShowAddIntervention(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <div className="interventions-list">
        {topInterventions.length > 0 && (
          <div className="top-interventions-section">
            <div className="top-header">
              ⭐ TOP {habit ? `para ${habit}` : 'Universal'}
            </div>
            {topInterventions.map((intervention, i) => (
              <div key={`top-${i}`} className={`intervention-item critical top`}>
                <div className="intervention-name">⭐ {intervention.name}</div>
                <div className="intervention-desc">{intervention.desc}</div>
                <div className="intervention-time">⏱️ {intervention.time}</div>
              </div>
            ))}
          </div>
        )}

        {specificInterventions.length > 0 && (
          <div className="specific-interventions-section">
            <div className="specific-header">
              🎯 Para esta situación
            </div>
            {specificInterventions.map((intervention, i) => (
              <div key={`specific-${i}`} className={`intervention-item ${intervention.critical ? 'critical' : ''}`}>
                <div className="intervention-name">{intervention.name}</div>
                <div className="intervention-desc">{intervention.desc}</div>
                <div className="intervention-time">⏱️ {intervention.time}</div>
              </div>
            ))}
          </div>
        )}

        {topInterventions.length === 0 && specificInterventions.length === 0 && (
          <div className="empty-interventions">
            {habit ? `Selecciona fase, compañía y ubicación para más opciones.` : 'Selecciona un hábito o filtros para ver intervenciones.'}
          </div>
        )}
      </div>
    </div>
  );
}
