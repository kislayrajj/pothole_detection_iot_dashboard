import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  MapIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Map', href: '/map', icon: MapIcon },
  { name: 'Charts', href: '/charts', icon: ChartBarIcon },
  { name: 'Logs', href: '/logs', icon: DocumentTextIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile hamburger menu */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <motion.button
          onClick={toggleMobileSidebar}
          className=" text-white p-4 rounded-xl hover-lift focus-ring border border-white/10 bg-black/50"
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle mobile menu"
        >
          <motion.div
            animate={{ rotate: isMobileOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isMobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </motion.div>
        </motion.button>
      </div>

      {/* Sidebar */}
      <motion.div
        className={`fixed left-0 top-0 h-full text-white shadow-2xl z-50 transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)'
        }}
        initial={false}
        animate={{ width: isCollapsed ? 64 : 256 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-2 md:p-4 border-b border-white/10 bg-white/5">
          {!isCollapsed && (
            <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
              Pothole Dashboard
            </h2>
          )}
          <button
            onClick={toggleSidebar}
            className="hidden lg:block text-gray-400 hover:text-cyan-400 transition-colors focus-ring rounded-md p-1"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <Bars3Icon className="h-6 w-6" />
            ) : (
              <XMarkIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 md:mt-8">
          <ul className="space-y-1 md:space-y-2 px-1 md:px-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center px-2 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-200 focus-ring group ${
                      isActive
                        ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white hover:border-white/10 border border-transparent'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <item.icon className={`h-5 w-5 md:h-6 md:w-6 flex-shrink-0 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'
                    }`} />
                    {!isCollapsed && (
                      <span className="ml-2 md:ml-3 font-medium text-sm md:text-base">{item.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </motion.div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </>
  );
};

export default Sidebar;