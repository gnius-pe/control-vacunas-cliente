import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import PacientesView from './components/PacientesView';
import VacunasView from './components/VacunasView';
import AplicacionesView from './components/AplicacionesView';
import AlertasView from './components/AlertasView';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onViewChange={setCurrentView} />;
      case 'pacientes':
        return <PacientesView />;
      case 'vacunas':
        return <VacunasView />;
      case 'aplicaciones':
        return <AplicacionesView />;
      case 'alertas':
        return <AlertasView />;
      default:
        return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main>
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;