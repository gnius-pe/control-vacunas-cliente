import React from 'react';
import { Users, Shield, Syringe, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  onViewChange: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const cards = [
    {
      title: 'Pacientes Registrados',
      description: 'Gestionar información de pacientes',
      icon: Users,
      color: 'bg-blue-500',
      view: 'pacientes'
    },
    {
      title: 'Vacunas Disponibles',
      description: 'Administrar catálogo de vacunas',
      icon: Shield,
      color: 'bg-green-500',
      view: 'vacunas'
    },
    {
      title: 'Aplicar Vacunas',
      description: 'Registrar aplicación de vacunas',
      icon: Syringe,
      color: 'bg-purple-500',
      view: 'aplicaciones'
    },
    {
      title: 'Alertas de Vacunas',
      description: 'Ver vacunas vencidas o por vencer',
      icon: AlertTriangle,
      color: 'bg-red-500',
      view: 'alertas'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Sistema de control y seguimiento de vacunación</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => onViewChange(card.view)}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Información del Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">24/7</div>
            <div className="text-sm text-gray-600">Monitoreo continuo</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-sm text-gray-600">Seguridad de datos</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">API</div>
            <div className="text-sm text-gray-600">Integración completa</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;