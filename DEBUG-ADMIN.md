# 🐛 Debug - Page Admin

## Étape 1 : Vérifier l'erreur exacte

1. Allez sur https://reddympassi.site/admin
2. Appuyez sur **F12** pour ouvrir la console
3. Allez dans l'onglet **"Console"**
4. Essayez de vous connecter
5. Regardez les erreurs qui s'affichent

## Étape 2 : Vérifier les requêtes réseau

1. Dans les outils de développement (F12)
2. Allez dans l'onglet **"Network"** (Réseau)
3. Essayez de vous connecter
4. Regardez la requête vers `/api/admin/login`
5. Vérifiez :
   - Quelle URL est appelée ?
   - Quel est le code de réponse ? (200, 404, 500, etc.)
   - Quel est le message d'erreur ?

## Erreurs possibles

### Erreur 1 : URL incorrecte
Si vous voyez `http://localhost:5000/api/admin/login` :
- ❌ La variable `VITE_API_URL` n'est pas configurée
- ✅ Solution : Configurer sur Render (voir ci-dessous)

### Erreur 2 : CORS Error
Si vous voyez "CORS policy" :
- ❌ Le backend bloque les requêtes du frontend
- ✅ Solution : Vérifier la configuration CORS dans `server/server.js`

### Erreur 3 : 404 Not Found
Si vous voyez 404 :
- ❌ Le backend n'est pas accessible
- ✅ Solution : Vérifier que le backend est déployé et actif

### Erreur 4 : 500 Internal Server Error
Si vous voyez 500 :
- ❌ Erreur dans le backend (base de données, etc.)
- ✅ Solution : Consulter les logs du backend sur Render

### Erreur 5 : Timeout
Si la requête ne répond jamais :
- ❌ Le backend est endormi (plan gratuit Render)
- ✅ Solution : Attendre 30-60 secondes

## Solution : Configurer VITE_API_URL sur Render

### Méthode 1 : Via l'interface Render

1. https://dashboard.render.com
2. Cliquez sur votre service **frontend** (reddympassi ou reddy-portfolio-frontend)
3. Menu **"Environment"**
4. **"Add Environment Variable"**
   - Key : `VITE_API_URL`
   - Value : `https://reddympassi-api.onrender.com`
5. **"Save Changes"**
6. **"Manual Deploy"** → **"Deploy latest commit"**

### Méthode 2 : Via render.yaml (déjà fait)

Le fichier `render.yaml` a déjà été mis à jour avec :

```yaml
envVars:
  - key: VITE_API_URL
    value: https://reddympassi-api.onrender.com
```

Mais il faut que Render prenne en compte ce changement.

### Méthode 3 : Forcer le redéploiement

```bash
# Faire un petit changement pour forcer le redéploiement
git commit --allow-empty -m "Force redeploy with VITE_API_URL"
git push
```

## Test rapide

### Test 1 : Backend accessible
Ouvrez dans votre navigateur :
```
https://reddympassi-api.onrender.com/api/health
```

Résultat attendu :
```json
{"status":"OK","message":"API fonctionnelle"}
```

### Test 2 : Frontend build local
En local, pour vérifier que ça fonctionne :

```bash
# Définir la variable
$env:VITE_API_URL="https://reddympassi-api.onrender.com"

# Build
npm run build

# Tester
npm run preview
```

Puis allez sur http://localhost:4173/admin

## Informations à me donner

Pour que je puisse vous aider davantage, dites-moi :

1. **Quelle URL est appelée ?** (visible dans Network/Réseau)
2. **Quel est le code d'erreur ?** (200, 404, 500, etc.)
3. **Quel est le message d'erreur exact ?** (dans la console)
4. **Avez-vous ajouté la variable sur Render ?** (oui/non)
5. **Le backend répond-il ?** (testez `/api/health`)

Avec ces informations, je pourrai vous aider plus précisément ! 🔍
