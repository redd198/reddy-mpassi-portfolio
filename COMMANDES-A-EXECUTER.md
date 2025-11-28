# 📝 Commandes à exécuter - Fix Admin

## Étape 1 : Récupérer l'URL de votre backend Railway

1. Allez sur https://railway.app
2. Connectez-vous
3. Ouvrez votre projet portfolio
4. Cliquez sur le service backend
5. Allez dans **Settings** → **Networking** → **Public Networking**
6. Copiez l'URL (ex: `https://portfolio-production-a1b2.up.railway.app`)

## Étape 2 : Modifier le fichier .env

Ouvrez le fichier `.env` à la racine du projet et remplacez :

```bash
VITE_API_URL=https://votre-backend-railway.up.railway.app
```

Par votre vraie URL Railway, par exemple :

```bash
VITE_API_URL=https://portfolio-production-a1b2.up.railway.app
```

## Étape 3 : Tester en local (optionnel)

Pour vérifier que ça fonctionne avant de déployer :

```bash
npm run dev
```

Puis allez sur http://localhost:5173/admin

## Étape 4 : Rebuild le frontend

```bash
npm run build
```

## Étape 5 : Commiter et pousser

```bash
git add .env.example railway.json
git commit -m "Configure Railway backend for production"
git push
```

**IMPORTANT** : Ne commitez PAS le fichier `.env` lui-même !

## Étape 6 : Attendre le redéploiement

Votre frontend va se redéployer automatiquement (2-3 minutes).

Vous pouvez suivre le déploiement sur votre plateforme (Render, Netlify, Vercel, etc.)

## Étape 7 : Tester en production

1. Allez sur https://reddympassi.site/admin
2. Connectez-vous :
   - Username : `admin`
   - Password : `Admin@2024`

## ✅ Vérifications

### Test 1 : Backend accessible

Ouvrez dans votre navigateur :
```
https://votre-url-railway.up.railway.app/api/health
```

Vous devriez voir :
```json
{
  "status": "OK",
  "message": "API fonctionnelle"
}
```

### Test 2 : Frontend connecté au backend

1. Ouvrez https://reddympassi.site/admin
2. Ouvrez la console (F12)
3. Essayez de vous connecter
4. Regardez les requêtes réseau
5. Vérifiez que l'URL appelée est bien votre URL Railway

## 🆘 Problèmes ?

### "Erreur serveur" persiste

1. Vérifiez que vous avez bien modifié `.env`
2. Vérifiez que vous avez rebuild (`npm run build`)
3. Vérifiez que vous avez pushez sur GitHub
4. Attendez 2-3 minutes pour le redéploiement
5. Videz le cache du navigateur (Ctrl+Shift+R)

### Backend ne répond pas

1. Vérifiez que le backend est "Active" sur Railway
2. Consultez les logs sur Railway
3. Vérifiez les variables d'environnement
4. Le premier accès peut prendre 30 secondes (service endormi)

### Compte admin n'existe pas

Si vous n'avez pas encore créé le compte admin :

```bash
cd server
# Copiez DATABASE_URL depuis Railway
set DATABASE_URL=postgresql://postgres:...
node create-admin.js
```

Ou suivez l'étape 6 dans `DEPLOIEMENT-RAILWAY.md`

## 📋 Résumé des commandes

```bash
# 1. Modifier .env avec votre URL Railway
# 2. Rebuild
npm run build

# 3. Commiter (sans .env)
git add .env.example railway.json
git commit -m "Configure Railway backend"
git push

# 4. Attendre 2-3 minutes
# 5. Tester sur https://reddympassi.site/admin
```

## 🎯 Temps estimé

- Si backend déjà déployé : **5 minutes**
- Si backend à déployer : **15 minutes**

Bonne chance ! 🚀
