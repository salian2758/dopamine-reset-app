import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import './App.css';
import Login from './Login';
import TabToday from './tabs/TabToday';
import TabSOS from './tabs/TabSOS';
import TabCheckIn from './tabs/TabCheckIn';
import TabWitness from './tabs/TabWitness';
import TabAlternatives from './tabs/TabAlternatives';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('today');
  const [appState, setAppState] = useState(null);

  // Escuchar cambios de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Cargar datos de Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setAppState(userDoc.data());
        } else {
          // Primer login: crear documento
          const initialState = getInitialState();
          await setDoc(userDocRef, initialState);
          setAppState(initialState);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

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

  async function updateAppState(updates) {
    if (!user) return;
    
    const newState = { ...appState, ...updates, lastUpdated: serverTimestamp() };
    setAppState(newState);
    
    try {
      await setDoc(doc(db, 'users', user.uid), newState, { merge: true });
    } catch (error) {
      console.error('Error saving to Firestore:', error);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      setUser(null);
      setAppState(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!user) {
    return <Login onLoginSuccess={() => {}} />;
  }

  if (!appState) {
    return <div className="loading">Inicializando...</div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-banner">
          <div className="header-title">🧒 Tu futuro hijo está mirando</div>
          <div className="header-subtitle">Capítulo {appState.chapter} • Salud Mental: {appState.mentalHealth}%</div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Salir</button>
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
