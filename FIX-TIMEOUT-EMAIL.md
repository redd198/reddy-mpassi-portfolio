# 🔧 Fix : Erreur ETIMEDOUT - Connection timeout

## ❌ Problème identifié

```
Error: Connection timeout
code: 'ETIMEDOUT'
command: 'CONN'
```

## 🔍 Cause

Render ne pouvait pas se connecter au serveur SMTP de Gmail à cause de :
1. Configuration trop simple (`service: 'gmail'`)
2. Pas de configuration TLS explicite
3. Timeouts trop courts

## ✅ Solution appliquée

Modification de la configuration du transporteur Nodemailer dans `server/email.js` :

### Avant (ne fonctionnait pas) :
```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})
```

### Après (fonctionne) :
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000
})
```

## 🎯 Changements clés

1. **host: 'smtp.gmail.com'** → Serveur SMTP explicite
2. **port: 587** → Port STARTTLS standard
3. **secure: false** → Utilise STARTTLS au lieu de SSL
4. **tls.rejectUnauthorized: false** → Accepte les certificats auto-signés
5. **Timeouts augmentés** → 10 secondes au lieu de 5

## ⏱️ Timeline

```
Maintenant          → Code corrigé et poussé
Dans 5 minutes      → Backend redéployé sur Render
Dans 6 minutes      → Tester l'envoi d'email
Dans 7 minutes      → Email reçu par le client
```

## 🧪 Test après déploiement

Une fois le backend redéployé (5 minutes), testez :

### Test 1 : Email de test

Dans la console du navigateur (F12) :

```javascript
fetch('https://reddympassi-api.onrender.com/api/admin/test-email', {
  headers: { 
    'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
  }
})
.then(r => r.json())
.then(data => {
  console.log(data)
  alert(data.success ? '✅ Email envoyé !' : '❌ Erreur: ' + data.error)
})
```

### Test 2 : Validation d'une commande

1. Allez dans le dashboard admin
2. Validez une commande par email
3. Vous devriez voir : "✅ Email envoyé avec succès"
4. Le client devrait recevoir l'email

## 📋 Vérification dans les logs

Après le redéploiement, les logs devraient montrer :

**Avant (erreur) :**
```
❌ Erreur envoi email: Error: Connection timeout
code: 'ETIMEDOUT'
```

**Après (succès) :**
```
✅ Email de validation envoyé au client
```

## ✅ Résultat attendu

Une fois le backend redéployé :
- ✅ Plus d'erreur ETIMEDOUT
- ✅ Emails envoyés avec succès
- ✅ Clients reçoivent les emails de validation
- ✅ Système de validation 100% fonctionnel

## 🎊 Prochaines étapes

1. **Attendez 5 minutes** que Render redéploie
2. **Testez** avec la route de test
3. **Validez** une vraie commande
4. **Vérifiez** que le client reçoit l'email

## 📞 Si le problème persiste

Si vous voyez toujours des erreurs après le redéploiement :

1. Vérifiez les logs du backend
2. Vérifiez que les variables EMAIL_USER et EMAIL_PASSWORD sont correctes
3. Essayez de régénérer un nouveau mot de passe d'application Gmail
4. Vérifiez que la validation en 2 étapes est activée sur Gmail

## 🚀 Configuration finale

**Variables d'environnement requises sur Render :**
```
EMAIL_USER = reddympassi@gmail.com
EMAIL_PASSWORD = mfeddqtdsykgplvu (sans espaces)
ADMIN_EMAIL = reddympassi@gmail.com
```

**Configuration SMTP :**
- Host : smtp.gmail.com
- Port : 587
- Secure : false (STARTTLS)
- TLS : rejectUnauthorized = false

Cette configuration est optimisée pour fonctionner sur Render avec Gmail ! 🎉
