import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default async (data: AppointmentUpdateForm): Promise<AppointmentUpdateForm> => {
  try {
    const response = await axios.patch<AppointmentUpdateForm>(`${API_URL}/appointments`, data);

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error({ error });
    throw new Error('Could not get appointments');
  }
};
