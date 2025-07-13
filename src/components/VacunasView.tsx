import React, { useState, useEffect } from 'react';
import { Shield, Plus } from 'lucide-react';
import { Vacuna } from '../types';
import { obtenerVacunas, registrarVacuna } from '../services/api';

const VacunasView: React.FC = () => {
  const [vacunas, setVacunas] = useState<Vacuna[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarVacunas();
  }, []);

  const cargarVacunas = async () => {
    const data = await obtenerVacunas();
    setVacunas(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const success = await registrarVacuna(formData);
    if (success) {
      setFormData({ nombre: '', descripcion: '' });
      setShowForm(false);
      cargarVacunas();
      alert('Vacuna registrada exitosamente');
    } else {
      alert('Error al registrar vacuna');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Vacunas</h1>
          <p className="text-gray-600">Administrar catálogo de vacunas disponibles</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nueva Vacuna</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Registrar Nueva Vacuna</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Vacuna
              </label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ej: COVID-19, Hepatitis B, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                required
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
                placeholder="Descripción detallada de la vacuna..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Registrando...' : 'Registrar Vacuna'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Catálogo de Vacunas</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {vacunas.map((vacuna) => (
            <div key={vacuna.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">{vacuna.nombre}</h3>
              </div>
              <p className="text-gray-600 text-sm">{vacuna.descripcion}</p>
            </div>
          ))}
          {vacunas.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No hay vacunas registradas
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VacunasView;