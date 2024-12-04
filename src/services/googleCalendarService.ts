import axios from 'axios';

export const connectGoogleCalendar = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/google-calendar/auth/`);
    if (response.status === 200) {
      window.location.href = response.data;
    }
  } catch (error) {
    console.error("Error connecting Google Calendar:", error);
    throw error;
  }
};
