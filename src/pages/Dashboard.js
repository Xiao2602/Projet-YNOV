import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Search, Filter, TrendingUp, Wallet, RotateCcw } from 'lucide-react';

// Données avec dates au format JJ/MM/AAAA 
const initialData = [
  { date: '01/05/2024', rawDate: '2024-05-01', valeur: 100000 },
  { date: '02/05/2024', rawDate: '2024-05-02', valeur: 102500 },
  { date: '03/05/2024', rawDate: '2024-05-03', valeur: 98000 },
  { date: '04/05/2024', rawDate: '2024-05-04', valeur: 105000 },
  { date: '05/05/2024', rawDate: '2024-05-05', valeur: 95000 },
  { date: '06/05/2024', rawDate: '2024-05-06', valeur: 110000 },
];

const Dashboard = () => {
  // Valeurs par défaut pour la réinitialisation
  const defaultFilters = { 
    startDate: '', 
    endDate: '', 
    maxPrice: 150000, 
    status: 'tous' 
  };

  const [tempFilters, setTempFilters] = useState(defaultFilters);
  const [displayData, setDisplayData] = useState(initialData);

  // Fonction pour appliquer les filtres
  const handleApplyFilters = () => {
    const filtered = initialData.filter(item => {
      const matchStart = !tempFilters.startDate || item.rawDate >= tempFilters.startDate;
      const matchEnd = !tempFilters.endDate || item.rawDate <= tempFilters.endDate;
      const matchPrice = item.valeur <= tempFilters.maxPrice;
      let matchStatus = true;
      if (tempFilters.status === 'gain') matchStatus = item.valeur >= 100000;
      if (tempFilters.status === 'perte') matchStatus = item.valeur < 100000;
      return matchStart && matchEnd && matchPrice && matchStatus;
    });
    setDisplayData(filtered);
  };

  // Fonction pour réinitialiser tout par défaut
  const handleReset = () => {
    setTempFilters(defaultFilters);
    setDisplayData(initialData);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tableau de Bord</h1>

      <div style={styles.mainLayout}>
        {/* COLONNE GAUCHE */}
        <div style={styles.leftColumn}>
          <div style={styles.statsRow}>
            <div className="card" style={styles.statCard}>
              <div style={styles.cardHeader}><TrendingUp size={18} color="#3498db" /> <span style={styles.cardLabel}>Valeur Totale</span></div>
              <p style={styles.statValue}>100,000 $ </p>
            </div>
            <div className="card" style={styles.statCard}>
              <div style={styles.cardHeader}><Wallet size={18} color="#27ae60" /> <span style={styles.cardLabel}>Cash Disponible</span></div>
              <p style={{ ...styles.statValue, color: '#27ae60' }}>15,000 $ </p>
            </div>
          </div>

          <div className="card" style={styles.chartCard}>
            <h3 style={styles.subTitle}>Évolution du Portefeuille</h3>
            <div style={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={displayData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="date" tick={{fontSize: 11}} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 'auto']} tick={{fontSize: 11}} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={styles.tooltip} />
                  <Line type="monotone" dataKey="valeur" stroke="#3498db" strokeWidth={3} dot={{ r: 4, fill: '#3498db' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE (FILTRES) */}
        <div style={styles.rightColumn}>
          <div className="card" style={styles.filterCard}>
            <div style={styles.cardHeader}><Filter size={18} /> <h3 style={{ margin: 0, fontSize: '16px' }}>Options de Tri</h3></div>
            
            <div style={styles.filterGroup}>
              <label style={styles.label}>Intervalle de dates :</label>
              <input type="date" style={styles.input} value={tempFilters.startDate} onChange={(e) => setTempFilters({...tempFilters, startDate: e.target.value})} />
              <input type="date" style={{...styles.input, marginTop: '8px'}} value={tempFilters.endDate} onChange={(e) => setTempFilters({...tempFilters, endDate: e.target.value})} />
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Prix max : {tempFilters.maxPrice} $</label>
              <input type="range" min="0" max="150000" step="5000" style={styles.range} value={tempFilters.maxPrice} onChange={(e) => setTempFilters({...tempFilters, maxPrice: Number(e.target.value)})} />
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Performance :</label>
              <select style={styles.input} value={tempFilters.status} onChange={(e) => setTempFilters({...tempFilters, status: e.target.value})}>
                <option value="tous">Tout afficher</option>
                <option value="gain">En Gain (≥ 100k)</option>
                <option value="perte">En Perte (&lt; 100k)</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleApplyFilters} style={styles.searchBtn}>
                <Search size={16} /> Appliquer
              </button>
              <button onClick={handleReset} style={styles.resetBtn} title="Réinitialiser les filtres">
                <RotateCcw size={16} /> Réinitialiser
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', maxWidth: '1400px', margin: '0 auto', overflow: 'hidden' },
  title: { fontSize: '24px', color: '#2c3e50', margin: '10px 0 20px 0' },
  mainLayout: { display: 'flex', gap: '20px', flex: 1, minHeight: 0 },
  leftColumn: { flex: 3, display: 'flex', flexDirection: 'column', gap: '20px', minHeight: 0 },
  rightColumn: { flex: 1, minWidth: '280px' },
  statsRow: { display: 'flex', gap: '20px' },
  statCard: { flex: 1, padding: '15px', background: 'white', borderRadius: '10px', border: '1px solid #000000' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' },
  cardLabel: { color: '#7f8c8d', fontSize: '12px', fontWeight: 'bold' },
  statValue: { fontSize: '24px', fontWeight: 'bold', margin: 0 },
  chartCard: { flex: 1, padding: '20px', background: 'white', borderRadius: '10px', border: '1px solid #000000', display: 'flex', flexDirection: 'column', minHeight: 0 },
  subTitle: { fontSize: '16px', margin: '0 0 15px 0', color: '#34495e' },
  chartWrapper: { flex: 1, minHeight: 0 },
  filterCard: { padding: '20px', background: 'white', borderRadius: '10px', border: '1px solid #000000' },
  filterGroup: { marginBottom: '15px' },
  label: { display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold' },
  input: { width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #000000', fontSize: '13px' },
  range: { width: '100%' },
  searchBtn: { flex: 4, padding: '10px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 'bold' },
  resetBtn: { flex: 1, padding: '10px', background: '#f8f9fa', color: '#666', border: '1px solid #000000', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' },
  tooltip: { borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }
};

export default Dashboard;