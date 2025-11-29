# ⚡ Migration Rapide - Correction du statut

## 🎯 Problème

La colonne `statut` n'accepte pas la valeur `'validee'` à cause d'une contrainte CHECK.

## ✅ Solution en 2 minutes

### Étape 1 : Ouvrir la console

1. Allez sur https://reddympassi.site/admin
2. Connectez-vous
3. Appuyez sur **F12**
4. Allez dans l'onglet **"Console"**

### Étape 2 : Copier-coller ce code

Copiez et collez ce code dans la console, puis appuyez sur **Entrée** :

```javascript
fetch('https://reddympassi-api.onrender.com/api/admin/migrate-commandes', {
  headers: { 
    'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
  }
})
.then(r => r.json())
.then(data => {
  console.log('✅ Résultat:', data)
  if (data.success) {
    alert('✅ Migration réussie ! Vous pouvez maintenant valider les commandes.')
  } else {
    alert('⚠️ ' + data.message)
  }
})
.catch(err => {
  console.error('❌ Erreur:', err)
  alert('❌ Erreur : ' + err.message)
})
```

### Étape 3 : Vérifier

Vous devriez voir :
- ✅ Un message "Migration réussie"
- ✅ Ou "Colonne déjà existante"

### Étape 4 : Tester

1. Rechargez la page du dashboard
2. Validez une commande par email
3. Ça devrait fonctionner maintenant !

## 🔧 Si ça ne marche pas

La migration ne peut pas supprimer la contrainte CHECK existante. Il faut le faire manuellement dans PostgreSQL.

### Solution : Accéder à PostgreSQL

1. Allez sur https://dashboard.render.com
2. Cliquez sur votre **base de données PostgreSQL**
3. Cliquez sur **"Connect"** en haut à droite
4. Vous verrez une commande qui commence par `psql`
5. Copiez cette commande

### Dans votre terminal local

Collez la commande `psql` et appuyez sur Entrée. Une fois connecté :

```sql
-- Supprimer la contrainte problématique
ALTER TABLE commandes_livres 
DROP CONSTRAINT IF EXISTS commandes_livres_statut_check;

-- Supprimer et recréer la colonne
ALTER TABLE commandes_livres DROP COLUMN IF EXISTS statut;
ALTER TABLE commandes_livres ADD COLUMN statut VARCHAR(50) DEFAULT 'en_attente';

-- Vérifier
SELECT id, nom, livre, statut FROM commandes_livres LIMIT 5;
```

Tapez `\q` pour quitter.

## 📱 Alternative : Via l'interface web

Si vous ne pouvez pas utiliser le terminal :

1. Sur Render Dashboard > Votre base de données
2. Cherchez un bouton **"Shell"** ou **"Query"**
3. Exécutez les commandes SQL ci-dessus

## ✅ Vérification finale

Après avoir exécuté la migration :

1. Retournez sur le dashboard admin
2. Rechargez la page (F5)
3. Validez une commande
4. Vous devriez voir : **"✅ Email envoyé avec succès"**

## 🎊 C'est fait !

Une fois la migration effectuée, le système de validation des commandes fonctionnera parfaitement !
