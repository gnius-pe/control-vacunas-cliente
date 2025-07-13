import React, { useState, useEffect } from 'react';
import { AlertTriangle, Calendar, User, Shield } from 'lucide-react';
import { Alerta } from '../types';
import { obtenerAlertas } from '../services/api';

const AlertasView: React.FC = () => {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarAlertas();
  }, []);

  const cargarAlertas = async () => {
    setLoading(true);
    const data = await obtenerAlertas();
    setAlertas(data);
    setLoading(false);
  };

  const isVencida = (fecha: string): boolean => {
    const hoy = new Date();
    const fechaDosis = new Date(fecha);
    return fechaDosis < hoy;
  };

  const isHoy = (fecha: string): boolean => {
    const hoy = new Date();
    const fechaDosis = new Date(fecha);
    return (
      fechaDosis.getDate() === hoy.getDate() &&
      fechaDosis.getMonth() === hoy.getMonth() &&
      fechaDosis.getFullYear() === hoy.getFullYear()
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const getRowClass = (fecha: string): string => {
    if (isVencida(fecha)) {
      return 'bg-red-50 border-l-4 border-red-500';
    } else if (isHoy(fecha)) {
      return 'bg-yellow-50 border-l-4 border-yellow-500';
    }
    return 'hover:bg-gray-50';
  };

  const getStatusBadge = (fecha: string) => {
    if (isVencida(fecha)) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Vencida
        </span>
      );
    } else if (isHoy(fecha)) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Hoy
        </span>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Alertas de Vacunas</h1>
          <p className="text-gray-600">Seguimiento de vacunas vencidas y próximas aplicaciones</p>
        </div>
        <button
          onClick={cargarAlertas}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <AlertTriangle className="h-4 w-4" />
          <span>Actualizar Alertas</span>
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-500">Cargando alertas...</div>
        </div>
      ) : (
        <>
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div className="ml-3">
                  <p className="text-2xl font-bold text-red-600">
                    {alertas.filter(a => isVencida(a.proxima_dosis)).length}
                  </p>
                  <p className="text-sm text-red-700">Vacunas Vencidas</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-2xl font-bold text-yellow-600">
                    {alertas.filter(a => isHoy(a.proxima_dosis)).length}
                  </p>
                  <p className="text-sm text-yellow-700">Para Hoy</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-2xl font-bold text-blue-600">{alertas.length}</p>
                  <p className="text-sm text-blue-700">Total Alertas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de alertas */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-900">Lista de Alertas</h2>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paciente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DNI
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vacuna
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Próxima Dosis
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {alertas.map((alerta) => (
                    <tr key={`${alerta.paciente.id}-${alerta.vacuna.id}`} className={getRowClass(alerta.proxima_dosis)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(alerta.proxima_dosis)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {alerta.paciente.nombre}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {alerta.paciente.dni}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {alerta.vacuna.nombre}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(alerta.proxima_dosis)}
                      </td>
                    </tr>
                  ))}
                  {alertas.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <Shield className="h-12 w-12 text-gray-300 mb-2" />
                          <p>No hay alertas de vacunas pendientes</p>
                          <p className="text-sm">Todas las vacunas están al día</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {alertas.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Información sobre las alertas
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc list-inside">
                      <li>Las filas en <span className="font-medium text-red-700">rojo</span> indican vacunas vencidas</li>
                      <li>Las filas en <span className="font-medium text-yellow-700">amarillo</span> indican vacunas programadas para hoy</li>
                      <li>Contacte a los pacientes para programar las dosis pendientes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AlertasView;