# Test de la fonctionnalité de validation des commandes

## Prérequis

1. Backend déployé et fonctionnel
2. Base de données PostgreSQL configurée
3. Compte admin créé

## Étapes de test

### 1. Exécuter la migration

Connectez-vous au dashboard admin, puis dans la console du navigateur :

```javascript
// Récupérer le token depuis localStorage
const token = localStorage.getItem('adminToken')

// Exécuter la migration
fetch('https://votre-backend.onrender.com/api/admin/migrate-commandes', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(r => r.json())
.then(console.log)
```

### 2. Créer une commande de test

Visitez la page de commande de livre sur votre site et remplissez le formulaire :

- Nom : Test User
- Email : test@example.com
- WhatsApp : +33612345678
- Livre : Au choix

### 3. Vérifier dans le dashboard

1. Connectez-vous au dashboard admin
2. Allez dans l'onglet "Commandes"
3. Vous devriez voir la commande avec le statut "⏳ En attente"
4. Un bouton "✓ Valider" devrait être visible

### 4. Tester la validation

1. Cliquez sur "✓ Valider"
2. Un modal s'ouvre
3. Choisissez le canal (WhatsApp ou Email)
4. Personnalisez le message si nécessaire
5. Vérifiez l'aperçu du message
6. Cliquez sur "Valider et envoyer"

### 5. Vérifications

- [ ] Le statut de la commande passe à "✓ Validée"
- [ ] Le bouton "Valider" disparaît
- [ ] Un nouvel onglet s'ouvre avec :
  - WhatsApp Web (si WhatsApp choisi)
  - Client email (si Email choisi)
- [ ] Le message est pré-rempli avec les bonnes informations

## Exemples de messages

### Message WhatsApp
```
Bonjour {nom},

Votre commande pour le livre "{livre}" a été validée ! 🎉

Nous vous contacterons très prochainement pour finaliser la livraison.

Merci pour votre confiance !

Cordialement,
L'équipe
```

### Message Email
```
Bonjour {nom},

Nous avons le plaisir de vous confirmer que votre commande pour le livre "{livre}" a été validée.

Détails de votre commande :
- Livre : {livre}
- Email : {email}
- WhatsApp : {whatsapp}

Nous vous contacterons dans les plus brefs délais pour organiser la livraison.

Merci pour votre confiance !

Cordialement,
L'équipe
```

## Dépannage

### La colonne statut n'existe pas
Exécutez la migration via la route `/api/admin/migrate-commandes`

### Le modal ne s'ouvre pas
Vérifiez la console du navigateur pour les erreurs JavaScript

### Le lien WhatsApp ne fonctionne pas
Vérifiez que le numéro WhatsApp est au format international (+33...)

### Le lien Email ne s'ouvre pas
Vérifiez que vous avez un client email configuré sur votre système
