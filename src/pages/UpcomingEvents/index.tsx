import axios from "axios";
import { useEffect, useState } from "react";
import UpcomingEventsTable from "../../components/Table/UpcomingEventsTable";

const UpcomingEvents = () => {
  const [events, setEvents] = useState<any[] | null>([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/google-calendar/fetch-active-events/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/google-calendar/delete-event/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <UpcomingEventsTable events={events} deleteEvent={deleteEvent} />
    </div>
  )
}

export default UpcomingEvents;