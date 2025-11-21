import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

// Envoyer une notification pour un nouveau lead
export const sendLeadNotification = async (lead) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || 'reddympassi@gmail.com',
    subject: `🎯 Nouveau Lead: ${lead.prenom}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C41E3A;">🎉 Nouveau Lead Reçu!</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 10px;">
          <p><strong>Prénom:</strong> ${lead.prenom}</p>
          <p><strong>Email:</strong> ${lead.email}</p>
          <p><strong>WhatsApp:</strong> ${lead.whatsapp}</p>
          <p><strong>Préférence:</strong> ${lead.preference}</p>
          <p><strong>Source:</strong> ${lead.source}</p>
          <p><strong>Produit:</strong> ${lead.produit}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
        </div>
        <p style="margin-top: 20px; color: #666;">
          Connectez-vous à votre panneau d'administration pour plus de détails.
        </p>
      </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('✅ Email de notification envoyé')
  } catch (error) {
    console.error('❌ Erreur envoi email:', error)
  }
}

// Envoyer une notification pour une nouvelle réservation
export const sendReservationNotification = async (reservation) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || 'reddympassi@gmail.com',
    subject: `📅 Nouvelle Réservation: ${reservation.nom}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C41E3A;">📅 Nouvelle Réservation de Coaching!</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 10px;">
          <p><strong>Nom:</strong> ${reservation.nom}</p>
          <p><strong>Email:</strong> ${reservation.email}</p>
          <p><strong>WhatsApp:</strong> ${reservation.whatsapp}</p>
          <p><strong>Thème:</strong> ${reservation.theme}</p>
          <p><strong>Objectif:</strong> ${reservation.objectif}</p>
          <p><strong>Date souhaitée:</strong> ${reservation.date}</p>
          <p><strong>Heure souhaitée:</strong> ${reservation.heure}</p>
          <p><strong>Mode de paiement:</strong> ${reservation.paiement}</p>
        </div>
      </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('✅ Email de notification envoyé')
  } catch (error) {
    console.error('❌ Erreur envoi email:', error)
  }
}

// Envoyer une notification pour une commande de livre
export const sendCommandeNotification = async (commande) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || 'reddympassi@gmail.com',
    subject: `📚 Nouvelle Commande: ${commande.livre}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C41E3A;">📚 Nouvelle Commande de Livre!</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 10px;">
          <p><strong>Nom:</strong> ${commande.nom}</p>
          <p><strong>Email:</strong> ${commande.email}</p>
          <p><strong>WhatsApp:</strong> ${commande.whatsapp}</p>
          <p><strong>Livre:</strong> ${commande.livre}</p>
        </div>
      </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('✅ Email de notification envoyé')
  } catch (error) {
    console.error('❌ Erreur envoi email:', error)
  }
}
