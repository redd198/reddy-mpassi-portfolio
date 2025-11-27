import pkg from 'pg'
const { Pool } = pkg
import dotenv from 'dotenv'

dotenv.config()

// Configuration PostgreSQL optimisée pour Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  // Augmenter les timeouts
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 60000,
  // Garder moins de connexions mais plus longtemps
  max: 5,
  min: 1,
  // Permettre au pool de se reconnecter
  allowExitOnIdle: false
})

// Gestion des erreurs de pool
pool.on('error', (err) => {
  console.error('❌ Erreur PostgreSQL pool:', err.message)
})

// Tester la connexion avec retry
let retries = 3
const testConnection = async () => {
  for (let i = 0; i < retries; i++) {
    try {
      const client = await pool.connect()
      await client.query('SELECT NOW()')
      console.log('✅ Connexion à PostgreSQL réussie')
      client.release()
      return
    } catch (err) {
      console.error(`❌ Tentative ${i + 1}/${retries} - Erreur PostgreSQL:`, err.message)
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }
  }
}

testConnection()

export default pool
