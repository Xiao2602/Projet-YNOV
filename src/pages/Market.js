import React, { useState } from 'react';
import { Search, TrendingUp, ArrowUpCircle, ArrowDownCircle, Info } from 'lucide-react';

const Market = () => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Simulation de données financières (Normalement venant de l'API Finnhub ou Twelve Data)
  const mockData = {
    price: 175.45,
    bid: 175.40,
    ask: 175.50,
    change: "+2.4%",
  };

  const handleTrade = (type) => {
    if (!symbol) return alert("Veuillez entrer un symbole (ex: AAPL)");
    alert(`Ordre ${type} envoyé : ${quantity} unité(s) de ${symbol} au prix du marché.`);
    // La validation de solvabilité et l'atomicité seront gérées par le backend [cite: 29, 30]
  };

  return (
    <div style={containerStyle}>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: 0, color: '#1a1a1a' }}>Marché Financier</h1>
        <p style={{ color: '#666' }}>Recherchez des actifs et passez vos ordres en temps réel.</p>
      </header>

      {/* Barre de Recherche */}
      <div style={searchContainer}>
        <Search size={20} color="#999" />
        <input 
          type="text" 
          placeholder="Entrer un Ticker (ex: AAPL, TSLA, BTC)..." 
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          style={searchInput}
        />
      </div>

      <div style={gridStyle}>
        {/* Carte de Visualisation du Prix */}
        <div style={cardStyle}>
          <div style={cardHeader}>
            <TrendingUp size={20} color="#3498db" />
            <span style={{ fontWeight: 'bold' }}>Cotation : {symbol || '---'}</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', margin: '15px 0' }}>
            {mockData.price} $ 
            <span style={{ fontSize: '16px', color: '#27ae60', marginLeft: '10px' }}>{mockData.change}</span>
          </div>
          <div style={infoRow}>
            <span>BID (Offre) : <strong style={{color: '#e67e22'}}>{mockData.bid} $</strong></span>
            <span>ASK (Demande) : <strong style={{color: '#2980b9'}}>{mockData.ask} $</strong></span>
          </div>
          <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
            <Info size={12} /> Basé sur le dernier prix (LAST)[cite: 68].
          </p>
        </div>

        {/* Panneau de Trading */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>Passer un Ordre</h3>
          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Quantité :</label>
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)}
              style={quantityInput}
              min="1"
            />
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => handleTrade('ACHAT')} 
              style={{ ...btnBase, background: '#27ae60' }}
            >
              <ArrowUpCircle size={18} /> Acheter
            </button>
            <button 
              onClick={() => handleTrade('VENTE')} 
              style={{ ...btnBase, background: '#e74c3c' }}
            >
              <ArrowDownCircle size={18} /> Vendre
            </button>
          </div>
          <p style={{ fontSize: '11px', color: '#666', marginTop: '15px' }}>
            L'exécution sera immédiate au prix actuel (Market Order).
          </p>
        </div>
      </div>
    </div>
  );
};

// Styles en objets (pour rester simple sans fichier CSS externe complexe)
const containerStyle = { maxWidth: '1000px', margin: '0 auto', padding: '20px' };

const searchContainer = {
  display: 'flex',
  alignItems: 'center',
  background: 'white',
  padding: '12px 20px',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  marginBottom: '30px'
};

const searchInput = {
  border: 'none',
  outline: 'none',
  marginLeft: '15px',
  fontSize: '18px',
  width: '100%',
  fontWeight: '500'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px'
};

const cardStyle = {
  background: 'white',
  padding: '25px',
  borderRadius: '16px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
  border: '1px solid #f0f0f0'
};

const cardHeader = { display: 'flex', alignItems: 'center', gap: '10px', color: '#34495e' };

const infoRow = { display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '15px' };

const labelStyle = { display: 'block', fontSize: '14px', color: '#7f8c8d', marginBottom: '5px' };

const quantityInput = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontSize: '16px'
};

const btnBase = {
  flex: 1,
  padding: '15px',
  border: 'none',
  borderRadius: '8px',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  transition: 'transform 0.1s'
};

export default Market;