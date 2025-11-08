# 🚀 Démarrage Rapide - Backend

## Étape 1 : Vérifier MySQL

Assurez-vous que MySQL est installé et démarré :

```bash
# Vérifier si MySQL est installé
mysql --version

# Démarrer MySQL (Windows)
net start MySQL80
```

## Étape 2 : Installer les dépendances

```bash
cd server
npm install
```

## Étape 3 : Initialiser la base de données

```bash
npm run init-db
```

Cette commande va :
- ✅ Créer la base de données `reddy_portfolio`
- ✅ Créer toutes les tables nécessaires
- ✅ Créer les index

## Étape 4 : Démarrer le serveur

```bash
npm run dev
```

Vous devriez voir :
```
🚀 Serveur démarré sur le port 5000
✅ Connexion à MySQL réussie
```

## Étape 5 : Tester l'API

Ouvrez votre navigateur : `http://localhost:5000/api/health`

Vous devriez voir :
```json
{
  "status": "OK",
  "message": "API fonctionnelle"
}
```

## 🔧 En cas de problème

### Erreur "Access denied"

1. **Option A** : Modifier le mot de passe dans `.env`
```env
DB_PASSWORD=votre_mot_de_passe_mysql
```

2. **Option B** : Réinitialiser le mot de passe MySQL
```bash
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'nouveau_mot_de_passe';
```

3. **Option C** : Utiliser sans mot de passe (déjà configuré)
```env
DB_PASSWORD=
```

### MySQL n'est pas démarré

```bash
# Windows
net start MySQL80

# Ou via Services Windows
services.msc
# Chercher MySQL et démarrer
```

### Port 5000 déjà utilisé

Modifier dans `.env` :
```env
PORT=3001
```

## ✅ C'est prêt !

Votre backend est maintenant opérationnel. Les formulaires du site web peuvent maintenant enregistrer les données dans MySQL.
