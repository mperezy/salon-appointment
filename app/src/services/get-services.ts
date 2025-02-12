import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default async (): Promise<Service[]> => {
  try {
    const response = await axios.get<Service[]>(`${API_URL}/services`);

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error({ error });
    throw new Error('Could not get appointments');
  }
};
