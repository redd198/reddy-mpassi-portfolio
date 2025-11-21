# 🔐 Guide du Panneau d'Administration

## Configuration Initiale

### 1. Configuration de la Base de Données

Exécutez le script SQL mis à jour :
```bash
mysql -u root -p < database.sql
```

### 2. Configuration des Variables d'Environnement

Créez un fichier `.env` dans le dossier `server/` :

```env
# Base de données
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=reddy_portfolio

# JWT Secret (IMPORTANT: Changez en production!)
JWT_SECRET=votre_secret_jwt_super_securise_changez_moi

# Configuration Email Gmail
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-application
ADMIN_EMAIL=reddympassi@gmail.com

PORT=5000
```

### 3. Configuration Gmail pour les Notifications

Pour recevoir les emails de notification :

1. Allez sur votre compte Gmail
2. Activez la validation en 2 étapes
3. Générez un "Mot de passe d'application" :
   - Compte Google → Sécurité → Validation en 2 étapes → Mots de passe d'application
   - Sélectionnez "Autre" et nommez-le "Reddy Portfolio"
   - Copiez le mot de passe généré (16 caractères)
4. Utilisez ce mot de passe dans `EMAIL_PASSWORD`

## Accès au Panneau Admin

### URL d'accès
```
http://localhost:5173/admin
```

### Identifiants par défaut
- **Username:** `admin`
- **Password:** `Admin@2024`

⚠️ **IMPORTANT:** Changez ces identifiants en production !

## Fonctionnalités

### 📊 Dashboard
- Statistiques en temps réel
- Top pays des visiteurs
- Leads récents
- Graphiques de performance

### 🎯 Gestion des Leads
- Liste complète des leads
- Filtrage par source/statut
- Export des données
- Mise à jour du statut

### 📅 Gestion des Réservations
- Toutes les réservations de coaching
- Statuts : en_attente, confirmée, annulée
- Détails complets de chaque réservation

### 📚 Gestion des Commandes
- Commandes de livres
- Suivi des statuts
- Coordonnées des clients

### 🌍 Tracking des Visiteurs
- Pays et ville des visiteurs
- Pages visitées
- Statistiques de trafic
- Analyse géographique

## Notifications Email

Vous recevrez automatiquement un email pour :
- ✅ Chaque nouveau lead
- ✅ Chaque nouvelle réservation
- ✅ Chaque nouvelle commande

Les emails contiennent toutes les informations importantes.

## Sécurité

### Changer le mot de passe admin

1. Générez un nouveau hash :
```bash
node create-admin.js
```

2. Mettez à jour dans la base de données :
```sql
UPDATE admins SET password = 'nouveau_hash' WHERE username = 'admin';
```

### Token JWT
- Les tokens expirent après 24h
- Changez `JWT_SECRET` en production
- Utilisez une valeur longue et aléatoire

## Déploiement en Production

### Variables d'environnement Render.com

Ajoutez dans le dashboard Render :
```
JWT_SECRET=votre_secret_production_tres_long_et_aleatoire
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre_mot_de_passe_application
ADMIN_EMAIL=reddympassi@gmail.com
```

### Sécurité supplémentaire

1. Changez les identifiants admin
2. Utilisez HTTPS uniquement
3. Limitez les tentatives de connexion
4. Activez les logs d'accès

## Support

Pour toute question, contactez : reddympassi@gmail.com
