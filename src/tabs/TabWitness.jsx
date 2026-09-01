import React from 'react';

export default function TabWitness({ state }) {
  return (
    <div className="tab-witness">
      <div className="witness-header">
        <div className="witness-title">👶 Cartas del Testigo</div>
        <div className="witness-subtitle">Tu futuro hijo te habla</div>
      </div>

      <div className="witness-letters">
        {state.witnesses.length === 0 ? (
          <div className="empty-witness">
            <div className="empty-text">No hay cartas aún.</div>
            <div className="empty-hint">Completa un check-in para recibir una.</div>
          </div>
        ) : (
          state.witnesses.map(letter => (
            <div key={letter.id} className="letter">
              <div className="letter-date">{letter.date}</div>
              <div className="letter-text">"{letter.message}"</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
