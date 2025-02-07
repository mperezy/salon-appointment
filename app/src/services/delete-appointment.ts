import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default async (appointmentId: number): Promise<void> => {
  try {
    await axios.delete<{ id: number }>(`${API_URL}/appointments`, {
      params: {
        id: appointmentId,
      },
    });

    return;
  } catch (error) {
    console.error({ error });
    throw new Error('Could not get appointments');
  }
};
