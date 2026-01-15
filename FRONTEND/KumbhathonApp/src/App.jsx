import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import HostDashboard from './pages/HostDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Simple routing based on URL hash
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'home');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentPage === 'dashboard') {
    return <HostDashboard />;
  }

  return <LandingPage />;
}

export default App;
