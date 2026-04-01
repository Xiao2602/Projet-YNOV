import React from 'react';

const History = () => {
  // Simulation des données que le backend te donnera plus tard
  const transactions = [
    { id: 1, date: '2024-05-10', ticker: 'AAPL', type: 'ACHAT', quantite: 5, prix: 150.20 },
    { id: 2, date: '2024-05-11', ticker: 'TSLA', type: 'VENTE', quantite: 2, prix: 175.50 },
  ];

  return (
    <div>
      <h1>Historique des Transactions</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>Date</th>
            <th>Actif</th>
            <th>Type</th>
            <th>Quantité</th>
            <th>Prix Unitaire</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} style={{ borderBottom: '1px solid #ddd', textAlign: 'center' }}>
              <td>{t.date}</td>
              <td><strong>{t.ticker}</strong></td>
              <td style={{ color: t.type === 'ACHAT' ? 'green' : 'red' }}>{t.type}</td>
              <td>{t.quantite}</td>
              <td>{t.prix} $</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;