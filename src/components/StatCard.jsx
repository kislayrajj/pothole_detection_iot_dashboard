
import { motion } from 'framer-motion';

const StatCard = ({ title, value }) => {
  return (
    <motion.div
      className="glass-card p-3 md:p-4 lg:p-6 rounded-xl hover-lift focus-ring cursor-pointer"
      whileHover={{
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      tabIndex={0}
      role="button"
      aria-label={`${title}: ${value}`}
    >
      <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">{title}</h3>
      <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-3 leading-tight">{value}</p>
    </motion.div>
  );
};

export default StatCard;