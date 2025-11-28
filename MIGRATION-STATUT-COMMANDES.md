# Migration : Ajout de la colonne statut aux commandes

## Étape 1 : Exécuter la migration

Une fois le backend déployé, visitez cette URL pour ajouter la colonne `statut` à la table `commandes_livres` :

```
https://votre-backend.onrender.com/api/admin/migrate-commandes
```

**Note :** Vous devez être authentifié (avoir un token JWT valide dans les headers).

Ou utilisez cette commande curl :

```bash
curl -X GET "https://votre-backend.onrender.com/api/admin/migrate-commandes" \
  -H "Authorization: Bearer VOTRE_TOKEN_JWT"
```

## Étape 2 : Vérifier la migration

La route retournera :
```json
{
  "success": true,
  "message": "Migration effectuée"
}
```

## Fonctionnalités ajoutées

### 1. Interface de validation dans le dashboard admin

- Bouton "Valider" sur chaque commande en attente
- Modal avec choix du canal (WhatsApp ou Email)
- Message personnalisable avec variables dynamiques
- Aperçu du message avant envoi

### 2. Variables disponibles dans les messages

- `{nom}` : Nom du client
- `{livre}` : Titre du livre commandé
- `{email}` : Email du client
- `{whatsapp}` : Numéro WhatsApp du client

### 3. Statuts des commandes

- **en_attente** : Commande non encore validée (par défaut)
- **validee** : Commande validée et client contacté

### 4. Workflow de validation

1. Admin clique sur "Valider" pour une commande
2. Modal s'ouvre avec message pré-rempli
3. Admin choisit le canal (WhatsApp ou Email)
4. Admin personnalise le message si nécessaire
5. Admin clique sur "Valider et envoyer"
6. Le statut passe à "validée"
7. Un nouvel onglet s'ouvre avec :
   - WhatsApp Web avec le message pré-rempli
   - Ou client email avec le message pré-rempli

## Structure de la base de données

```sql
ALTER TABLE commandes_livres 
ADD COLUMN statut VARCHAR(50) DEFAULT 'en_attente';
```

## Routes API ajoutées

### GET /api/admin/migrate-commandes
Ajoute la colonne statut si elle n'existe pas (idempotent).

### POST /api/admin/commandes/:id/valider
Valide une commande et génère le lien de contact.

**Body :**
```json
{
  "canal": "whatsapp",
  "message": "Bonjour {nom}, votre commande..."
}
```

**Response :**
```json
{
  "success": true,
  "message": "Commande validée",
  "lien": "https://wa.me/...",
  "canal": "whatsapp"
}
```
