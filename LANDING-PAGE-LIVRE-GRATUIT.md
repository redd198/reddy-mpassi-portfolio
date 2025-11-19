# Landing Page Livre Gratuit - Documentation

## 🎯 Objectif

Capturer les leads (email + WhatsApp) avant de donner accès au livre gratuit.

---

## 📋 Ce qui a été créé

### 1. **Landing Page** : `/landing/livre-gratuit`

**Fichier** : `src/components/LandingLivreGratuit.jsx`

**Contenu** :
- ✅ Titre accrocheur avec badge "100% GRATUIT"
- ✅ Image de couverture du livre
- ✅ Liste de 8 bénéfices avec icônes
- ✅ Témoignage client avec 5 étoiles
- ✅ Formulaire de capture avec 4 champs :
  - Prénom
  - Email
  - WhatsApp
  - Préférence (Email ou WhatsApp)
- ✅ Bouton CTA : "Recevoir mon livre GRATUIT"
- ✅ Éléments de réassurance (téléchargement immédiat, pas de spam, 100% gratuit)
- ✅ Badge de sécurité

### 2. **Page de remerciement** (intégrée)

Après soumission du formulaire :
- ✅ Message de félicitations
- ✅ Confirmation d'envoi sur Email/WhatsApp
- ✅ Bouton de téléchargement direct
- ✅ Invitation à rejoindre le groupe WhatsApp
- ✅ Lien retour à l'accueil

### 3. **API Backend** : `/api/leads`

**Fichier** : `server/server.js`

**Fonctionnalité** :
- Enregistre les leads dans la base de données
- Champs : prénom, email, whatsapp, préférence, source, produit
- Gestion des doublons
- Réponse JSON avec succès/erreur

### 4. **Table MySQL** : `leads`

**Fichier** : `server/database.sql`

**Structure** :
```sql
CREATE TABLE leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(50) NOT NULL,
    preference ENUM('email', 'whatsapp') DEFAULT 'whatsapp',
    source VARCHAR(100) DEFAULT 'site-web',
    produit VARCHAR(255) DEFAULT 'Livre gratuit',
    statut ENUM('nouveau', 'contacte', 'converti') DEFAULT 'nouveau',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_email_source (email, source)
);
```

### 5. **Modification du bouton** dans `/livres`

**Fichier** : `src/components/BooksPage.jsx`

**Avant** : Téléchargement direct du PDF  
**Après** : Redirection vers `/landing/livre-gratuit`

---

## 🔄 Parcours utilisateur

1. **Visiteur** clique sur "Recevoir mon livre GRATUIT" sur `/livres`
2. **Redirection** vers `/landing/livre-gratuit`
3. **Formulaire** : Visiteur remplit prénom, email, WhatsApp
4. **Soumission** : Données envoyées à l'API `/api/leads`
5. **Enregistrement** : Lead sauvegardé dans MySQL
6. **Page de remerciement** : Affichage avec lien de téléchargement
7. **Email/WhatsApp** : Envoi automatique du lien (à configurer)
8. **Téléchargement** : Accès au PDF

---

## 📧 Prochaines étapes (à implémenter)

### **Étape 1 : Envoi automatique d'emails**

**Outil recommandé** : Mailchimp / Sendinblue / Brevo

