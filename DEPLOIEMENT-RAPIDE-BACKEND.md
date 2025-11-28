# 🚀 Déploiement Backend - Guide Rapide

## ✅ Ce qui fonctionne en local
- Frontend : OK
- Backend : OK
- Base de données MySQL : OK

## ❌ Ce qui manque en ligne
- Backend API non déployé
- Base de données non accessible

## 🎯 Solution en 3 étapes

### Étape 1 : Déployer le Backend sur Render (5 min)

1. Allez sur https://dashboard.render.com
2. Cliquez **"New +"** → **"Web Service"**
3. Sélectionnez votre repository GitHub
4. Configurez :
   ```
   Name: reddy-portfolio-api
   Region: Frankfurt
   Root Directory: server
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```
5. Cliquez **"Create Web Service"**

### Étape 2 : Créer la base PostgreSQL (2 min)

1. Cliquez **"New +"** → **"PostgreSQL"**
2. Configurez :
   ```
   Name: reddy-portfolio-db
   Region: Frankfurt
   Plan: Free
   ```
3. Cliquez **"Create Database"**
4. **Copiez l'URL interne** (Internal Database URL)

### Étape 3 : Configurer les variables (3 min)

1. Retournez sur `reddy-portfolio-api`
2. Allez dans **"Environment"**
3. Ajoutez :

```bash
NODE_ENV=production
DATABASE_URL=<collez l'Internal Database URL de PostgreSQL>
JWT_SECRET=changez_ce_secret_super_securise_2024
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-app-password-gmail
ADMIN_EMAIL=reddympassi@gmail.com
PORT=5000
```

4. **Save Changes**

### Étape 4 : Initialiser la DB et créer l'admin

Une fois le backend déployé (statut "Live"), ouvrez :

```
https://reddy-portfolio-api.onrender.com/api/init-database
```

Puis créez l'admin en local :
```bash
cd server
node create-admin.js
```

### Étape 5 : Connecter le Frontend au Backend

1. Modifiez `.env` à la racine :
```
VITE_API_URL=https://reddy-portfolio-api.onrender.com
```

2. Rebuild :
```bash
npm run build
```

3. Commitez et pushez :
```bash
git add .
git commit -m "Add backend API URL"
git push
```

## ✅ Test final

Allez sur https://reddympassi.site/admin

Connectez-vous avec :
- Username : `admin`
- Password : `Admin@2024`

## 📝 Notes

- **Premier chargement lent** : Les services gratuits Render s'endorment. Le premier accès prend 30-60 secondes.
- **Base de données** : PostgreSQL gratuit expire après 90 jours.
- **Logs** : Consultez les logs sur Render si ça ne marche pas.

## 🆘 Problème ?

Si ça ne marche toujours pas :
1. Vérifiez que le backend est "Live" sur Render
2. Testez : https://reddy-portfolio-api.onrender.com/api/health
3. Vérifiez les logs du backend sur Render
4. Vérifiez que vous avez bien rebuild le frontend après avoir modifié `.env`

Dites-moi où vous êtes bloqué et je vous aide !
