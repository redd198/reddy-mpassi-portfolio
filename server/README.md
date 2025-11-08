# Backend API - Portfolio Reddy Mpassi

API Node.js/Express avec MySQL pour gérer les réservations et commandes.

## 📋 Prérequis

- Node.js (v16 ou supérieur)
- MySQL (v8 ou supérieur)
- npm ou yarn

## 🚀 Installation

### 1. Installer les dépendances

```bash
cd server
npm install
```

### 2. Configurer MySQL

Créer la base de données en exécutant le fichier SQL :

```bash
mysql -u root -p < database.sql
```

Ou manuellement dans MySQL :

```sql
source database.sql
```

### 3. Configuration

Copier le fichier `.env.example` en `.env` :

```bash
copy .env.example .env
```

Modifier les valeurs dans `.env` :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=reddy_portfolio
PORT=5000
```

### 4. Démarrer le serveur

**Mode développement** (avec rechargement automatique) :

```bash
npm run dev
```

**Mode production** :

```bash
npm start
```

Le serveur démarre sur `http://localhost:5000`

## 📡 Endpoints API

### Réservations

- **POST** `/api/reservations` - Créer une réservation
- **GET** `/api/reservations` - Récupérer toutes les réservations

### Commandes de livres

- **POST** `/api/commandes` - Créer une commande de livre

### Newsletter

- **POST** `/api/newsletter` - S'inscrire à la newsletter

### Health Check

- **GET** `/api/health` - Vérifier l'état de l'API

## 🗄️ Structure de la base de données

### Table `reservations`
- id, nom, whatsapp, email, theme, objectif
- date_souhaitee, heure_souhaitee, paiement
- statut, created_at, updated_at

### Table `commandes_livres`
- id, nom, email, whatsapp, livre
- statut, created_at, updated_at

### Table `newsletter`
- id, email, created_at

## 🔧 Dépannage

**Erreur de connexion MySQL** :
- Vérifiez que MySQL est démarré
- Vérifiez les identifiants dans `.env`
- Vérifiez que la base de données existe

**Port déjà utilisé** :
- Changez le PORT dans `.env`
- Ou arrêtez le processus utilisant le port 5000
