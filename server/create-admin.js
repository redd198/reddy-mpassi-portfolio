import bcrypt from 'bcryptjs'

// Script pour créer un hash de mot de passe admin
const password = 'Admin@2024'
const saltRounds = 10

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Erreur:', err)
    return
  }
  
  console.log('\n=== HASH DU MOT DE PASSE ADMIN ===')
  console.log('Mot de passe:', password)
  console.log('Hash:', hash)
  console.log('\nUtilisez ce hash dans votre requête SQL INSERT pour créer l\'admin')
  console.log(`INSERT INTO admins (username, password, email) VALUES ('admin', '${hash}', 'reddympassi@gmail.com');`)
})
