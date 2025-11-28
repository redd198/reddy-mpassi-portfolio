# 🚀 Déploiement du Backend sur Render

## Étape 1 : Créer le service Backend sur Render

1. Allez sur https://dashboard.render.com
2. Cliquez sur **"New +"** → **"Web Service"**
3. Connectez votre repository GitHub (celui qui contient ce projet)
4. Configurez le service :

   - **Name** : `reddy-portfolio-api`
   - **Region** : Frankfurt (ou Europe)
   - **Branch** : `main`
   - **Root Directory** : `server`
   - **Runtime** : Node
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Instance Type** : Free

5. Cliquez sur **"Create Web Service"**

## Étape 2 : Créer la base de données PostgreSQL

1. Sur Render, cliquez sur **"New +"** → **"PostgreSQL"**
2. Configurez :
   - **Name** : `reddy-portfolio-db`
   - **Database** : `reddy_portfolio`
   - **User** : `reddy_user`
   - **Region** : Frankfurt (même région que le backend)
   - **Plan** : Free

3. Cliquez sur **"Create Database"**
4. **Copiez les informations de connexion** (Internal Database URL)

## Étape 3 : Configurer les variables d'environnement du Backend

1. Retournez sur votre service `reddy-portfolio-api`
2. Allez dans **"Environment"**
3. Ajoutez ces variables :

```
NODE_ENV=production
DB_HOST=<copiez depuis PostgreSQL - Internal Database URL>
DB_USER=<copiez depuis PostgreSQL>
DB_PASSWORD=<copiez depuis PostgreSQL>
DB_NAME=reddy_portfolio
DB_PORT=5432
JWT_SECRET=votre_secret_jwt_super_securise_2024_changez_moi
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-application-gmail
ADMIN_EMAIL=reddympassi@gmail.com
PORT=5000
```

**Important** : Pour `EMAIL_PASSWORD`, utilisez un "App Password" de Gmail :
- Allez sur https://myaccount.google.com/apppasswords
- Créez un mot de passe d'application pour "Mail"

4. Cliquez sur **"Save Changes"**

## Étape 4 : Attendre le déploiement

Le backend va se déployer automatiquement. Attendez que le statut soit **"Live"**.

Vous aurez une URL comme : `https://reddy-portfolio-api.onrender.com`

## Étape 5 : Initialiser la base de données

Une fois le backend déployé, ouvrez dans votre navigateur :

```
https://reddy-portfolio-api.onrender.com/api/init-database
```

Vous devriez voir : `{ "success": true, "message": "Base de données initialisée avec succès" }`

## Étape 6 : Créer le compte admin

1. Connectez-vous à votre base de données PostgreSQL sur Render
2. Ou utilisez le script `create-admin.js` en local :

```bash
cd server
node create-admin.js
```

Ou exécutez cette requête SQL directement dans PostgreSQL :

```sql
INSERT INTO admins (username, email, password) 
VALUES (
  'admin', 
  'reddympassi@gmail.com', 
  '$2a$10$YourHashedPasswordHere'
);
```

## Étape 7 : Mettre à jour le Frontend

1. Modifiez le fichier `.env` à la racine du projet :

```
VITE_API_URL=https://reddy-portfolio-api.onrender.com
```

2. Rebuild le frontend :

```bash
npm run build
```

3. Commitez et pushez sur GitHub :

```bash
git add .
git commit -m "Configure backend API URL"
git push
```

4. Render va automatiquement redéployer le frontend

## Étape 8 : Tester

1. Allez sur https://reddympassi.site/admin
2. Connectez-vous avec :
   - Username : `admin`
   - Password : `Admin@2024` (ou celui que vous avez créé)

## ✅ Vérifications

Testez ces URLs pour vérifier que tout fonctionne :

- Backend health : https://reddy-portfolio-api.onrender.com/api/health
- Frontend : https://reddympassi.site
- Admin : https://reddympassi.site/admin

## ⚠️ Notes importantes

1. **Premier démarrage lent** : Les services gratuits Render s'endorment après 15 min d'inactivité. Le premier chargement peut prendre 30-60 secondes.

2. **Base de données** : La base PostgreSQL gratuite expire après 90 jours. Pensez à sauvegarder vos données.

3. **CORS** : Le backend est déjà configuré pour accepter toutes les origines (`cors()`). Si vous avez des problèmes, vérifiez dans `server/server.js`.

## 🆘 Problèmes courants

### Le backend ne démarre pas
- Vérifiez les logs sur Render
- Vérifiez que toutes les variables d'environnement sont définies
- Vérifiez que `DB_HOST`, `DB_USER`, `DB_PASSWORD` sont corrects

### "Erreur serveur" sur la page admin
- Vérifiez que le backend est "Live" sur Render
- Testez l'URL : https://reddy-portfolio-api.onrender.com/api/health
- Vérifiez que `.env` contient la bonne URL
- Vérifiez que vous avez rebuild le frontend après avoir modifié `.env`

### La base de données ne se connecte pas
- Utilisez l'URL "Internal Database URL" de PostgreSQL
- Vérifiez que le backend et la DB sont dans la même région
- Vérifiez les credentials

## 📞 Besoin d'aide ?

Si vous êtes bloqué à une étape, dites-moi où et je vous aiderai !
