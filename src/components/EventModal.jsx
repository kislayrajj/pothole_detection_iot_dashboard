import { AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const EventModal = ({ event, isOpen, onClose }) => {
  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="glass-card rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto custom-scrollbar border border-white/20">
            <div className="p-4 sm:p-8">
              <div className="flex items-center justify-between mb-4 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                  Event Details
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-cyan-400 transition-colors focus-ring rounded-lg p-2"
                  aria-label="Close modal"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="glass-dark p-3 sm:p-4 rounded-xl border border-white/10">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Event ID
                  </label>
                  <p className="text-cyan-400 font-mono text-base sm:text-lg font-semibold">
                    {event.id}
                  </p>
                </div>

                <div className="glass-dark p-3 sm:p-4 rounded-xl border border-white/10">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Magnitude
                  </label>
                  <p className="text-white font-bold text-xl sm:text-2xl text-cyan-400">
                    {event.magnitude.toFixed(2)} <span className="text-base sm:text-lg text-gray-400">G</span>
                  </p>
                </div>

                <div className="glass-dark p-3 sm:p-4 rounded-xl border border-white/10">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Severity
                  </label>
                  <span className={`inline-flex items-center px-3 sm:px-4 py-2 rounded-full text-sm font-bold border-2 ${
                    event.severity === 'Severe' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                    event.severity === 'High' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                    'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  }`}>
                    {event.severity}
                  </span>
                </div>

                <div className="glass-dark p-3 sm:p-4 rounded-xl border border-white/10">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <div className="text-white space-y-1">
                    <p><span className="text-cyan-400">Latitude:</span> {event.lat.toFixed(6)}</p>
                    <p><span className="text-cyan-400">Longitude:</span> {event.lon.toFixed(6)}</p>
                  </div>
                </div>

                <div className="glass-dark p-3 sm:p-4 rounded-xl border border-white/10">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date & Time
                  </label>
                  <p className="text-white font-medium text-sm sm:text-base">
                    {event.timestamp.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </p>
                </div>

                <div className="glass-dark p-3 sm:p-4 rounded-xl border border-white/10">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Timestamp (UTC)
                  </label>
                  <p className="text-gray-400 font-mono text-sm">
                    {event.timestamp.toISOString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventModal;