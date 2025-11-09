import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import MapView from './components/MapView';
import ChartsView from './components/ChartsView';
import LogsView from './components/LogsView';
import SettingsView from './components/SettingsView';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64 ml-0 transition-all duration-300">
          <Routes>
            <Route path="/" element={<DashboardView />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/charts" element={<ChartsView />} />
            <Route path="/logs" element={<LogsView />} />
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;