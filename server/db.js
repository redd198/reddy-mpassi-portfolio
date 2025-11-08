import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'reddy_portfolio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Tester la connexion
pool.getConnection()
  .then(connection => {
    console.log('✅ Connexion à MySQL réussie')
    connection.release()
  })
  .catch(err => {
    console.error('❌ Erreur de connexion à MySQL:', err.message)
  })

export default pool
