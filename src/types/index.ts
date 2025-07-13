export interface Paciente {
  id?: number;
  nombre: string;
  dni: string;
  fecha_nacimiento: string;
  genero: 'M' | 'F' | 'Otro';
}

export interface Vacuna {
  id?: number;
  nombre: string;
  descripcion: string;
}

export interface AplicacionVacuna {
  id?: number;
  paciente_id: number;
  vacuna_id: number;
  fecha_aplicacion: string;
  proxima_dosis: string;
  observaciones: string;
}

export interface Alerta {
  id?: number;
  paciente: {
    id: number;
    nombre: string;
    dni: string;
  };
  vacuna: {
    id: number;
    nombre: string;
  };
  proxima_dosis: string;
}