# 🧪 Test de la configuration Email

## 🎯 Objectif

Vérifier que les variables d'environnement email sont bien configurées et que l'envoi fonctionne.

## ⚡ Test rapide (dans 5 minutes)

Une fois le backend redéployé, testez la configuration email :

### Étape 1 : Ouvrir la console

1. Allez sur https://reddympassi.site/admin
2. Connectez-vous
3. Appuyez sur **F12**
4. Allez dans l'onglet **"Console"**

### Étape 2 : Exécuter le test

Tapez ou collez ce code :

```javascript
fetch('https://reddympassi-api.onrender.com/api/admin/test-email', {
  headers: { 
    'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
  }
})
.then(r => r.json())
.then(data => {
  console.log('Résultat test:', data)
  if (data.success) {
    alert('✅ Email de test envoyé ! Vérifiez votre boîte email: ' + data.sentTo)
  } else {
    alert('❌ Erreur: ' + data.error + '\n\nConfig: ' + JSON.stringify(data.config, null, 2))
  }
})
```

### Étape 3 : Vérifier le résultat

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

Vérifiez votre boîte email (et les spams).

**Si erreur :**
```json
{
  "success": false,
  "error": "Invalid login: 535-5.7.8 Username and Password not accepted",
  "config": {
    "EMAIL_USER": "✅ Configuré",
    "EMAIL_PASSWORD": "❌ Manquant",
    "ADMIN_EMAIL": "✅ Configuré"
  }
}
```

## 🔧 Problèmes courants

### Erreur : "Invalid login"

**Cause :** Mot de passe d'application Gmail incorrect

**Solution :**
1. Allez sur https://myaccount.google.com/apppasswords
2. Supprimez l'ancien mot de passe d'application
3. Créez-en un nouveau
4. Copiez-le SANS espaces : `abcdefghijklmnop`
5. Mettez à jour `EMAIL_PASSWORD` sur Render
6. Redéployez le backend

### Erreur : "Missing credentials"

**Cause :** Variables EMAIL_USER ou EMAIL_PASSWORD manquantes

**Solution :**
1. Allez sur Render Dashboard > Backend > Environment
2. Vérifiez que ces 3 variables existent :
   - `EMAIL_USER` = votre-email@gmail.com
   - `EMAIL_PASSWORD` = mfeddqtdsykgplvu (sans espaces)
   - `ADMIN_EMAIL` = reddympassi@gmail.com
3. Redéployez le backend

### Email non reçu mais pas d'erreur

**Cause :** Email dans les spams ou délai de livraison

**Solution :**
1. Vérifiez votre dossier spam
2. Attendez 1-2 minutes
3. Vérifiez les logs du backend sur Render

## 📋 Checklist de vérification

- [ ] Backend redéployé (statut "Live" sur Render)
- [ ] Variables EMAIL_USER, EMAIL_PASSWORD, ADMIN_EMAIL configurées
- [ ] Test exécuté via la console
- [ ] Message de succès reçu
- [ ] Email de test reçu dans la boîte email
- [ ] Validation d'une vraie commande testée
- [ ] Client reçoit l'email de validation

## 🎯 Une fois le test réussi

Si le test fonctionne, la validation des commandes devrait aussi fonctionner !

Testez en validant une vraie commande :
1. Créez une commande avec votre email
2. Validez-la depuis le dashboard
3. Vous devriez recevoir l'email

## 📞 Si le test échoue

1. Vérifiez les logs du backend sur Render
2. Vérifiez que les variables sont bien configurées
3. Vérifiez que le mot de passe Gmail est correct (sans espaces)
4. Essayez de régénérer un nouveau mot de passe d'application Gmail

## ⏱️ Timeline

```
Maintenant          → Code poussé
Dans 5 minutes      → Backend redéployé
Dans 6 minutes      → Exécuter le test
Dans 7 minutes      → Vérifier l'email reçu
```

**Attendez 5 minutes que Render déploie, puis exécutez le test !** 🚀
