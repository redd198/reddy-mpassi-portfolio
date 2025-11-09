import { writeFileSync } from 'fs'
import { join } from 'path'

// Créer le fichier _redirects dans dist/
const redirectsContent = '/*    /index.html   200\n'
const distPath = join(process.cwd(), 'dist', '_redirects')

try {
  writeFileSync(distPath, redirectsContent)
  console.log('✅ Fichier _redirects créé dans dist/')
} catch (error) {
  console.error('❌ Erreur lors de la création de _redirects:', error)
  process.exit(1)
}
