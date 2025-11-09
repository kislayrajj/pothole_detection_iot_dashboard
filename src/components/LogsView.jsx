import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import EventLog from './EventLog';

// --- ThingSpeak Config ---
const CHANNEL_ID = "3153910";
const READ_API_KEY = "2LEWSVNVA80RHV78";
const THINGSPEAK_URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=500`;

// Helper to get severity
const getSeverity = (magnitude) => {
  if (magnitude > 3.5) return 'Severe';
  if (magnitude > 2.8) return 'High';
  return 'Medium';
};

const LogsView = () => {
  const [loading, setLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(THINGSPEAK_URL);

        const processedEvents = response.data.feeds
          .filter(feed => feed.field1 && feed.field2 && feed.field3)
          .map(feed => ({
            id: feed.entry_id,
            magnitude: parseFloat(feed.field1),
            lat: parseFloat(feed.field2),
            lon: parseFloat(feed.field3),
            timestamp: new Date(feed.created_at),
            severity: getSeverity(parseFloat(feed.field1)),
          }))
          .sort((a, b) => b.timestamp - a.timestamp);

        setAllEvents(processedEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <h1>Loading Logs...</h1>
      </div>
    );
  }

  return (
    <div className="p-8 font-sans">
      <motion.h1
        className="text-4xl font-bold mb-8 text-cyan-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Event Logs
      </motion.h1>

      <motion.div
        className="bg-gray-800 rounded-lg p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <EventLog events={allEvents} />
      </motion.div>
    </div>
  );
};

export default LogsView;