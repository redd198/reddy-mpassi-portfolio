# ✅ Checklist de Test - Système Admin

## Avant de commencer

### 1. Vérifier que le serveur tourne
```bash
cd server
node server.js
```

Tu devrais voir : `🚀 Serveur démarré sur le port 5000`

### 2. Vérifier que le frontend tourne
```bash
npm run dev
```

Tu devrais voir : `Local: http://localhost:5173/`

## Tests à effectuer

### ✅ Test 1 : Accès au panneau admin

1. Ouvre ton navigateur
2. Va sur `http://localhost:5173/admin`
3. Tu devrais voir la page de login

**Résultat attendu :** Page de connexion avec formulaire

---

### ✅ Test 2 : Connexion admin

1. Entre les identifiants :
   - Username: `admin`
   - Password: `Admin@2024`
2. Clique sur "Se connecter"

**Résultat attendu :** Redirection vers le dashboard

---

### ✅ Test 3 : Dashboard

1. Vérifie que tu vois :
   - 4 cartes de statistiques (Leads, Réservations, Commandes, Visiteurs)
   - Section "Top Pays des Visiteurs"
   - Section "Leads Récents"

**Résultat attendu :** Dashboard complet avec données

---

### ✅ Test 4 : Navigation entre onglets

Clique sur chaque onglet :
- Dashboard ✅
- Leads ✅
- Réservations ✅
- Commandes ✅
- Visiteurs ✅

**Résultat attendu :** Chaque onglet affiche son contenu

---

### ✅ Test 5 : Tracking des visiteurs

1. Ouvre un nouvel onglet
2. Visite plusieurs pages :
   - `http://localhost:5173/`
   - `http://localhost:5173/about`
   - `http://localhost:5173/coaching`
3. Retourne sur `/admin`
4. Va dans l'onglet "Visiteurs"

**Résultat attendu :** Tu vois tes visites avec ton pays

---

### ✅ Test 6 : Nouveau lead

1. Va sur `http://localhost:5173/landing/livre-gratuit`
2. Remplis le formulaire avec :
   - Prénom: Test
   - Email: test@example.com
   - WhatsApp: +242 06 123 45 67
3. Soumets le formulaire
4. Retourne sur `/admin` → Onglet "Leads"

**Résultat attendu :** 
- Le lead apparaît dans la liste
- Si email configuré : tu reçois une notification

---

### ✅ Test 7 : Nouvelle réservation

1. Va sur `http://localhost:5173/reserver`
2. Remplis le formulaire de réservation
3. Soumets
4. Retourne sur `/admin` → Onglet "Réservations"

**Résultat attendu :** 
- La réservation apparaît
- Si email configuré : tu reçois une notification

---

### ✅ Test 8 : Déconnexion

1. Clique sur le bouton "Déconnexion" en haut à droite
2. Tu devrais être redirigé vers la page de login

**Résultat attendu :** Retour à la page de connexion

---

## 🔧 Résolution de problèmes

### Problème : "Erreur de connexion au serveur"
**Solution :** Vérifie que le serveur backend tourne sur le port 5000

### Problème : "Identifiants incorrects"
**Solution :** 
1. Vérifie que la base de données est à jour
2. Exécute : `mysql -u root -p < database.sql`

### Problème : "Pas de données dans le dashboard"
**Solution :** C'est normal si tu n'as pas encore de leads/réservations

### Problème : "Pays = Inconnu"
**Solution :** 
- Normal en localhost
- En production, l'API détectera le vrai pays

### Problème : "Pas d'email reçu"
**Solution :** 
1. Vérifie la configuration dans `server/.env`
2. Vérifie que `EMAIL_USER` et `EMAIL_PASSWORD` sont corrects
3. Regarde les logs du serveur pour les erreurs

---

## 📊 Résultats Attendus

Après tous les tests, tu devrais avoir :

- ✅ Dashboard fonctionnel
- ✅ Au moins 1 lead dans la liste
- ✅ Au moins 1 réservation
- ✅ Plusieurs entrées dans "Visiteurs"
- ✅ Statistiques mises à jour
- ✅ Top pays avec au moins ton pays

---

## 🎉 Si tous les tests passent

**Félicitations !** Ton système d'administration est 100% opérationnel !

Tu peux maintenant :
1. Configurer les emails pour les notifications
2. Changer le mot de passe admin
3. Commencer à utiliser le système en production

---

## 📞 Besoin d'aide ?

Si un test échoue, vérifie :
1. Les logs du serveur (terminal où tourne `node server.js`)
2. La console du navigateur (F12)
3. Que la base de données est à jour

Contact : reddympassi@gmail.com
