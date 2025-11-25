import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        try {
          const distDir = join(process.cwd(), 'dist')
          if (!existsSync(distDir)) {
            mkdirSync(distDir, { recursive: true })
          }
          copyFileSync('public/_redirects', 'dist/_redirects')
          console.log('✅ _redirects copié dans dist/')
        } catch (err) {
          console.error('❌ Erreur copie _redirects:', err)
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  base: '/',
})
