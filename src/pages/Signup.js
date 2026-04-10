import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let temp = {};
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) temp.email = "Email invalide.";
    if (formData.password.length < 8) temp.password = "8 caractères minimum.";
    if (formData.password !== formData.confirm) temp.confirm = "Mots de passe différents.";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validate()) {
      if (window.confirm("Valider votre inscription et créditer 100 000 $ ?")) {
        navigate('/');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Inscription</h2>
        <p style={styles.subtitle}>Commencez avec 100 000 $ de capital</p>
        
        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input type="text" style={styles.input} onChange={(e) => setFormData({...formData, email: e.target.value})} 
            placeholder="ex: votre@email.com"/>
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mot de passe</label>
            <input type="password" style={styles.input} onChange={(e) => setFormData({...formData, password: e.target.value})} 
            placeholder="Insérez un mot de passe (8 caractères)"/>
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirmation</label>
            <input type="password" style={styles.input} onChange={(e) => setFormData({...formData, confirm: e.target.value})}
            placeholder="Confirmer le mot de passe" />
            {errors.confirm && <span style={styles.error}>{errors.confirm}</span>}
          </div>

          <button type="submit" className="btn-hover" style={styles.button}>Créer mon compte</button>
        </form>
        <p style={styles.footer}>Déjà membre ? <Link to="/" style={styles.link}>Se connecter</Link></p>
      </div>
      <style>{`.btn-hover:hover { filter: brightness(1.2); transform: translateY(-1px); shadow: 0 5px 15px rgba(0,0,0,0.3); }`}</style>
    </div>
  );
};

// Styles identiques au Login pour la cohérence, seul le bouton change de couleur
const styles = {
  container: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'radial-gradient(circle at center, #1e1b4b 0%, #0f172a 100%)' },
  card: { width: '100%', maxWidth: '420px', padding: '40px', background: '#ffffff', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' },
  title: { textAlign: 'center', color: '#1e293b', fontSize: '26px', margin: '0' },
  subtitle: { textAlign: 'center', color: '#64748b', marginBottom: '30px', fontSize: '14px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#475569' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', outline: 'none' },
  button: { padding: '14px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' },
  error: { color: '#dc2626', fontSize: '12px', fontWeight: 'bold' },
  footer: { textAlign: 'center', marginTop: '25px', color: '#64748b' },
  link: { color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }
};

export default Signup;