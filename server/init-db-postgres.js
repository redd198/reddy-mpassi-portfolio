import pkg from 'pg'
const { Client } = pkg
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

async function initDatabase() {
  try {
    console.log('🔄 Connexion à PostgreSQL...')
    
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    })

    await client.connect()
    console.log('✅ Connecté à PostgreSQL')

    // Lire et exécuter le fichier SQL
    console.log('🔄 Création des tables...')
    const sql = fs.readFileSync('./database-postgres.sql', 'utf8')
    
    await client.query(sql)

    console.log('✅ Tables créées avec succès')
    console.log('🎉 Base de données initialisée !')

    await client.end()
    process.exit(0)
  } catch (error) {
    console.error('❌ Erreur:', error.message)
    process.exit(1)
  }
}

initDatabase()
