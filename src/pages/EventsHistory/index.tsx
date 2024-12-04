import axios from 'axios';
import { useState, useEffect } from "react";
import EventsHistoryTable from "../../components/Table/EventsHistoryTable";
import HistoryDetailView from '../../components/Modal/HistoryDetailView';
import Chatbot from '../../components/Modal/Chatbot';

const EventsHistory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isHistoryDlgOpen, setHistoryDlgOpen] = useState<boolean>(false);
  const [isChatbotDlgOpen, setChatbotDlgOpen] = useState<boolean>(false);
  const [events, setEvents] = useState<any[] | null>([]);
  const [chatHistories, setChatHistories] = useState<any[] | null>([]);
  const [vectorStoreId, setVectorStoreId] = useState<string>('');

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/google-calendar/fetch-finished-events/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  const fetchEvent = async (order_id: string) => {
    setLoading(true);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/google-calendar/fetch-transcription/`, {
      orderId: order_id
    });
    setChatHistories(response.data.content);
    setLoading(false);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <EventsHistoryTable
        events={events}
        onDetailView={(order_id: string) => {
          setHistoryDlgOpen(true);
          fetchEvent(order_id);
        }}
        onChat={(vectorStoreId: string) => {
          setChatbotDlgOpen(true);
          setVectorStoreId(vectorStoreId);
        }}
      />
      <HistoryDetailView
        open={isHistoryDlgOpen}
        onClose={() => { setHistoryDlgOpen(false) }}
        loading={loading}
        chatHistories={chatHistories} />
      <Chatbot
        open={isChatbotDlgOpen}
        onClose={() => { setChatbotDlgOpen(false) }}
        vectorStoreId={vectorStoreId}
      />
    </>
  )
}

export default EventsHistory;