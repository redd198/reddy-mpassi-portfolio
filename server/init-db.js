import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

async function initDatabase() {
  try {
    console.log('🔄 Connexion à MySQL...')
    
    // Connexion sans spécifier la base de données
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    })

    console.log('✅ Connecté à MySQL')

    // Créer la base de données si elle n'existe pas
    console.log('🔄 Création de la base de données...')
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'reddy_portfolio'}`)
    console.log('✅ Base de données créée')

    // Utiliser la base de données
    await connection.query(`USE ${process.env.DB_NAME || 'reddy_portfolio'}`)

    // Lire et exécuter le fichier SQL
    console.log('🔄 Création des tables...')
    const sql = fs.readFileSync('./database.sql', 'utf8')
    
    // Séparer les requêtes et les exécuter une par une
    const queries = sql.split(';').filter(query => query.trim())
    
    for (const query of queries) {
      if (query.trim()) {
        await connection.query(query)
      }
    }

    console.log('✅ Tables créées avec succès')
    console.log('🎉 Base de données initialisée !')

    await connection.end()
    process.exit(0)
  } catch (error) {
    console.error('❌ Erreur:', error.message)
    process.exit(1)
  }
}

initDatabase()
