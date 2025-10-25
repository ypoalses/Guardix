import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useWebSocket } from './hooks/useWebSocket';
import { useTheme } from './hooks/useTheme';
import { Splash } from './pages/Splash';
import { Auth } from './pages/Auth';
import { WelcomeTour } from './pages/WelcomeTour';
import { Home } from './pages/Home';
import { ManagePets } from './pages/ManagePets';
import { ManagePet } from './pages/ManagePet';
import { PendingTags } from './pages/PendingTags';
import { ScanHistory } from './pages/ScanHistory';
import { Settings } from './pages/Settings';
import { AdminDashboard } from './pages/AdminDashboard';
import { PublicScan } from './pages/PublicScan';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

function App() {
  useWebSocket();
  useTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/welcome-tour" element={<PrivateRoute><WelcomeTour /></PrivateRoute>} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/pets" element={<PrivateRoute><ManagePets /></PrivateRoute>} />
        <Route path="/pets/:id" element={<PrivateRoute><ManagePet /></PrivateRoute>} />
        <Route path="/tags" element={<PrivateRoute><PendingTags /></PrivateRoute>} />
        <Route path="/scan-history" element={<PrivateRoute><ScanHistory /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/scan/:tagId" element={<PublicScan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
