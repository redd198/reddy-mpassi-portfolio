import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

// Ne pas utiliser MySQL si DATABASE_URL est PostgreSQL
const isPostgres = process.env.DATABASE_URL?.startsWith('postgresql://')

let pool = null

if (!isPostgres) {
  // Parser DATABASE_URL si elle existe (format: mysql://user:password@host:port/database)
  let config = {}

  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('mysql://')) {
    try {
      const url = new URL(process.env.DATABASE_URL)
      config = {
        host: url.hostname,
        port: url.port || 3306,
        user: url.username,
        password: url.password,
        database: url.pathname.slice(1),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 10000
      }
      console.log('📦 Utilisation de DATABASE_URL pour MySQL')
    } catch (error) {
      console.error('❌ Erreur parsing DATABASE_URL:', error.message)
    }
  } else {
    // Utiliser les variables séparées (pour le développement local)
    config = {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'reddy_portfolio',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 10000
    }
    console.log('📦 Utilisation des variables DB_HOST, DB_USER, etc.')
  }

  pool = mysql.createPool(config)

  // Tester la connexion
  pool.getConnection()
    .then(connection => {
      console.log('✅ Connexion à MySQL réussie')
      connection.release()
    })
    .catch(err => {
      console.error('❌ Erreur de connexion à MySQL:', err.message)
    })
} else {
  console.log('⏭️  MySQL ignoré (PostgreSQL détecté)')
}

export default pool
