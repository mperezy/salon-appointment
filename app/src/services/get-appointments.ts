import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URI;

export default async (params?: Record<string, string | number>): Promise<Appointment[]> => {
  try {
    const response = await axios.get<Appointment[]>(`${API_URL}/appointments`, {
      params,
    });

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error({ error });
    throw new Error('Could not get appointments');
  }
};
