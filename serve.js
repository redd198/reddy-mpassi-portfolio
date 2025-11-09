import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Servir les fichiers statiques
app.use(express.static(join(__dirname, 'dist')))

// Toutes les routes renvoient index.html (pour React Router)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`🚀 Frontend démarré sur le port ${PORT}`)
})
