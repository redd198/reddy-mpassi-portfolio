# ⚡ Fix Rapide - Page Admin

## 🎯 Problème
En local ça marche ✅  
En ligne ça ne marche pas ❌

## 🔧 Solution (5 minutes)

### 1. Déployez le backend sur Railway

```
1. https://railway.app → Login avec GitHub
2. "New Project" → "Deploy from GitHub repo"
3. Sélectionnez votre repo
4. "+ New" → "Database" → "Add PostgreSQL"
```

### 2. Configurez le service

Dans Railway, cliquez sur votre service → **Settings** :

```
Root Directory: server
Build Command: npm install
Start Command: npm start
```

### 3. Ajoutez les variables

Dans **Variables**, ajoutez :

```bash
NODE_ENV=production
JWT_SECRET=changez_moi_secret_2024
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-app-password
ADMIN_EMAIL=reddympassi@gmail.com
```

### 4. Générez un domaine

**Settings** → **Networking** → **Generate Domain**

Copiez l'URL (ex: `https://portfolio-production-xxxx.up.railway.app`)

### 5. Initialisez la DB

Ouvrez dans votre navigateur :
```
https://votre-url-railway.up.railway.app/api/init-database
```

### 6. Créez l'admin

En local :
```bash
cd server
# Copiez DATABASE_URL depuis Railway → PostgreSQL → Connect
export DATABASE_URL="postgresql://postgres:..."
node create-admin.js
```

### 7. Connectez le frontend

Modifiez `.env` :
```
VITE_API_URL=https://votre-url-railway.up.railway.app
```

Rebuild et pushez :
```bash
npm run build
git add .
git commit -m "Add Railway backend"
git push
```

## ✅ Test

Allez sur `https://reddympassi.site/admin`

Login : `admin` / `Admin@2024`

## 🆘 Ça ne marche toujours pas ?

1. Vérifiez que le backend est "Active" sur Railway
2. Testez : `https://votre-url.up.railway.app/api/health`
3. Vérifiez les logs sur Railway
4. Vérifiez que vous avez bien rebuild le frontend

---

**Temps total : 5-10 minutes** ⏱️