**Configuration** :
1. Créer un compte sur Sendinblue (gratuit jusqu'à 300 emails/jour)
2. Obtenir une clé API
3. Créer un template d'email avec le lien du livre
4. Intégrer l'API dans le backend

**Code à ajouter dans `server/server.js`** :
```javascript
// Après l'enregistrement du lead
const nodemailer = require('nodemailer');

// Configuration email
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  auth: {
    user: process.env.SENDINBLUE_USER,
    pass: process.env.SENDINBLUE_PASSWORD
  }
});

// Envoi de l'email
await transporter.sendMail({
  from: 'contact@reddympassi.site',
  to: email,
  subject: '📚 Votre livre gratuit vous attend !',
  html: `
    <h1>Bonjour ${prenom} !</h1>
    <p>Merci pour votre intérêt. Voici votre livre gratuit :</p>
    <a href="https://reddympassi.site/books/livre-gratuit.pdf">Télécharger maintenant</a>
  `
});
```

### **Étape 2 : Envoi automatique sur WhatsApp**

**Option A : WhatsApp Business API** (Payant - 49$/mois)
- Wati.io
- Twilio
- MessageBird

**Option B : Manuel** (Gratuit)
- Consulter la table `leads` chaque jour
- Envoyer manuellement les messages WhatsApp

**Message type** :
```
Bonjour [Prénom] ! 👋

Merci pour votre inscription. Voici votre livre gratuit :

📚 Le cerveau de l'entrepreneur e-commerce

Lien de téléchargement : [lien]

Rejoignez notre groupe WhatsApp pour des conseils exclusifs : [lien groupe]

À très vite !
Reddy Mpassi
```

### **Étape 3 : Séquence de suivi automatique**

**J+1** : Conseil pratique tiré du livre  
**J+3** : Étude de cas  
**J+5** : Invitation webinaire  
**J+7** : Offre coaching  
**J+10** : Témoignage + offre spéciale  
**J+14** : Dernière chance

---

## 🧪 Tests à effectuer

### **En local** :

1. Démarrer le backend :
```bash
cd server
npm run dev
```

2. Démarrer le frontend :
```bash
npm run dev
```

3. Tester le parcours :
   - Aller sur http://localhost:5173/livres
   - Cliquer sur "Recevoir mon livre GRATUIT"
   - Remplir le formulaire
   - Vérifier la page de remerciement
   - Vérifier que le lead est dans la base de données :
   ```sql
   SELECT * FROM leads;
   ```

### **En production** :

1. Pousser sur GitHub :
```bash
git add .
git commit -m "Add landing page for free book with lead capture"
git push
```

2. Attendre le déploiement Render (2-3 minutes)

3. Tester sur https://reddympassi.site/landing/livre-gratuit

---

## 📊 Métriques à suivre

### **Dans la base de données** :
```sql
-- Nombre total de leads
SELECT COUNT(*) FROM leads;

-- Leads par source
SELECT source, COUNT(*) FROM leads GROUP BY source;

-- Leads par préférence
SELECT preference, COUNT(*) FROM leads GROUP BY preference;

-- Leads par jour
SELECT DATE(created_at), COUNT(*) FROM leads GROUP BY DATE(created_at);

-- Taux de conversion (leads qui ont acheté)
SELECT 
  COUNT(*) as total_leads,
  SUM(CASE WHEN statut = 'converti' THEN 1 ELSE 0 END) as convertis,
  (SUM(CASE WHEN statut = 'converti' THEN 1 ELSE 0 END) / COUNT(*)) * 100 as taux_conversion
FROM leads;
```

### **Avec Google Analytics** :
- Visiteurs sur `/landing/livre-gratuit`
- Taux de rebond
- Temps passé sur la page
- Taux de soumission du formulaire

---

## 🎯 Optimisations futures

1. **A/B Testing** :
   - Tester différents titres
   - Tester différentes couleurs de bouton
   - Tester avec/sans témoignage

2. **Urgence** :
   - Ajouter un compteur "Plus que X places disponibles"
   - Ajouter "Offre limitée jusqu'à [date]"

3. **Preuve sociale** :
   - Ajouter "Déjà 500+ téléchargements"
   - Ajouter plus de témoignages

4. **Exit Intent Popup** :
   - Quand l'utilisateur veut quitter sans remplir le formulaire
   - Proposer un bonus supplémentaire

---

## 📞 Support

**Email** : contact@reddympassi.site  
**WhatsApp** : +242 05 041 66 61  
**Site** : https://reddympassi.site
