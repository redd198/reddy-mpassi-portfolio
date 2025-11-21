# 🎯 Guide Rapide - Panneau d'Administration

## ✅ Ce qui a été créé

### 1. Panneau d'Administration Complet
- **URL:** `http://localhost:5173/admin`
- **Login:** `admin`
- **Password:** `Admin@2024`

### 2. Fonctionnalités

#### 📊 Dashboard
- Statistiques en temps réel (leads, réservations, commandes, visiteurs)
- Top 10 des pays visiteurs
- Leads récents
- Visiteurs du jour

#### 🎯 Gestion des Leads
- Liste complète avec filtres
- Informations : prénom, email, WhatsApp, source, produit
- Mise à jour des statuts

#### 📅 Réservations de Coaching
- Toutes les réservations
- Détails complets (thème, objectif, date, paiement)

#### 📚 Commandes de Livres
- Suivi des commandes
- Coordonnées clients

#### 🌍 Tracking des Visiteurs
- Pays et ville de chaque visiteur
- Pages visitées
- Analyse géographique en temps réel

### 3. Notifications Email Automatiques

Tu recevras un email à chaque :
- ✉️ Nouveau lead (livre gratuit)
- ✉️ Nouvelle réservation de coaching
- ✉️ Nouvelle commande de livre

## 🚀 Démarrage Rapide

### Étape 1 : Mettre à jour la base de données

```bash
cd server
mysql -u root -p < database.sql
```

Cela va créer :
- Table `admins` (pour la connexion)
- Table `visitors` (tracking des visiteurs)
- Admin par défaut avec le mot de passe hashé

### Étape 2 : Configurer les emails (optionnel mais recommandé)

Édite le fichier `server/.env` :

```env
EMAIL_USER=ton-email@gmail.com
EMAIL_PASSWORD=ton-mot-de-passe-application
ADMIN_EMAIL=reddympassi@gmail.com
```

**Pour obtenir le mot de passe d'application Gmail :**
1. Va sur ton compte Google
2. Sécurité → Validation en 2 étapes (active-la si ce n'est pas fait)
3. Mots de passe d'application → Sélectionne "Autre"
4. Nomme-le "Reddy Portfolio"
5. Copie le mot de passe de 16 caractères
6. Colle-le dans `EMAIL_PASSWORD`

### Étape 3 : Redémarrer le serveur

```bash
# Arrête le serveur actuel (Ctrl+C)
node server.js
```

### Étape 4 : Accéder au panneau admin

1. Ouvre ton navigateur
2. Va sur `http://localhost:5173/admin`
3. Connecte-toi avec :
   - Username: `admin`
   - Password: `Admin@2024`

## 📱 Test Complet

### Test 1 : Tracking des visiteurs
1. Visite différentes pages de ton site
2. Va sur `/admin` → Onglet "Visiteurs"
3. Tu verras toutes tes visites avec le pays

### Test 2 : Nouveau lead
1. Va sur `/landing/livre-gratuit`
2. Remplis le formulaire
3. Vérifie dans `/admin` → Onglet "Leads"
4. Si configuré, tu recevras un email

### Test 3 : Réservation
1. Va sur `/reserver`
2. Fais une réservation de coaching
3. Vérifie dans `/admin` → Onglet "Réservations"
4. Email de notification envoyé

## 🔒 Sécurité

### Changer le mot de passe admin

```bash
cd server
node create-admin.js
```

Copie le hash généré et exécute dans MySQL :
```sql
UPDATE admins SET password = 'nouveau_hash_ici' WHERE username = 'admin';
```

## 📊 Statistiques Disponibles

- **Total leads** : Nombre de personnes intéressées
- **Réservations** : Nombre de sessions de coaching réservées
- **Commandes** : Nombre de livres commandés
- **Visiteurs** : Nombre de visites sur le site
- **Top Pays** : D'où viennent tes visiteurs
- **Trafic du jour** : Visiteurs aujourd'hui

## 🌍 Tracking Géographique

Le système détecte automatiquement :
- Le pays du visiteur
- La ville
- La page visitée
- L'heure de visite

Utilise l'API gratuite ipapi.co (pas de clé API nécessaire).

## 💡 Conseils

1. **Consulte le dashboard quotidiennement** pour voir l'évolution
2. **Réponds rapidement aux leads** via WhatsApp ou email
3. **Exporte les données** régulièrement pour analyse
4. **Surveille les pays** pour adapter ta stratégie marketing

## 🚨 En cas de problème

### Erreur de connexion admin
- Vérifie que la base de données est à jour
- Vérifie que le serveur tourne
- Essaie de vider le cache du navigateur

### Pas de tracking des visiteurs
- Vérifie que la table `visitors` existe
- Vérifie les logs du serveur

### Pas d'emails reçus
- Vérifie la configuration Gmail
- Vérifie que le mot de passe d'application est correct
- Regarde les spams

## 📞 Support

Pour toute question : reddympassi@gmail.com
