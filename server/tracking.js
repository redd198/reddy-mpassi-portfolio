import axios from 'axios'

// Obtenir les informations géographiques à partir de l'IP
export const getLocationFromIP = async (ip) => {
  try {
    // Utiliser ipapi.co (gratuit, pas de clé API requise)
    const response = await axios.get(`https://ipapi.co/${ip}/json/`)
    return {
      country: response.data.country_name || 'Inconnu',
      city: response.data.city || 'Inconnu'
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la localisation:', error)
    return {
      country: 'Inconnu',
      city: 'Inconnu'
    }
  }
}

// Extraire l'IP réelle du visiteur
export const getClientIP = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         'unknown'
}
