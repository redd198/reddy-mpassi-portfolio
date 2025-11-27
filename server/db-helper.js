import dotenv from 'dotenv'

dotenv.config()

// Détecter le type de base de données
const isPostgres = process.env.DATABASE_URL?.startsWith('postgresql://')

/**
 * Convertir une requête MySQL en PostgreSQL si nécessaire
 * @param {string} query - Requête SQL avec placeholders MySQL (?)
 * @param {Array} params - Paramètres de la requête
 * @returns {Object} - {query, params} adaptés au type de DB
 */
export function adaptQuery(query, params = []) {
  if (!isPostgres) {
    return { query, params }
  }

  // Convertir les ? en $1, $2, $3, etc. pour PostgreSQL
  let paramIndex = 1
  const pgQuery = query.replace(/\?/g, () => `$${paramIndex++}`)

  // Remplacer les fonctions MySQL par PostgreSQL
  const adaptedQuery = pgQuery
    .replace(/CURDATE\(\)/g, 'CURRENT_DATE')
    .replace(/NOW\(\)/g, 'CURRENT_TIMESTAMP')

  return { query: adaptedQuery, params }
}

/**
 * Extraire les résultats selon le type de DB
 * @param {*} result - Résultat de la requête
 * @returns {Array} - Les lignes de résultat
 */
export function extractRows(result) {
  if (isPostgres) {
    // PostgreSQL retourne {rows: [...]}
    return result.rows || []
  } else {
    // MySQL retourne [[...], metadata]
    return Array.isArray(result) ? result[0] : result
  }
}

/**
 * Extraire l'ID inséré
 * @param {*} result - Résultat de la requête INSERT
 * @returns {number} - L'ID inséré
 */
export function extractInsertId(result) {
  if (isPostgres) {
    // PostgreSQL avec RETURNING id
    return result.rows?.[0]?.id
  } else {
    // MySQL
    return result[0]?.insertId
  }
}

export const dbType = isPostgres ? 'PostgreSQL' : 'MySQL'
