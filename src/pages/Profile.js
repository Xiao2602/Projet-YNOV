import React, { useState, useRef } from 'react';

const Profile = () => {
  // États pour les informations personnelles 
  const [name, setName] = useState('Utilisateur InvestX');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // État pour l'image (par défaut une couleur grise)
  const [avatar, setAvatar] = useState(null);
  
  // Référence pour cliquer sur l'input caché via le bouton
  const fileInputRef = useRef(null);

  // Fonction pour gérer la sélection de l'image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Création d'une URL temporaire pour afficher l'image choisie
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const handleSave = () => {
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    alert("Modifications enregistrées localement (Prêt pour le backend) !");
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h1>Mon Profil</h1>
      <div className="card" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', background: 'white' }}>
        
        {/* Section Avatar  */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div 
            style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              background: avatar ? `url(${avatar}) center/cover` : '#ccc', 
              margin: '0 auto',
              border: '2px solid #3498db'
            }}
          >
            {!avatar && <span style={{ lineHeight: '100px', color: 'white' }}>Photo</span>}
          </div>
          
          {/* Input fichier caché */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
          
          <button 
            onClick={() => fileInputRef.current.click()} 
            style={{ fontSize: '12px', marginTop: '10px', background: '#ecf0f1', color: '#2c3e50', border: '1px solid #bdc3c7' }}
          >
            Changer l'avatar
          </button>
        </div>
        
        {/* Informations personnelles  */}
        <label style={{ display: 'block', marginBottom: '5px' }}>Nom complet :</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        
        <label style={{ display: 'block', marginBottom: '5px' }}>Nouveau mot de passe :</label>
        <input 
          type="password" 
          placeholder="Laissez vide si inchangé" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <label style={{ display: 'block', marginBottom: '5px' }}>Confirmer le mot de passe :</label>
        <input 
          type="password" 
          placeholder="Confirmez votre mot de passe" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={inputStyle}
        />
        
        <button 
          onClick={handleSave}
          style={{ width: '100%', padding: '12px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  marginBottom: '15px',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  boxSizing: 'border-box' 
};

export default Profile;