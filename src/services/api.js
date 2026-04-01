// Ce fichier contiendra toutes les fonctions pour parler au backend
const API_URL = "http://localhost:5000/api"; // URL de ton futur backend

export const tradeAction = async (data) => {
  // Simulation d'un appel API
  console.log("Envoi de l'ordre au serveur...", data);
  
  // Plus tard, tu utiliseras fetch() comme ceci :
  /*
  const response = await fetch(`${API_URL}/trade`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Le JWT pour la sécurité
    },
    body: JSON.stringify(data)
  });
  return response.json();
  */
};