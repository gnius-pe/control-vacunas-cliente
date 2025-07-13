import React, { useState, useEffect } from 'react';
import { Syringe } from 'lucide-react';
import { Paciente, Vacuna } from '../types';
import { obtenerPacientes, obtenerVacunas, registrarAplicacion } from '../services/api';

const AplicacionesView: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [vacunas, setVacunas] = useState<Vacuna[]>([]);
  const [formData, setFormData] = useState({
    paciente_id: '',
    vacuna_id: '',
    fecha_aplicacion: '',
    proxima_dosis: '',
    observaciones: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const [pacientesData, vacunasData] = await Promise.all([
      obtenerPacientes(),
      obtenerVacunas()
    ]);
    setPacientes(pacientesData);
    setVacunas(vacunasData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const aplicacionData = {
      paciente_id: parseInt(formData.paciente_id),
      vacuna_id: parseInt(formData.vacuna_id),
      fecha_aplicacion: formData.fecha_aplicacion,
      proxima_dosis: formData.proxima_dosis,
      observaciones: formData.observaciones
    };

    const success = await registrarAplicacion(aplicacionData);
    if (success) {
      setFormData({
        paciente_id: '',
        vacuna_id: '',
        fecha_aplicacion: '',
        proxima_dosis: '',
        observaciones: ''
      });
      alert('Aplicación de vacuna registrada exitosamente');
    } else {
      alert('Error al registrar aplicación de vacuna');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Aplicación de Vacunas</h1>
        <p className="text-gray-600">Registrar la aplicación de vacunas a pacientes</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Syringe className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">Nuevo Registro de Aplicación</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seleccionar Paciente
              </label>
              <select
                required
                value={formData.paciente_id}
                onChange={(e) => setFormData({ ...formData, paciente_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleccione un paciente</option>
                {pacientes.map((paciente) => (
                  <option key={paciente.id} value={paciente.id}>
                    {paciente.nombre} - DNI: {paciente.dni}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seleccionar Vacuna
              </label>
              <select
                required
                value={formData.vacuna_id}
                onChange={(e) => setFormData({ ...formData, vacuna_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleccione una vacuna</option>
                {vacunas.map((vacuna) => (
                  <option key={vacuna.id} value={vacuna.id}>
                    {vacuna.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Aplicación
              </label>
              <input
                type="date"
                required
                value={formData.fecha_aplicacion}
                onChange={(e) => setFormData({ ...formData, fecha_aplicacion: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Próxima Dosis
              </label>
              <input
                type="date"
                required
                value={formData.proxima_dosis}
                onChange={(e) => setFormData({ ...formData, proxima_dosis: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observaciones
            </label>
            <textarea
              value={formData.observaciones}
              onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
              placeholder="Observaciones adicionales..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !formData.paciente_id || !formData.vacuna_id}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registrando...' : 'Registrar Aplicación'}
            </button>
          </div>
        </form>
      </div>

      {(pacientes.length === 0 || vacunas.length === 0) && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Información requerida
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Para registrar aplicaciones de vacunas necesita tener:
                </p>
                <ul className="list-disc list-inside mt-1">
                  {pacientes.length === 0 && <li>Al menos un paciente registrado</li>}
                  {vacunas.length === 0 && <li>Al menos una vacuna registrada</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AplicacionesView;