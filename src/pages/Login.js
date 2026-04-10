import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Connexion InvestX</h2>
        <p style={styles.subtitle}>Accédez à vos marchés</p>
        
        {error && <div style={styles.errorBanner}>{error}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input 
              type="email" 
              style={styles.input} 
              onChange={(e) => {setEmail(e.target.value); setError('');}}
              placeholder="ex: votre@email.com"/>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mot de passe</label>
            <input 
              type="password" 
              style={styles.input} 
              onChange={(e) => {setPassword(e.target.value); setError('');}}
              placeholder="Insérer votre mot de passe"
            />
          </div>

          <button type="submit" className="btn-hover" style={styles.button}>Se connecter</button>
        </form>
        <p style={styles.footer}>Nouveau ? <Link to="/signup" style={styles.link}>Créer un compte</Link></p>
      </div>
      <style>{`.btn-hover:hover { filter: brightness(1.2); transform: translateY(-1px); shadow: 0 5px 15px rgba(0,0,0,0.3); }`}</style>
    </div>
  );
};

const styles = {
  container: { 
    height: '100vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    background: 'radial-gradient(circle at center, #1a2a3a 0%, #0f172a 100%)' // Fond sombre profond
  },
  card: { 
    width: '100%', 
    maxWidth: '400px', 
    padding: '40px', 
    background: '#ffffff', 
    borderRadius: '16px', 
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)' 
  },
  title: { textAlign: 'center', color: '#1e293b', fontSize: '26px', margin: '0 0 10px 0' },
  subtitle: { textAlign: 'center', color: '#64748b', marginBottom: '30px' },
  errorBanner: { background: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#475569' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', outline: 'none' },
  button: { padding: '14px', background: '#3498db', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: '0.3s' },
  footer: { textAlign: 'center', marginTop: '25px', color: '#64748b' },
  link: { color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }
};

export default Login;