# 🚀 Déploiement Backend sur Railway.com

## ✅ Avantages de Railway
- Déploiement ultra-rapide
- PostgreSQL inclus gratuitement
- Configuration automatique
- $5 de crédit gratuit par mois

## 🎯 Déploiement en 5 minutes

### Étape 1 : Créer le projet sur Railway

1. Allez sur https://railway.app
2. Connectez-vous avec GitHub
3. Cliquez sur **"New Project"**
4. Sélectionnez **"Deploy from GitHub repo"**
5. Choisissez votre repository `portfolio`

### Étape 2 : Ajouter PostgreSQL

1. Dans votre projet Railway, cliquez sur **"+ New"**
2. Sélectionnez **"Database"** → **"Add PostgreSQL"**
3. Railway va créer automatiquement la base de données
4. La variable `DATABASE_URL` sera automatiquement disponible

### Étape 3 : Configurer le service Backend

1. Cliquez sur votre service (celui qui vient d'être créé)
2. Allez dans **"Settings"**
3. Configurez :

   **Root Directory** :
   ```
   server
   ```

   **Build Command** :
   ```
   npm install
   ```

   **Start Command** :
   ```
   npm start
   ```

4. Allez dans **"Variables"** et ajoutez :

```bash
NODE_ENV=production
JWT_SECRET=votre_secret_jwt_super_securise_2024
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-app-password-gmail
ADMIN_EMAIL=reddympassi@gmail.com
PORT=5000
```

**Note** : `DATABASE_URL` est déjà configuré automatiquement par Railway !

### Étape 4 : Générer un domaine public

1. Dans votre service backend, allez dans **"Settings"**
2. Section **"Networking"** → **"Public Networking"**
3. Cliquez sur **"Generate Domain"**
4. Vous aurez une URL comme : `https://votre-app.up.railway.app`

### Étape 5 : Initialiser la base de données

Une fois déployé, ouvrez dans votre navigateur :

```
https://votre-app.up.railway.app/api/init-database
```

Vous devriez voir : `{ "success": true, "message": "Base de données initialisée avec succès" }`

### Étape 6 : Créer le compte admin

**Option A : Via Railway CLI** (recommandé)

1. Installez Railway CLI :
```bash
npm i -g @railway/cli
```

2. Connectez-vous :
```bash
railway login
```

3. Liez votre projet :
```bash
railway link
```

4. Créez l'admin :
```bash
railway run node server/create-admin.js
```

**Option B : Via SQL directement**

1. Dans Railway, cliquez sur votre base PostgreSQL
2. Allez dans **"Data"** ou **"Query"**
3. Exécutez :

```sql
-- D'abord, vérifiez que la table existe
SELECT * FROM admins;

-- Créez l'admin (le mot de passe est déjà hashé pour "Admin@2024")
INSERT INTO admins (username, email, password) 
VALUES (
  'admin', 
  'reddympassi@gmail.com', 
  '$2a$10$YourHashedPasswordHere'
);
```

**Option C : En local avec connexion à Railway**

```bash
cd server
# Copiez DATABASE_URL depuis Railway
export DATABASE_URL="postgresql://..."
node create-admin.js
```

### Étape 7 : Connecter le Frontend

1. Copiez l'URL de votre backend Railway (ex: `https://votre-app.up.railway.app`)

2. Modifiez `.env` à la racine du projet :
```
VITE_API_URL=https://votre-app.up.railway.app
```

3. Rebuild le frontend :
```bash
npm run build
```

4. Commitez et pushez :
```bash
git add .
git commit -m "Configure Railway backend URL"
git push
```

5. Votre frontend sur Render va se redéployer automatiquement

### Étape 8 : Tester

1. Testez le backend : `https://votre-app.up.railway.app/api/health`
2. Allez sur : `https://reddympassi.site/admin`
3. Connectez-vous :
   - Username : `admin`
   - Password : `Admin@2024`

## 🔧 Configuration avancée (optionnel)

### Domaine personnalisé pour le backend

Si vous voulez `api.reddympassi.site` au lieu de `*.railway.app` :

1. Dans Railway, allez dans **"Settings"** → **"Networking"**
2. Ajoutez un **"Custom Domain"** : `api.reddympassi.site`
3. Ajoutez un enregistrement CNAME dans votre DNS :
   ```
   api.reddympassi.site → votre-app.up.railway.app
   ```

### Variables d'environnement Railway

Railway détecte automatiquement :
- `DATABASE_URL` (PostgreSQL)
- `PORT` (assigné automatiquement)

Vous devez ajouter manuellement :
- `NODE_ENV=production`
- `JWT_SECRET`
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- `ADMIN_EMAIL`

## 📊 Monitoring

Railway offre :
- **Logs en temps réel** : Cliquez sur votre service → "Deployments" → "View Logs"
- **Métriques** : CPU, RAM, Network
- **Redéploiement automatique** : À chaque push sur GitHub

## 💰 Coûts

- **$5 gratuit/mois** (suffisant pour débuter)
- Après : ~$5-10/mois selon l'utilisation
- PostgreSQL inclus dans le prix

## 🆘 Problèmes courants

### Le backend ne démarre pas
```bash
# Vérifiez les logs sur Railway
# Vérifiez que "Root Directory" = "server"
# Vérifiez que "Start Command" = "npm start"
```

### Erreur de connexion à la DB
```bash
# Railway configure DATABASE_URL automatiquement
# Vérifiez que PostgreSQL est bien ajouté au projet
# Vérifiez dans "Variables" que DATABASE_URL existe
```

### "Erreur serveur" sur /admin
```bash
# 1. Vérifiez que le backend est déployé (statut "Active")
# 2. Testez : https://votre-app.up.railway.app/api/health
# 3. Vérifiez que .env contient la bonne URL
# 4. Rebuild le frontend : npm run build
# 5. Pushez sur GitHub
```

### CORS Error
Le backend est déjà configuré avec `app.use(cors())`. Si problème :
```javascript
// Dans server/server.js
app.use(cors({
  origin: ['https://reddympassi.site', 'http://localhost:5173'],
  credentials: true
}))
```

## ✅ Checklist finale

- [ ] Backend déployé sur Railway
- [ ] PostgreSQL ajouté et connecté
- [ ] Variables d'environnement configurées
- [ ] Domaine public généré
- [ ] Base de données initialisée (`/api/init-database`)
- [ ] Compte admin créé
- [ ] `.env` mis à jour avec l'URL Railway
- [ ] Frontend rebuild et redéployé
- [ ] Test de connexion sur `/admin` réussi

## 🎉 Prochaines étapes

Une fois que tout fonctionne :
1. Configurez les emails (Gmail App Password)
2. Testez les formulaires de contact
3. Vérifiez les statistiques dans le dashboard admin
4. Configurez un domaine personnalisé (optionnel)

## 📞 Besoin d'aide ?

Dites-moi à quelle étape vous êtes et je vous guide !
