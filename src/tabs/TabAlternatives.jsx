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

const TOP_10_UNIVERSAL = [
  { name: "Paseo 5 minutos", desc: "Aire fresco. Reset neurológico.", time: "5 min", critical: true, habits: ["Pornografía", "Procrastinación", "Pantallas", "Porros", "Tabaco"] },
  { name: "Respiración 4-7-8", desc: "Inhala 4, sostén 7, exhala 8. Vagal reset.", time: "2 min", critical: true, habits: ["Pornografía", "Procrastinación", "Porros", "Tabaco"] },
  { name: "Escucha música", desc: "Dopamina limpia. Enfoque.", time: "3-5 min", critical: false, habits: ["Procrastinación", "Pantallas", "Porros"] },
  { name: "Agua fría en cara", desc: "Shock del sistema. Quiebra impulso.", time: "1 min", critical: true, habits: ["Pornografía", "Procrastinación", "Porros"] },
  { name: "Micro-tarea (2 min)", desc: "Acción inmediata. Momentum.", time: "2 min", critical: true, habits: ["Procrastinación", "Pantallas"] },
  { name: "Llama a accountability", desc: "'Tengo impulso'. Voz real.", time: "5 min", critical: true, habits: ["Pornografía", "Porros"] },
  { name: "Cambiar de cuarto", desc: "Rompe contexto. Nuevo circuito.", time: "1 min", critical: true, habits: ["Pornografía", "Pantallas", "Porros"] },
  { name: "Estiramiento/ejercicio", desc: "Movimiento. Descarga tensión.", time: "3-5 min", critical: false, habits: ["Procrastinación", "Pantallas", "Porros", "Tabaco"] },
  { name: "Journaling rápido", desc: "Escribe impulso. Comprende trigger.", time: "3 min", critical: false, habits: ["Pornografía", "Procrastinación"] },
  { name: "Bebe agua", desc: "Hidratación. Reset metabólico.", time: "1 min", critical: false, habits: ["Procrastinación", "Pantallas", "Tabaco"] },
];

export default function TabAlternatives({ state, updateState, selectedHabit = '' }) {
  const [habit, setHabit] = useState(selectedHabit || '');
  const [phase, setPhase] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');

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
