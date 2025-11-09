import { useState } from 'react';
import EventModal from './EventModal';
import { motion } from 'framer-motion';

const getSeverityStyles = (severity) => {
  switch (severity) {
    case 'Severe':
      return {
        border: 'border-red-500',
        bg: 'bg-red-500/10',
        text: 'text-red-400',
        glow: 'shadow-red-500/20'
      };
    case 'High':
      return {
        border: 'border-orange-500',
        bg: 'bg-orange-500/10',
        text: 'text-orange-400',
        glow: 'shadow-orange-500/20'
      };
    default:
      return {
        border: 'border-yellow-500',
        bg: 'bg-yellow-500/10',
        text: 'text-yellow-400',
        glow: 'shadow-yellow-500/20'
      };
  }
};

const EventLog = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="glass-card p-6 rounded-xl h-[400px] overflow-y-auto custom-scrollbar hover-lift">
        <h3 className="text-lg font-semibold text-white mb-6">Actionable Log (Top 10)</h3>
        <ul className="space-y-3">
          {events.map((event, index) => {
            const styles = getSeverityStyles(event.severity);
            return (
              <motion.li
                key={event.id}
                className={`flex items-center justify-between p-4 ${styles.bg} rounded-lg border-l-4 ${styles.border} cursor-pointer hover-lift focus-ring transition-all duration-200 shadow-lg ${styles.glow}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                onClick={() => handleEventClick(event)}
                tabIndex={0}
                role="button"
                aria-label={`Event ${event.id}: ${event.severity} severity, magnitude ${event.magnitude.toFixed(2)} G`}
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-white mb-1">
                    Impact: <span className="font-bold text-cyan-400">{event.magnitude.toFixed(2)} G</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    {event.timestamp.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${styles.bg} ${styles.text} border border-current/20`}>
                    {event.severity}
                  </span>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default EventLog;