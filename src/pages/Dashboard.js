import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Données fictives pour le graphique (manipulation avec sql qu'Honoré devra implémenter) + ça trace comme un vrai graphique si on met plusieurs données
const data = [
  { name: 'Lun', valeur: 100000 },
];

const Dashboard = () => {
  return (
    <div>
      <h1>Tableau de Bord</h1>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div className="card">
          <h3>Valeur Totale</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>100,000 $</p>
        </div>
        <div className="card">
          <h3>Cash Disponible</h3>
          <p style={{ fontSize: '24px', color: 'green' }}>15,000 $</p>
        </div>
      </div>

      <div style={{ height: '300px', background: '#f9f9f9', padding: '10px' }}>
        <h3>Évolution du Portefeuille</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="valeur" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;