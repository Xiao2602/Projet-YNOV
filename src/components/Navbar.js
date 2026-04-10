import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, BarChart2, History, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Marché', path: '/market', icon: <BarChart2 size={18} /> },
    { name: 'Historique', path: '/history', icon: <History size={18} /> },
    { name: 'Profil', path: '/profile', icon: <User size={18} /> },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>Invest<span style={{color: '#3498db'}}>X</span></div>
      
      <div style={styles.menu}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} style={styles.linkContainer}>
              <div style={{...styles.link, color: isActive ? '#3498db' : '#ecf0f1'}}>
                {item.icon}
                {item.name}
              </div>
              {/* Le petit trait indicateur */}
              {isActive && <div style={styles.activeIndicator} />}
            </Link>
          );
        })}
      </div>

      <button onClick={() => navigate('/')} style={styles.logoutBtn}>
        <LogOut size={18} />
        <span>Déconnexion</span>
      </button>
    </nav>
  );
};

const styles = {
  nav: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '0 30px', 
    background: '#2c3e50', 
    height: '70px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
  },
  logo: { color: 'white', fontSize: '22px', fontWeight: 'bold', cursor: 'pointer' },
  menu: { display: 'flex', gap: '30px', height: '100%' },
  linkContainer: { 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    textDecoration: 'none', 
    position: 'relative',
    height: '100%'
  },
  link: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px', 
    fontSize: '15px', 
    fontWeight: '500',
    transition: 'color 0.3s'
  },
  activeIndicator: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    height: '3px', 
    background: '#3498db', 
    borderRadius: '3px 3px 0 0' 
  },
  logoutBtn: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px', 
    background: 'transparent', 
    color: '#e74c3c', 
    border: '1px solid #e74c3c', 
    padding: '8px 15px', 
    borderRadius: '6px', 
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s'
  }
};

export default Navbar;