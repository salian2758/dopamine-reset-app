import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getHeaderMessage } from './messages';
import { shouldApplyDefaultFailure, applyDefaultFailure } from './checkInManager';
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
  const [selectedHabitForAlternatives, setSelectedHabitForAlternatives] = useState(null);
  const [headerMessage, setHeaderMessage] = useState('🧒 Tu futuro hijo está mirando');

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

  // Actualizar mensaje del header cuando cambia el capítulo
  useEffect(() => {
    if (appState) {
      const chapterNum = parseInt(appState.chapter) || 1;
      setHeaderMessage(getHeaderMessage(chapterNum));
    }
  }, [appState?.chapter]);

  // Verificar si necesita penalización por no hacer check-in
  useEffect(() => {
    if (appState && user && !loading) {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const lastCheckInDate = appState.lastCheckIn 
        ? new Date(appState.lastCheckIn).toISOString().split('T')[0]
        : null;
      
      // Si el último check-in NO fue hoy Y no hay dailyCheckIn actual
      if (lastCheckInDate !== today && !appState.dailyCheckIn) {
        // Aplicar penalizaciones automáticas por no hacer check-in ayer
        const penalizedState = applyDefaultFailure(appState);
        
        // Resetear dailyCheckIn para hoy
        const updatedState = {
          ...appState,
          ...penalizedState,
          dailyCheckIn: null,
        };
        
        // Guardar en Firestore
        const userDocRef = doc(db, 'users', user.uid);
        setDoc(userDocRef, updatedState);
        
        // Actualizar estado local
        setAppState(updatedState);
      }
    }
  }, [user?.uid, loading]);

  function getInitialState() {
    return {
      totalPoints: 0,
      chapter: 'I',
      mentalHealth: 50,
      dailyTasks: [
        { id: 1, name: 'Tarea 1', done: false },
        { id: 2, name: 'Tarea 2', done: false },
        { id: 3, name: 'Tarea 3', done: false },
      ],
      dailyCheckIn: null, // Check-in progresivo del día
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

  function handleNavigateToTab(tab, habit = null) {
    setSelectedHabitForAlternatives(habit);
    setActiveTab(tab);
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
          <div className="header-logo-section">
            <img src="/logo.svg" alt="Dopamine Reset Logo" className="header-logo" />
            <div className="header-text-wrapper">
              <div className="header-title">{headerMessage}</div>
              <div className="header-subtitle">Capítulo {appState.chapter} • Salud Mental: {appState.mentalHealth}%</div>
            </div>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Salir</button>
      </header>

      <main className="app-main">
        {activeTab === 'today' && <TabToday state={appState} updateState={updateAppState} onNavigateToTab={handleNavigateToTab} />}
        {activeTab === 'sos' && <TabSOS state={appState} updateState={updateAppState} />}
        {activeTab === 'checkin' && <TabCheckIn state={appState} updateState={updateAppState} />}
        {activeTab === 'witness' && <TabWitness state={appState} />}
        {activeTab === 'alternatives' && <TabAlternatives state={appState} updateState={updateAppState} selectedHabit={selectedHabitForAlternatives} />}
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
