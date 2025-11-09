import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import StatCard from './StatCard';
import PotholeMap from './PotholeMap';
import SeverityChart from './SeverityChart';
import TimelineChart from './TimelineChart';
import EventLog from './EventLog';
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

const DashboardView = () => {
  const [loading, setLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    last24h: 0,
    avgSeverity: 0,
  });
  const [chartData, setChartData] = useState({
    severity: [],
    timeline: [],
  });

  // Data fetching and processing
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(THINGSPEAK_URL);

        // --- 1. Process Raw Feeds ---
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

        // --- 2. Calculate KPIs ---
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const reportsLast24h = processedEvents.filter(e => e.timestamp > oneDayAgo).length;
        const totalMag = processedEvents.reduce((sum, e) => sum + e.magnitude, 0);

        setStats({
          total: processedEvents.length,
          last24h: reportsLast24h,
          avgSeverity: processedEvents.length ? (totalMag / processedEvents.length).toFixed(2) : 0,
        });

        // --- 3. Calculate Chart Data ---
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
        <h1>Loading Dashboard...</h1>
      </div>
    );
  }

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' } },
  };

  return (
    <div className="p-2 md:p-4 lg:p-8 font-sans">
      <motion.h1
        className="text-4xl font-bold mb-8 text-cyan-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Pothole Analytics Dashboard
      </motion.h1>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-3 md:gap-4 lg:gap-6">
        {/* KPIs */}
        <motion.div variants={itemVariant} initial="hidden" animate="visible" className="col-span-12 md:col-span-6 lg:col-span-3">
          <StatCard title="Total Reports" value={stats.total} />
        </motion.div>
        <motion.div variants={itemVariant} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="col-span-12 md:col-span-6 lg:col-span-3">
          <StatCard title="Reports (Last 24h)" value={stats.last24h} />
        </motion.div>
        <motion.div variants={itemVariant} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="col-span-12 md:col-span-6 lg:col-span-3">
          <StatCard title="Avg. Severity (G)" value={stats.avgSeverity} />
        </motion.div>
        <motion.div variants={itemVariant} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="col-span-12 md:col-span-6 lg:col-span-3">
          {/* <StatCard title="Worst Area (Example)" value="Sector 15" /> */}
        </motion.div>

        {/* Map */}
        <motion.div
          variants={itemVariant} initial="hidden" animate="visible" transition={{ delay: 0.4 }}
          className="col-span-12 lg:col-span-8 min-h-[250px] sm:min-h-[350px] md:min-h-[450px] lg:min-h-[500px]"
        >
          <PotholeMap events={allEvents} />
        </motion.div>

        {/* Severity Chart */}
        <motion.div
          variants={itemVariant} initial="hidden" animate="visible" transition={{ delay: 0.5 }}
          className="col-span-12 lg:col-span-4"
        >
          <SeverityChart data={chartData.severity} />
        </motion.div>

        {/* Timeline Chart */}
        <motion.div
          variants={itemVariant} initial="hidden" animate="visible" transition={{ delay: 0.6 }}
          className="col-span-12 lg:col-span-8"
        >
          <TimelineChart data={chartData.timeline} />
        </motion.div>

        {/* Event Log */}
        <motion.div
          variants={itemVariant} initial="hidden" animate="visible" transition={{ delay: 0.7 }}
          className="col-span-12 lg:col-span-4"
        >
          <EventLog events={allEvents.slice(0, 10)} />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardView;