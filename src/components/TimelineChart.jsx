import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const TimelineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-dark p-3 rounded-lg border border-gray-600 shadow-xl">
          <p className="text-cyan-400 font-medium">{`Date: ${label}`}</p>
          <p className="text-white">{`Reports: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="glass-card p-4 sm:p-6 rounded-xl h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] hover-lift"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Reports Over Time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: window.innerWidth < 640 ? 10 : 20, left: window.innerWidth < 640 ? -10 : -20, bottom: 5 }}
          barCategoryGap={window.innerWidth < 640 ? "10%" : "20%"}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.1)"
            opacity={0.3}
          />
          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            fontSize={window.innerWidth < 640 ? 10 : 12}
            tick={{ fill: '#94a3b8' }}
            interval={window.innerWidth < 640 ? 1 : 0}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={window.innerWidth < 640 ? 10 : 12}
            tick={{ fill: '#94a3b8' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="count"
            fill="url(#barGradient)"
            radius={[4, 4, 0, 0]}
            animationBegin={200}
            animationDuration={1000}
          />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default TimelineChart;