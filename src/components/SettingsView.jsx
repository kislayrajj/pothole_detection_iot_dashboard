
import { motion } from 'framer-motion';

const SettingsView = () => {
  return (
    <div className="p-8 font-sans">
      <motion.h1
        className="text-4xl font-bold mb-8 text-cyan-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Settings
      </motion.h1>

      <motion.div
        className="bg-gray-800 rounded-lg p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Application Settings</h2>
            <p className="text-gray-300">
              Settings panel for configuring the pothole detection dashboard.
              This section can be expanded with various configuration options.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-white mb-2">Data Source</h3>
            <p className="text-gray-400 text-sm">
              Currently configured to use ThingSpeak Channel ID: 3153910
            </p>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-white mb-2">Refresh Interval</h3>
            <p className="text-gray-400 text-sm">
              Data refreshes every 60 seconds
            </p>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-white mb-2">Theme</h3>
            <p className="text-gray-400 text-sm">
              Dark theme with cyan accents
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsView;