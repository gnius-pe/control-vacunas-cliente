const API_BASE_URL = 'http://localhost:3000'; // Cambia esta URL según tu backend

import { Paciente, Vacuna, AplicacionVacuna, Alerta } from '../types';

// Pacientes
export const obtenerPacientes = async (): Promise<Paciente[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pacientes`);
    if (!response.ok) throw new Error('Error al obtener pacientes');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const registrarPaciente = async (paciente: Omit<Paciente, 'id'>): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pacientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paciente),
    });
    return response.ok;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

// Vacunas
export const obtenerVacunas = async (): Promise<Vacuna[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/vacunas`);
    if (!response.ok) throw new Error('Error al obtener vacunas');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const registrarVacuna = async (vacuna: Omit<Vacuna, 'id'>): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/vacunas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vacuna),
    });
    return response.ok;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

// Aplicaciones de vacunas
export const registrarAplicacion = async (aplicacion: Omit<AplicacionVacuna, 'id'>): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/aplicaciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aplicacion),
    });
    return response.ok;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

// Alertas
export const obtenerAlertas = async (): Promise<Alerta[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/alertas`);
    if (!response.ok) throw new Error('Error al obtener alertas');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};