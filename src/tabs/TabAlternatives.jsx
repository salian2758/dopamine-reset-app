import React, { useState } from 'react';

const INTERVENTIONS = {
  "Pornografía": {
    deteccion: {
      solo_casa: [
        { name: "Hielo en cara", desc: "Agua helada. Quiebra trance neurológico.", time: "<5 min", critical: true },
        { name: "Desactiva internet", desc: "WiFi OFF. Imposible acceder.", time: "1 min", critical: true },
        { name: "Abre Circuito", desc: "Dopamina REAL > fake.", time: "1 min", critical: true },
        { name: "Llama a Javier", desc: "Voz real. 'Tengo impulso'.", time: "5 min", critical: true },
      ],
      solo_trabajo: [
        { name: "Agua fría en cara (baño)", desc: "Choque. Reset.", time: "<5 min", critical: true },
      ],
      maria_casa: [
        { name: "Abraza a María", desc: "Contacto físico real.", time: "inmediato" },
      ],
    },
    cediendo: {
      solo_casa: [
        { name: "Ducha fría EXTREMA", desc: "Shock vagal total.", time: "3-5 min", critical: true },
        { name: "Llama a Javier AHORA", desc: "CRISIS. No es débil.", time: "5 min", critical: true },
        { name: "Llamar a María", desc: "'Necesito ayuda'.", time: "5 min", critical: true },
      ],
    },
    despues: {
      solo_casa: [
        { name: "NO reinicies, reconecta", desc: "Error ≠ día perdido.", time: "1 min", critical: true },
      ],
    },
  },
  "Procrastinación": {
    deteccion: {
      solo_casa: [
        { name: "Una micro-tarea YA", desc: "2 minutos máximo. Momentum.", time: "2 min", critical: true },
        { name: "Abre Circuito", desc: "Dopamina genuina. START.", time: "1 min", critical: true },
        { name: "Pon timer 25 min", desc: "Pomodoro. Urgencia real.", time: "1 min", critical: true },
      ],
    },
  },
  "Pantallas": {
    deteccion: {
      solo_casa: [
        { name: "Móvil FUERA del despacho", desc: "Otro cuarto. Imposible.", time: "1 min", critical: true },
        { name: "Cierra navegador", desc: "Borra tabs tentadores.", time: "<5 min", critical: true },
      ],
    },
  },
  "Porros": {
    deteccion: {
      solo_casa: [
        { name: "Hielo en boca", desc: "Sensación sin sustancia. Quiebra.", time: "2 min", critical: true },
        { name: "Llama a Javier", desc: "'Tengo impulso'.", time: "5 min", critical: true },
      ],
    },
  },
  "Tabaco": {
    deteccion: {
      solo_casa: [
        { name: "Mint fuerte en boca", desc: "Menta potente.", time: "1 min", critical: true },
        { name: "Agua muy fría", desc: "Sorbo helado.", time: "2 min", critical: true },
      ],
    },
  },
  "Onicofagia": {
    deteccion: {
      solo_casa: [
        { name: "Bálsamo mentolado", desc: "Aroma + sabor. Aversión.", time: "inmediato", critical: true },
        { name: "Fidget toy", desc: "Pop it. Ocupación táctil.", time: "inmediato", critical: true },
      ],
    },
  },
};

export default function TabAlternatives({ state, updateState }) {
  const [habit, setHabit] = useState('');
  const [phase, setPhase] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');

  function getInterventions() {
    if (!habit || !phase || !company || !location) return [];
    const key = `${company}_${location}`;
    return INTERVENTIONS[habit]?.[phase]?.[key] || [];
  }

  const interventions = getInterventions();

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
            <option value="">← Selecciona</option>
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
              onClick={() => setPhase('deteccion')}
            >
              🔔 Impulso
            </button>
            <button 
              className={phase === 'cediendo' ? 'active' : ''} 
              onClick={() => setPhase('cediendo')}
            >
              ⚠️ Cediendo
            </button>
            <button 
              className={phase === 'despues' ? 'active' : ''} 
              onClick={() => setPhase('despues')}
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
              onClick={() => setCompany('solo')}
            >
              🚨 SOLO
            </button>
            <button 
              className={company === 'familia' ? 'active' : ''} 
              onClick={() => setCompany('familia')}
            >
              👨‍👩‍👧 Familia
            </button>
            <button 
              className={company === 'amigos' ? 'active' : ''} 
              onClick={() => setCompany('amigos')}
            >
              👥 Amigos
            </button>
            <button 
              className={company === 'maria' ? 'active' : ''} 
              onClick={() => setCompany('maria')}
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
              onClick={() => setLocation('casa')}
            >
              🏠 Casa
            </button>
            <button 
              className={location === 'trabajo' ? 'active' : ''} 
              onClick={() => setLocation('trabajo')}
            >
              💼 Trabajo
            </button>
            <button 
              className={location === 'calle' ? 'active' : ''} 
              onClick={() => setLocation('calle')}
            >
              🚶 Calle
            </button>
            <button 
              className={location === 'coche' ? 'active' : ''} 
              onClick={() => setLocation('coche')}
            >
              🚗 Coche
            </button>
          </div>
        </div>
      </div>

      <div className="interventions-list">
        {interventions.length === 0 ? (
          <div className="empty-interventions">
            Selecciona los filtros para ver intervenciones
          </div>
        ) : (
          interventions.map((intervention, i) => (
            <div key={i} className={`intervention-item ${intervention.critical ? 'critical' : ''}`}>
              <div className="intervention-name">{intervention.name}</div>
              <div className="intervention-desc">{intervention.desc}</div>
              <div className="intervention-time">⏱️ {intervention.time}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
