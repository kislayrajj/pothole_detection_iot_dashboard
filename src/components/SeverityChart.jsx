import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

const SeverityChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="glass-dark p-3 rounded-lg border border-gray-600 shadow-xl">
          <p className="text-white font-medium">{`${data.name}: ${data.value}`}</p>
          <p className="text-cyan-400 text-sm">{`${((data.value / data.payload.total) * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="glass-card p-4 sm:p-6 rounded-xl h-[200px] sm:h-[250px] md:h-[300px] hover-lift"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Reports by Severity</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={window.innerWidth < 640 ? 60 : 80}
            innerRadius={window.innerWidth < 640 ? 20 : 30}
            paddingAngle={2}
            animationBegin={0}
            animationDuration={800}
            label={window.innerWidth >= 640 ? ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%` : false}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.fill}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ color: '#e2e8f0', fontSize: window.innerWidth < 640 ? '12px' : '14px' }}
            iconType="circle"
            verticalAlign="bottom"
            height={window.innerWidth < 640 ? 36 : 36}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SeverityChart;