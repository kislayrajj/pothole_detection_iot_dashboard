import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import SeverityChart from './SeverityChart';
import TimelineChart from './TimelineChart';
import { format } from 'date-fns';

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

const ChartsView = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({
    severity: [],
    timeline: [],
  });

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

        // Calculate Chart Data
        const severityCounts = { Severe: 0, High: 0, Medium: 0 };
        const timelineCounts = {};

        processedEvents.forEach(event => {
          severityCounts[event.severity]++;

          const dateKey = format(event.timestamp, 'MMM dd');
          if (timelineCounts[dateKey]) {
            timelineCounts[dateKey]++;
          } else {
            timelineCounts[dateKey] = 1;
          }
        });

        setChartData({
          severity: [
            { name: 'Severe', count: severityCounts.Severe, fill: '#ef4444' },
            { name: 'High', count: severityCounts.High, fill: '#f97316' },
            { name: 'Medium', count: severityCounts.Medium, fill: '#eab308' },
          ],
          timeline: Object.keys(timelineCounts)
            .map(date => ({ date, count: timelineCounts[date] }))
            .reverse(),
        });

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
        <h1>Loading Charts...</h1>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-4 lg:p-8 font-sans">
      <motion.h1
        className="text-4xl font-bold mb-8 text-cyan-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Analytics Charts
      </motion.h1>

      <div className="grid grid-cols-12 gap-3 md:gap-4 lg:gap-6">
        {/* Severity Chart */}
        <motion.div
          className="col-span-12 lg:col-span-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SeverityChart data={chartData.severity} />
        </motion.div>

        {/* Timeline Chart */}
        <motion.div
          className="col-span-12 lg:col-span-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TimelineChart data={chartData.timeline} />
        </motion.div>
      </div>
    </div>
  );
};

export default ChartsView;