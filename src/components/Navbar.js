import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, LineChart, History, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem', background: '#2c3e50', color: 'white' }}>
      <Link to="/" style={navStyle}><LayoutDashboard size={20}/> Dashboard</Link>
      <Link to="/market" style={navStyle}><LineChart size={20}/> Marché</Link>
      <Link to="/history" style={navStyle}><History size={20}/> Historique</Link>
      <Link to="/profile" style={navStyle}><User size={20}/> Profil</Link>
    </nav>
  );
};

const navStyle = { color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' };

export default Navbar;