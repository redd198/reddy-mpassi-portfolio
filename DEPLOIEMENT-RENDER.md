# 🚀 Guide de Déploiement sur Render

## Prérequis
- Compte GitHub
- Compte Render (gratuit)
- Code poussé sur GitHub

## 📋 Étape 1 : Préparer le code

### 1.1 Initialiser Git (si pas déjà fait)
```bash
git init
git add .
git commit -m "Initial commit - Portfolio Reddy Mpassi"
```

### 1.2 Créer un dépôt GitHub
1. Aller sur https://github.com/new
2. Créer un nouveau dépôt : `reddy-mpassi-portfolio`
3. Ne pas initialiser avec README

### 1.3 Pousser le code
```bash
git remote add origin https://github.com/VOTRE_USERNAME/reddy-mpassi-portfolio.git
git branch -M main
git push -u origin main
```

## 🗄️ Étape 2 : Créer la base de données MySQL sur Render

1. Aller sur https://dashboard.render.com
2. Cliquer sur **"New +"** → **"MySQL"**
3. Configurer :
   - **Name** : `reddy-portfolio-db`
   - **Database** : `reddy_portfolio`
   - **User** : `reddy_user`
   - **Region** : Choisir le plus proche
   - **Plan** : Free (ou Starter si besoin)
4. Cliquer sur **"Create Database"**
5. **IMPORTANT** : Noter les informations de connexion :
   - Internal Database URL
   - External Database URL
   - Username
   - Password

## 🔧 Étape 3 : Déployer le Backend (API)

1. Cliquer sur **"New +"** → **"Web Service"**
2. Connecter votre dépôt GitHub
3. Configurer :
   - **Name** : `reddy-portfolio-api`
   - **Region** : Même que la base de données
   - **Branch** : `main`
   - **Root Directory** : `server`
   - **Runtime** : `Node`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Plan** : Free

4. **Variables d'environnement** (Section "Environment") :
   ```
   DB_HOST=<votre_db_host_interne>
   DB_USER=reddy_user
   DB_PASSWORD=<votre_db_password>
   DB_NAME=reddy_portfolio
   PORT=5000
   ```

5. Cliquer sur **"Create Web Service"**

6. Attendre le déploiement (5-10 minutes)

7. **Initialiser la base de données** :
   - Aller dans l'onglet "Shell" du service
   - Exécuter : `npm run init-db`

## 🎨 Étape 4 : Déployer le Frontend

1. Cliquer sur **"New +"** → **"Static Site"**
2. Connecter le même dépôt GitHub
3. Configurer :
   - **Name** : `reddy-portfolio-frontend`
   - **Branch** : `main`
   - **Build Command** : `npm install && npm run build`
   - **Publish Directory** : `dist`

4. **Variables d'environnement** :
   ```
   VITE_API_URL=https://reddy-portfolio-api.onrender.com
   ```
   (Remplacer par l'URL de votre backend)

5. Cliquer sur **"Create Static Site"**

## 🔗 Étape 5 : Mettre à jour les URLs dans le code

### 5.1 Créer un fichier de configuration

Créer `src/config.js` :
```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
```

### 5.2 Mettre à jour les composants

Dans `BookingPage.jsx`, `BooksPage.jsx`, `BlogPage.jsx`, remplacer :
```javascript
fetch('http://localhost:5000/api/...')
```

Par :
```javascript
import { API_URL } from '../config'
fetch(`${API_URL}/api/...`)
```

### 5.3 Pousser les changements
```bash
git add .
git commit -m "Update API URL for production"
git push
```

Render redéploiera automatiquement !

## ✅ Étape 6 : Vérification

1. **Backend** : Visiter `https://votre-api.onrender.com/api/health`
   - Devrait afficher : `{"status":"OK","message":"API fonctionnelle"}`

2. **Frontend** : Visiter `https://votre-site.onrender.com`
   - Le site devrait être accessible

3. **Tester les formulaires** :
   - Réservation de coaching
   - Commande de livre
   - Newsletter

## 🎉 C'est en ligne !

Votre portfolio est maintenant déployé sur :
- **Frontend** : `https://reddy-portfolio-frontend.onrender.com`
- **Backend** : `https://reddy-portfolio-api.onrender.com`

## 📝 Notes importantes

- **Plan gratuit** : Le service s'endort après 15 min d'inactivité
- **Premier chargement** : Peut prendre 30-60 secondes
- **Base de données** : Sauvegardée automatiquement
- **Mises à jour** : Automatiques à chaque push sur GitHub

## 🔧 Dépannage

### Le backend ne démarre pas
- Vérifier les variables d'environnement
- Vérifier les logs dans Render Dashboard
- Vérifier que la base de données est accessible

### Le frontend ne se connecte pas au backend
- Vérifier que `VITE_API_URL` est correctement configuré
- Vérifier que le backend est en ligne
- Vérifier les CORS dans `server.js`

### Erreur de base de données
- Vérifier les credentials
- Exécuter `npm run init-db` dans le Shell du backend
- Vérifier que la base de données est créée
