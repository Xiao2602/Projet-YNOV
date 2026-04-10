import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Market from './pages/Market';
import History from './pages/History';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Composant pour gérer l'affichage conditionnel de la Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  const authRoutes = ['/', '/signup']; // Pages sans Navbar
  const showNavbar = !authRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <main style={{ padding: showNavbar ? '20px' : '0' }}>
        {children}
      </main>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/market" element={<Market />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;