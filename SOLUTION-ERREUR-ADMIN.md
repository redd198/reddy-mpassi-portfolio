# Solution pour l'erreur "Erreur serveur" sur la page Admin

## Problème identifié

Le frontend (https://reddympassi.site) est déployé, mais le **backend API n'est pas accessible**.

Quand vous essayez de vous connecter à `/admin`, le frontend tente de contacter l'API backend, mais celle-ci n'existe pas ou n'est pas déployée.

## Solutions

### Solution 1 : Déployer le backend sur Render (RECOMMANDÉ)

1. **Créer un nouveau service Web sur Render** :
   - Allez sur https://dashboard.render.com
   - Cliquez sur "New +" → "Web Service"
   - Connectez votre repository GitHub
   - Configurez :
     - **Name** : `reddy-portfolio-api`
     - **Region** : Frankfurt (ou proche de vous)
     - **Branch** : main
     - **Root Directory** : `server`
     - **Build Command** : `npm install`
     - **Start Command** : `npm start`
     - **Plan** : Free

2. **Configurer les variables d'environnement** sur Render :
   ```
   NODE_ENV=production
   DB_HOST=<votre-host-postgres>
   DB_USER=<votre-user>
   DB_PASSWORD=<votre-password>
   DB_NAME=reddy_portfolio
   JWT_SECRET=votre_secret_jwt_securise_2024
   EMAIL_USER=votre-email@gmail.com
   EMAIL_PASSWORD=votre-mot-de-passe-app
   ADMIN_EMAIL=reddympassi@gmail.com
   PORT=5000
   ```

3. **Créer une base de données PostgreSQL** sur Render :
   - Cliquez sur "New +" → "PostgreSQL"
   - Name : `reddy-portfolio-db`
   - Copiez les informations de connexion dans les variables d'environnement ci-dessus

4. **Mettre à jour le fichier `.env` local** avec l'URL de votre API :
   ```
   VITE_API_URL=https://reddy-portfolio-api.onrender.com
   ```

5. **Rebuild le frontend** avec la nouvelle URL :
   ```bash
   npm run build
   ```

6. **Redéployer le frontend** sur Render

### Solution 2 : Tester en local d'abord

Si vous voulez tester localement avant de déployer :

1. **Démarrer le backend localement** :
   ```bash
   cd server
   npm install
   npm start
   ```

2. **Dans un autre terminal, démarrer le frontend** :
   ```bash
   npm install
   npm run dev
   ```

3. **Accéder à** : http://localhost:5173/admin
   - Username : `admin`
   - Password : `Admin@2024`

### Solution 3 : Utiliser un backend existant

Si vous avez déjà un backend déployé ailleurs :

1. Modifiez le fichier `.env` à la racine du projet :
   ```
   VITE_API_URL=https://votre-backend-existant.com
   ```

2. Rebuild et redéployez :
   ```bash
   npm run build
   ```

## Vérification

Pour vérifier que votre API fonctionne, testez cette URL dans votre navigateur :
```
https://votre-api-backend.onrender.com/api/health
```

Vous devriez voir :
```json
{
  "status": "OK",
  "message": "API fonctionnelle"
}
```

## Prochaines étapes

1. ✅ Créer un compte admin dans la base de données
2. ✅ Configurer les emails (Gmail App Password)
3. ✅ Tester la connexion admin
4. ✅ Vérifier que toutes les routes API fonctionnent

## Besoin d'aide ?

Si vous avez besoin d'aide pour :
- Déployer le backend sur Render
- Configurer la base de données PostgreSQL
- Créer le compte admin

Dites-moi et je vous guiderai étape par étape !
