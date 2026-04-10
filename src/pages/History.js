import React, { useState } from 'react';
import { RotateCcw, Search } from 'lucide-react';

const History = () => {
  const initialTransactions = [
    { id: 1, date: '2024-10-05', ticker: 'AAPL', type: 'ACHAT', quantite: 5, prix: 150.20 },
    { id: 2, date: '2024-11-05', ticker: 'TSLA', type: 'VENTE', quantite: 2, prix: 175.50 },
  ];

  const [transactions, setTransactions] = useState(initialTransactions);
  const [filters, setFilters] = useState({
    type: 'TOUS',
    startDate: '',
    endDate: '',
    month: '',
    year: '',
    ticker: '',
    minPrice: '',
    maxPrice: ''
  });

  const handleFilter = () => {
    let filtered = initialTransactions.filter(t => {
      const transactionDate = new Date(t.date);
      const tMonth = (transactionDate.getMonth() + 1).toString().padStart(2, '0');
      const tYear = transactionDate.getFullYear().toString();

      const matchType = filters.type === 'TOUS' || t.type === filters.type;
      const matchStartDate = !filters.startDate || t.date >= filters.startDate;
      const matchEndDate = !filters.endDate || t.date <= filters.endDate;
      const matchMonth = !filters.month || tMonth === filters.month;
      const matchYear = !filters.year || tYear === filters.year;
      const matchTicker = !filters.ticker || t.ticker.toLowerCase().includes(filters.ticker.toLowerCase());
      const matchMinPrice = !filters.minPrice || t.prix >= parseFloat(filters.minPrice);
      const matchMaxPrice = !filters.maxPrice || t.prix <= parseFloat(filters.maxPrice);
      
      return matchType && matchStartDate && matchEndDate && matchMonth && matchYear && matchTicker && matchMinPrice && matchMaxPrice;
    });
    setTransactions(filtered);
  };

  const resetFilters = () => {
    setFilters({ 
      type: 'TOUS', startDate: '', endDate: '', month: '', year: '', 
      ticker: '', minPrice: '', maxPrice: '' 
    });
    setTransactions(initialTransactions);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Historique des Transactions</h1>

      {/* SECTION FILTRES */}
      <div style={styles.filterBar}>
        
        {/* PREMIÈRE LIGNE */}
        <div style={styles.filterRow}>
          <div style={styles.filterGroup}>
            <label style={styles.label}>Actif</label>
            <input 
              style={styles.input} 
              placeholder="Ex: AAPL" 
              value={filters.ticker}
              onChange={(e) => setFilters({...filters, ticker: e.target.value})}
            />
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.label}>Type</label>
            <select 
              style={styles.input} 
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <option value="TOUS">Tous</option>
              <option value="ACHAT">Achat</option>
              <option value="VENTE">Vente</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.label}>Intervalle Date (Début / Fin)</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="date" 
                style={styles.input} 
                value={filters.startDate}
                onChange={(e) => setFilters({...filters, startDate: e.target.value})}
              />
              <input 
                type="date" 
                style={styles.input} 
                value={filters.endDate}
                onChange={(e) => setFilters({...filters, endDate: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* DEUXIÈME LIGNE (Celle que tu voulais descendre) */}
        <div style={{...styles.filterRow, marginTop: '20px'}}>
          <div style={styles.filterGroup}>
            <label style={styles.label}>Mois / Année</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select 
                style={{...styles.input, width: '120px'}} 
                value={filters.month}
                onChange={(e) => setFilters({...filters, month: e.target.value})}
              >
                <option value="">Mois</option>
                {['01','02','03','04','05','06','07','08','09','10','11','12'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <input 
                style={{...styles.input, width: '120px'}} 
                placeholder="Année" 
                value={filters.year}
                onChange={(e) => setFilters({...filters, year: e.target.value})}
              />
            </div>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.label}>Prix Min / Max</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                style={{...styles.input, width: '100px'}} 
                placeholder="Min" 
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              />
              <input 
                style={{...styles.input, width: '100px'}} 
                placeholder="Max" 
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              />
            </div>
          </div>

          {/* BOUTONS DROITE DE LA DEUXIÈME LIGNE */}
          <div style={styles.rightButtonGroup}>
            <button onClick={handleFilter} style={styles.btnApply}>
              <Search size={18} />
              <span>Filtrer</span>
            </button>
            <button onClick={resetFilters} style={styles.btnReset}>
              <RotateCcw size={18} />
              <span>Réinitialiser</span>
            </button>
          </div>
        </div>
      </div>

      {/* TABLEAU */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.theadRow}>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Actif</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Quantité</th>
            <th style={styles.th}>Prix Unitaire</th>
            <th style={styles.th}>Total</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} style={styles.tr}>
              <td style={styles.td}>{t.date}</td>
              <td style={styles.td}><strong>{t.ticker}</strong></td>
              <td style={{ ...styles.td, color: t.type === 'ACHAT' ? '#27ae60' : '#e74c3c', fontWeight: 'bold' }}>
                {t.type}
              </td>
              <td style={styles.td}>{t.quantite}</td>
              <td style={styles.td}>{t.prix.toLocaleString()} $</td>
              <td style={{...styles.td, fontWeight: 'bold'}}>
                {(t.quantite * t.prix).toLocaleString()} $
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '1300px', margin: '0 auto' },
  title: { color: '#1e293b', marginBottom: '30px', fontSize: '28px', fontWeight: 'bold' },
  filterBar: { 
    display: 'flex', 
    flexDirection: 'column', // Force les lignes à s'empiler
    background: '#ffffff', 
    padding: '25px', 
    borderRadius: '15px',
    marginBottom: '35px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    border: '1px solid #000000'
  },
  filterRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '20px',
    width: '100%'
  },
  filterGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { 
    padding: '12px', 
    width: '140px',
    borderRadius: '10px', 
    border: '1px solid #000000', 
    outline: 'none',
    fontSize: '14px',
    background: '#f8fafc',
    height: '42px',
    boxSizing: 'border-box'
  },
  rightButtonGroup: { 
    display: 'flex', 
    gap: '10px', 
    marginLeft: 'auto', 
    alignItems: 'center'
  },
  btnApply: { 
    background: '#3498db', 
    color: 'white', 
    border: 'none', 
    padding: '0 20px', 
    borderRadius: '10px', 
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: '700',
    height: '42px'
  },
  btnReset: { 
    background: '#ffffff', 
    color: 'black', 
    border: '1px solid #000000', 
    padding: '0 20px', 
    borderRadius: '10px', 
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: '700',
    height: '42px'
  },
  table: { width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px' },
  th: { padding: '10px 20px', color: '#94a3b8', textAlign: 'center', fontSize: '13px', fontWeight: '600' , borderTop: '1px solid #000000', borderBottom: '1px solid #000000'},
  tr: { background: 'white' },
  td: { padding: '20px', textAlign: 'center', borderTop: '1px solid #000000', borderBottom: '1px solid #000000' }
};

export default History;