import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default async (data: AppointmentForm): Promise<Appointment> => {
  try {
    const response = await axios.post<Appointment>(`${API_URL}/appointments`, data);

    return response.data;
  } catch (error) {
    console.error({ error });
    throw new Error('Could not get appointments');
  }
};
