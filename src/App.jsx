import React, { useState, useEffect } from 'react';
import './App.css';
import TabToday from './tabs/TabToday';
import TabSOS from './tabs/TabSOS';
import TabCheckIn from './tabs/TabCheckIn';
import TabWitness from './tabs/TabWitness';
import TabAlternatives from './tabs/TabAlternatives';

export default function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [appState, setAppState] = useState(() => {
    const saved = localStorage.getItem('dopamine-reset-state');
    return saved ? JSON.parse(saved) : getInitialState();
  });

  function getInitialState() {
    return {
      totalPoints: 0,
      chapter: 'I',
      mentalHealth: 50,
      dailyTasks: [
        { id: 1, text: 'Tarea 1', done: false },
        { id: 2, text: 'Tarea 2', done: false },
        { id: 3, text: 'Tarea 3', done: false },
      ],
      habits: {
        pornografia: { level: 1, xp: 0, xpRequired: 100, streak: 0, multiplier: 1.0 },
        procrastinacion: { level: 1, xp: 0, xpRequired: 100, streak: 0, multiplier: 1.0 },
        pantallas: { level: 1, xp: 0, xpRequired: 100, streak: 0, multiplier: 1.0 },
        porros: { level: 1, xp: 0, xpRequired: 100, streak: 0, multiplier: 1.0 },
        tabaco: { level: 1, xp: 0, xpRequired: 100, streak: 0, multiplier: 1.0 },
        onicofagia: { level: 1, xp: 0, xpRequired: 100, streak: 0, multiplier: 1.0 },
      },
      witnesses: [],
      lastCheckIn: null,
      healthHistory: [],
    };
  }

  useEffect(() => {
    localStorage.setItem('dopamine-reset-state', JSON.stringify(appState));
  }, [appState]);

  function updateAppState(updates) {
    setAppState(prev => ({
      ...prev,
      ...updates,
    }));
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-banner">
          <div className="header-title">🧒 Tu futuro hijo está mirando</div>
          <div className="header-subtitle">Capítulo {appState.chapter} • Salud Mental: {appState.mentalHealth}%</div>
        </div>
      </header>

      <main className="app-main">
        {activeTab === 'today' && <TabToday state={appState} updateState={updateAppState} />}
        {activeTab === 'sos' && <TabSOS state={appState} updateState={updateAppState} />}
        {activeTab === 'checkin' && <TabCheckIn state={appState} updateState={updateAppState} />}
        {activeTab === 'witness' && <TabWitness state={appState} />}
        {activeTab === 'alternatives' && <TabAlternatives state={appState} updateState={updateAppState} />}
      </main>

      <nav className="app-tabs">
        <button className={`tab ${activeTab === 'today' ? 'active' : ''}`} onClick={() => setActiveTab('today')}>
          📅 Hoy
        </button>
        <button className={`tab ${activeTab === 'sos' ? 'active' : ''}`} onClick={() => setActiveTab('sos')}>
          🆘 SOS
        </button>
        <button className={`tab ${activeTab === 'checkin' ? 'active' : ''}`} onClick={() => setActiveTab('checkin')}>
          📋 Check-in
        </button>
        <button className={`tab ${activeTab === 'witness' ? 'active' : ''}`} onClick={() => setActiveTab('witness')}>
          👶 Testigo
        </button>
        <button className={`tab ${activeTab === 'alternatives' ? 'active' : ''}`} onClick={() => setActiveTab('alternatives')}>
          🎯 Alternativas
        </button>
      </nav>
    </div>
  );
}
