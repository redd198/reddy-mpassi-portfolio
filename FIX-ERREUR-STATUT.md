# 🔧 Fix : Erreur "commandes_livres_statut_check"

## ❌ Erreur détectée

```
error: new row for relation "commandes_livres" violates check constraint "commandes_livres_statut_check"
```

## 🔍 Cause

La colonne `statut` n'a pas été ajoutée correctement à la table `commandes_livres`, ou elle a une contrainte CHECK qui n'accepte pas la valeur `'validee'`.

## ✅ Solution : Exécuter la migration

### Étape 1 : Obtenir votre token JWT

1. Allez sur https://reddympassi.site/admin
2. Connectez-vous avec vos identifiants admin
3. Ouvrez la console du navigateur (F12)
4. Tapez cette commande et appuyez sur Entrée :

```javascript
localStorage.getItem('adminToken')
```

5. Copiez le token qui s'affiche (une longue chaîne de caractères)

### Étape 2 : Exécuter la migration

Dans la même console, exécutez :

```javascript
fetch('https://reddympassi-api.onrender.com/api/admin/migrate-commandes', {
  headers: { 
    'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
  }
})
.then(r => r.json())
.then(data => {
  console.log('✅ Résultat migration:', data)
  alert('Migration effectuée : ' + JSON.stringify(data))
})
.catch(err => {
  console.error('❌ Erreur:', err)
  alert('Erreur : ' + err.message)
})
```

### Étape 3 : Vérifier le résultat

Vous devriez voir un message :
- ✅ `{ success: true, message: "Migration effectuée" }`
- ✅ Ou `{ success: true, message: "Colonne déjà existante ou migration effectuée" }`

## 🔧 Solution alternative : Modifier la base de données directement

Si la migration ne fonctionne pas, il faut modifier la base de données PostgreSQL directement.

### Option A : Via Render Dashboard

1. Allez sur https://dashboard.render.com
2. Cliquez sur votre base de données PostgreSQL
3. Cliquez sur "Connect" en haut à droite
4. Copiez la commande de connexion (commence par `psql`)
5. Ouvrez un terminal et collez la commande
6. Une fois connecté, exécutez :

```sql
-- Supprimer la contrainte existante si elle existe
ALTER TABLE commandes_livres DROP CONSTRAINT IF EXISTS commandes_livres_statut_check;

-- Ajouter la colonne statut si elle n'existe pas
ALTER TABLE commandes_livres 
ADD COLUMN IF NOT EXISTS statut VARCHAR(50) DEFAULT 'en_attente';

-- Vérifier la structure
\d commandes_livres
```

### Option B : Via l'interface web de Render

1. Sur Render Dashboard > Votre base de données
2. Cliquez sur "Shell" ou "Console"
3. Exécutez les mêmes commandes SQL ci-dessus

## 🎯 Vérification

Après la migration, testez à nouveau :

1. Allez dans le dashboard admin
2. Validez une commande par email
3. Vous devriez voir : "✅ Email envoyé avec succès"
4. Pas d'erreur dans les logs

## 📋 Commandes SQL complètes

Si vous avez accès à la base de données PostgreSQL :

```sql
-- 1. Vérifier la structure actuelle
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'commandes_livres';

-- 2. Supprimer l'ancienne contrainte
ALTER TABLE commandes_livres 
DROP CONSTRAINT IF EXISTS commandes_livres_statut_check;

-- 3. Ajouter la colonne statut
ALTER TABLE commandes_livres 
ADD COLUMN IF NOT EXISTS statut VARCHAR(50) DEFAULT 'en_attente';

-- 4. Mettre à jour les lignes existantes
UPDATE commandes_livres 
SET statut = 'en_attente' 
WHERE statut IS NULL;

-- 5. Vérifier
SELECT id, nom, livre, statut FROM commandes_livres;
```

## ⚡ Solution rapide (RECOMMANDÉ)

**Exécutez ceci dans la console du navigateur (F12) :**

```javascript
// Étape 1 : Exécuter la migration
fetch('https://reddympassi-api.onrender.com/api/admin/migrate-commandes', {
  headers: { 
    'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
  }
})
.then(r => r.json())
.then(data => {
  console.log('✅ Migration:', data)
  alert('Migration effectuée ! Vous pouvez maintenant valider les commandes.')
})
.catch(err => {
  console.error('❌ Erreur:', err)
  alert('Erreur migration. Vérifiez les logs.')
})
```

## 🆘 Si la migration échoue

Le problème vient probablement d'une contrainte CHECK créée lors de la création initiale de la table.

**Solution :**
1. Connectez-vous à la base de données PostgreSQL
2. Supprimez la contrainte CHECK
3. Ajoutez la colonne statut sans contrainte

**Commande complète :**

```sql
-- Supprimer toutes les contraintes sur statut
ALTER TABLE commandes_livres 
DROP CONSTRAINT IF EXISTS commandes_livres_statut_check;

-- Supprimer la colonne si elle existe
ALTER TABLE commandes_livres 
DROP COLUMN IF EXISTS statut;

-- Recréer la colonne proprement
ALTER TABLE commandes_livres 
ADD COLUMN statut VARCHAR(50) DEFAULT 'en_attente';
```

## ✅ Après la correction

Une fois la migration effectuée :

1. Rechargez le dashboard admin
2. Validez une commande
3. L'email devrait partir automatiquement
4. Le statut devrait passer à "validée"

## 🎊 Résultat attendu

```
✅ Email envoyé avec succès au client !
```

Et dans la liste des commandes :
```
Statut : ✓ Validée
```
