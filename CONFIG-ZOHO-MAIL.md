# 📧 Configuration Zoho Mail pour l'envoi d'emails

## ✅ Avantages de Zoho Mail

- ✅ Email professionnel : contact@reddympassi.site
- ✅ Plus fiable que Gmail pour les serveurs
- ✅ Pas de limite stricte comme Gmail
- ✅ Meilleure délivrabilité

## 🔧 Configuration sur Render

### Étape 1 : Obtenir le mot de passe Zoho

Vous avez 2 options :

#### Option A : Utiliser votre mot de passe Zoho normal
Si vous n'avez pas activé la validation en 2 étapes sur Zoho, utilisez votre mot de passe normal.

#### Option B : Créer un mot de passe d'application (RECOMMANDÉ)
Si vous avez activé la validation en 2 étapes :

1. Allez sur https://accounts.zoho.com/home
2. Cliquez sur **"Security"** ou **"Sécurité"**
3. Cherchez **"App Passwords"** ou **"Mots de passe d'application"**
4. Créez un nouveau mot de passe pour "Nodemailer"
5. Copiez le mot de passe généré

### Étape 2 : Configurer les variables sur Render

1. Allez sur **https://dashboard.render.com**
2. Cliquez sur votre service **backend**
3. Allez dans **"Environment"**
4. Modifiez ou ajoutez ces variables :

```
EMAIL_USER = contact@reddympassi.site
EMAIL_PASSWORD = votre-mot-de-passe-zoho
ADMIN_EMAIL = reddympassi@gmail.com
```

**Important :** 
- `EMAIL_USER` doit être **contact@reddympassi.site** (pas Gmail)
- `EMAIL_PASSWORD` doit être votre mot de passe Zoho
- `ADMIN_EMAIL` reste **reddympassi@gmail.com** (pour recevoir les notifications)

### Étape 3 : Sauvegarder et redéployer

1. Cliquez sur **"Save Changes"**
2. Render va automatiquement redéployer
3. Attendez 5 minutes

## 📋 Configuration SMTP Zoho

```
Host: smtp.zoho.com
Port: 465
Secure: true (SSL)
Auth:
  - User: contact@reddympassi.site
  - Pass: votre-mot-de-passe-zoho
```

## 🧪 Test après configuration

Une fois le backend redéployé, testez dans la console du navigateur (F12) :

```javascript
fetch('https://reddympassi-api.onrender.com/api/admin/test-email', {
  headers: { 
    'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
  }
})
.then(r => r.json())
.then(data => {
  console.log(data)
  alert(data.success ? '✅ Email Zoho envoyé !' : '❌ Erreur: ' + data.error)
})
```

## ✅ Résultat attendu

**Si succès :**
```json
{
  "success": true,
  "message": "Email de test envoyé avec succès",
  "sentTo": "reddympassi@gmail.com",
  "config": {
    "EMAIL_USER": "✅ Configuré",
    "EMAIL_PASSWORD": "✅ Configuré",
    "ADMIN_EMAIL": "✅ Configuré"
  }
}
```

Vérifiez votre boîte email reddympassi@gmail.com

## 🎯 Avantages de cette configuration

1. **Email professionnel** : Les emails viennent de contact@reddympassi.site
2. **Meilleure délivrabilité** : Moins de risque de spam
3. **Plus fiable** : Zoho fonctionne mieux sur les serveurs que Gmail
4. **Professionnel** : Renforce votre image de marque

## 📧 Exemple d'email reçu

**De :** contact@reddympassi.site  
**À :** client@example.com  
**Sujet :** ✅ Confirmation de votre commande - Guide du développeur

```
✅ Commande Validée

Bonjour Jean Dupont,

Votre commande pour le livre "Guide du développeur" a été validée !

Nous vous contacterons très prochainement pour finaliser la livraison.

Merci pour votre confiance !

Cordialement,
L'équipe Reddy Mpassi
```

## 🆘 Dépannage

### Erreur : "Invalid login"

**Cause :** Mot de passe Zoho incorrect

**Solution :**
1. Vérifiez que vous utilisez le bon mot de passe
2. Si vous avez la validation en 2 étapes, créez un mot de passe d'application
3. Mettez à jour `EMAIL_PASSWORD` sur Render

### Erreur : "Connection timeout"

**Cause :** Zoho bloque peut-être votre IP

**Solution :**
1. Vérifiez que votre compte Zoho est actif
2. Essayez de vous connecter à Zoho Mail depuis un navigateur
3. Vérifiez qu'il n'y a pas de restriction sur votre compte

### Email non reçu

**Cause :** Email dans les spams

**Solution :**
1. Vérifiez le dossier spam
2. Ajoutez contact@reddympassi.site aux contacts
3. Vérifiez les logs du backend sur Render

## ⏱️ Timeline

```
Maintenant          → Code Zoho configuré et poussé
Dans 5 minutes      → Backend redéployé sur Render
Dans 6 minutes      → Configurer les variables sur Render
Dans 7 minutes      → Tester l'envoi d'email
Dans 8 minutes      → Email reçu !
```

## 🎊 Prochaines étapes

1. **Attendez 5 minutes** que le code se déploie
2. **Configurez les variables** sur Render avec vos identifiants Zoho
3. **Testez** avec la route de test
4. **Validez** une vraie commande

Zoho Mail est la solution parfaite pour votre cas ! 🚀
